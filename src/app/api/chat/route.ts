import { NextRequest, NextResponse } from "next/server";

import * as z from "zod";
import Anthropic from "@anthropic-ai/sdk";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { systemPrompt } from "@/config/ChatPrompt";

/**
 * Chat endpoint — answers questions about Ryan only.
 *
 * Guardrails (ported from the DealLens pattern):
 *   - per-IP rate limit + a global daily request cap, both with honest 429 copy
 *   - a response cache keyed by the question, so repeat visitors cost nothing
 *   - MOCK_AI=1 returns deterministic replies for local dev and CI
 *   - no ANTHROPIC_API_KEY configured => the endpoint reports itself offline
 *     and the UI degrades, rather than the site depending on it
 */

// Haiku 4.5 — the cheapest current model, and plenty for answering questions
// over a fixed body of content. Two things differ from the Opus tier and are
// wired into the request below: `output_config.effort` is rejected on this
// model, and it has no thinking unless explicitly enabled (which we don't want
// for a chat widget). $1/$5 per MTok, 200K context.
const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 800;

// Per-IP: 5 messages/minute. Global: a hard ceiling on spend per UTC day.
const PER_IP_LIMIT = 5;
const PER_IP_WINDOW = "60 s" as const;
const GLOBAL_DAILY_LIMIT = Number(process.env.CHAT_DAILY_LIMIT ?? 300);

const MOCK_AI = process.env.MOCK_AI === "1";
const apiKey = process.env.ANTHROPIC_API_KEY;
const chatEnabled = MOCK_AI || Boolean(apiKey);

const anthropic = apiKey ? new Anthropic({ apiKey }) : null;

/**
 * Upstash is optional. Without it we fall back to per-instance memory, which is
 * weaker on serverless (each instance counts separately) but still bounds a
 * single abusive client and keeps local dev working without any Redis setup.
 */
const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);
const redis = hasUpstash ? Redis.fromEnv() : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(PER_IP_LIMIT, PER_IP_WINDOW),
      analytics: true,
      prefix: "portfolio-chat",
    })
  : null;

const memoryHits = new Map<string, { count: number; resetAt: number }>();

function memoryRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = memoryHits.get(key);

  if (!entry || now >= entry.resetAt) {
    const resetAt = now + windowMs;
    memoryHits.set(key, { count: 1, resetAt });
    return { success: true, limit, reset: resetAt };
  }

  entry.count += 1;
  return { success: entry.count <= limit, limit, reset: entry.resetAt };
}

function utcDayKey() {
  return new Date().toISOString().slice(0, 10);
}

/** Global daily cap. Redis-backed when available, per-instance otherwise. */
async function consumeGlobalBudget(): Promise<boolean> {
  const key = `portfolio-chat:global:${utcDayKey()}`;

  if (redis) {
    const used = await redis.incr(key);
    if (used === 1) {
      // First request of the day — expire the counter a little after midnight.
      await redis.expire(key, 60 * 60 * 25);
    }
    return used <= GLOBAL_DAILY_LIMIT;
  }

  const msUntilTomorrow = 60 * 60 * 24 * 1000;
  return memoryRateLimit(key, GLOBAL_DAILY_LIMIT, msUntilTomorrow).success;
}

/**
 * Answers are cached by question so a repeated question costs nothing. Keyed on
 * the question alone, so it only applies to first-turn questions (see below).
 */
const responseCache = new Map<string, { text: string; expiresAt: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000;
const CACHE_MAX_ENTRIES = 200;

function cacheKey(message: string) {
  return message.trim().toLowerCase().replace(/\s+/g, " ");
}

function readCache(key: string): string | null {
  const hit = responseCache.get(key);
  if (!hit) return null;
  if (Date.now() >= hit.expiresAt) {
    responseCache.delete(key);
    return null;
  }
  return hit.text;
}

function writeCache(key: string, text: string) {
  if (responseCache.size >= CACHE_MAX_ENTRIES) {
    const oldest = responseCache.keys().next().value;
    if (oldest) responseCache.delete(oldest);
  }
  responseCache.set(key, { text, expiresAt: Date.now() + CACHE_TTL_MS });
}

const chatSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "model"]),
        parts: z.array(z.object({ text: z.string() })),
      })
    )
    .optional()
    .default([]),
});

