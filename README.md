# Chunren Lian — Portfolio

Personal site for **Chunren Lian (Ryan)**, a full-stack engineer in Los Angeles.
Projects, case studies, and work history, plus a small chat assistant that
answers questions about my work.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, and
shadcn/ui. Case studies are MDX, compiled by content-collections.

## Running it

Requires [bun](https://bun.sh) — `package.json` scripts shell out to it, and
`bun.lock` is the lockfile. Don't use `npm install`; it resolves newer
transitive versions than the lockfile pins.

```bash
bun install --frozen-lockfile
cp .env.example .env.local   # optional — see below
npm run dev
```

The site runs fine with no environment variables at all. The only feature that
needs one is the chat.

## Chat

`src/app/api/chat/route.ts` calls the Anthropic Messages API with a system
prompt derived from the site's own content, so it stays in sync with the configs
rather than duplicating them.

| Variable            | Effect                                                                                                    |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| `ANTHROPIC_API_KEY` | Unset → the endpoint reports itself offline and the widget hides. Nothing else on the site depends on it. |
| `MOCK_AI=1`         | Deterministic replies, zero tokens. For local dev and CI.                                                 |
| `CHAT_DAILY_LIMIT`  | Global request ceiling per UTC day. Defaults to 300.                                                      |
| `NEXT_PUBLIC_URL`   | Live origin, for canonical URLs and absolute OG image paths.                                              |

Guardrails: a per-IP rate limit (5/min) and a global daily cap, both returning
honest 429 copy; first-turn answers cached for an hour. Optional Upstash Redis
takes over the counters if `UPSTASH_REDIS_REST_*` are set; otherwise they use
per-instance memory.

## Structure

```
src/config/      identity, experience, nav, metadata, technology registry
content/projects/ case studies (MDX)
src/components/  landing sections, project + experience cards, UI primitives
```

Content lives in `src/config/*` and `content/*` — most changes shouldn't need to
touch components.

## Credits

Forked from [Abdullah-dev0/portfolio](https://github.com/Abdullah-dev0/portfolio)
and substantially rewritten. The original MIT license is retained in `LICENSE`.