function getClientIP(request: NextRequest): string {
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");

  if (cfConnectingIP) return cfConnectingIP;
  if (forwarded) return forwarded.split(",")[0].trim();
  if (realIP) return realIP;

  return "unknown";
}

function mockReply(message: string): string {
  return `**Mock reply** (MOCK_AI=1, no tokens spent).\n\nYou asked: "${message.slice(0, 120)}".\n\nAsk me about Smart Money Decoder, AgentDesk, or Ryan's experience.`;
}

/** Server-Sent Events in the shape the chat client already parses. */
function sseStream(
  produce: (send: (chunk: string) => void) => Promise<void>
): ReadableStream {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      const send = (chunk: string) =>
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ text: chunk, done: false })}\n\n`
          )
        );

      try {
        await produce(send);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ text: "", done: true })}\n\n`
          )
        );
      } catch (error) {
        console.error("[chat] stream failed", error);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: "stream_failed", done: true })}\n\n`
          )
        );
      } finally {
        controller.close();
      }
    },
  });
}

const SSE_HEADERS = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
};

export async function POST(request: NextRequest) {
  if (!chatEnabled) {
    return NextResponse.json(
      { error: "chat_offline", message: "Chat is offline right now." },
      { status: 503 }
    );
  }

  let validated: z.infer<typeof chatSchema>;
  try {
    validated = chatSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const clientIP = getClientIP(request);

  const perIP = ratelimit
    ? await ratelimit.limit(clientIP)
    : memoryRateLimit(`ip:${clientIP}`, PER_IP_LIMIT, 60_000);

  if (!perIP.success) {
    const resetInSeconds = Math.max(
      1,
      Math.ceil((perIP.reset - Date.now()) / 1000)
    );

    return NextResponse.json(
      {
        error: "rate_limit_exceeded",
        message: `That's ${PER_IP_LIMIT} messages in a minute — give it ${resetInSeconds}s and ask again.`,
        resetInSeconds,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(resetInSeconds),
          "X-RateLimit-Limit": String(perIP.limit),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // Only first-turn questions are cacheable — later turns depend on history.
  const isFirstTurn = validated.history.length === 0;
  const key = cacheKey(validated.message);

  if (isFirstTurn) {
    const cached = readCache(key);
    if (cached) {
      return new NextResponse(
        sseStream(async (send) => {
          send(cached);
        }),
        { headers: SSE_HEADERS }
      );
    }
  }

  if (MOCK_AI) {
    const reply = mockReply(validated.message);
    if (isFirstTurn) writeCache(key, reply);

    return new NextResponse(
      sseStream(async (send) => {
        send(reply);
      }),
      { headers: SSE_HEADERS }
    );
  }

  if (!(await consumeGlobalBudget())) {
    return NextResponse.json(
      {
        error: "daily_limit_exceeded",
        message:
          "This chat has hit its daily budget — it's a personal site, not a product. Try again tomorrow, or just email me.",
      },
      { status: 429, headers: { "Retry-After": "3600" } }
    );
  }

  const messages: Anthropic.MessageParam[] = [
    ...validated.history.slice(-6).map((turn) => ({
      role: turn.role === "user" ? ("user" as const) : ("assistant" as const),
      content: turn.parts.map((part) => part.text).join(""),
    })),
    { role: "user" as const, content: validated.message },
  ];

  return new NextResponse(
    sseStream(async (send) => {
      let full = "";

      const stream = anthropic!.messages.stream({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        // No `output_config.effort` — Haiku 4.5 rejects it. No `thinking`
        // either: on this model omitting it means no thinking, which is what a
        // chat widget wants.
        //
        // No `cache_control` on the system prompt either. Haiku 4.5's minimum
        // cacheable prefix is 4096 tokens and this prompt is ~1200, so the
        // marker would silently do nothing (no error, just a cache that never
        // fills). Add it back if the prompt grows past 4096 tokens or the model
        // moves to a tier with a lower minimum.
        system: systemPrompt,
        messages,
      });

      stream.on("text", (delta) => {
        full += delta;
        send(delta);
      });

      await stream.finalMessage();

      if (isFirstTurn && full) writeCache(key, full);
    }),
    { headers: SSE_HEADERS }
  );
}

/** The client calls this on mount to decide whether to show the chat at all. */
export async function GET() {
  return NextResponse.json({ enabled: chatEnabled, mock: MOCK_AI });
}
