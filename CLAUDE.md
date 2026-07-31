# CLAUDE.md — Portfolio Migration Project

## What this project is

This repo is a fork of the open-source `Abdullah-dev0/portfolio` template (Next.js + React + TypeScript + Tailwind CSS 4 + shadcn/ui, MIT license). We are converting it into the personal portfolio of **Chunren Lian (Ryan)** — Full-Stack Engineer, Los Angeles — used as a job-search asset for Software Engineer / Full-Stack roles.

The goal is a recruiting funnel, not a template showcase: Hero → Featured Projects → Case Studies → Experience/Contact.

## Owner identity (use everywhere content is needed)

- Name: Chunren Lian (goes by Ryan / CR)
- Title line: Full-Stack Engineer · Commerce Builder · AI Product Developer
- Education: B.S. Computer Science, Alma College
- Location: Los Angeles, CA
- GitHub: https://github.com/LianCr
- LinkedIn: https://www.linkedin.com/in/ryan-lian-a1b719249/
- Email: liancr307@gmail.com
- No X/Twitter account — don't add one back to `socialLinks`
- No resume PDF / download link anywhere. Work history lives on the site itself (`/work-experience`), not behind a file download.

## Working rules (important)

1. **Config-first.** Prefer editing `src/config/*` and `content/` over modifying components. Only touch components when a feature must be removed or the chat backend is rewired.
2. **One deletion at a time.** When removing a feature: delete its route/component, remove its Navbar entry, run `npm run dev`, confirm no errors — then move to the next. Never batch deletions.
3. **Keep the template's design system untouched**: fonts, ~800px content width, OKLCH gray palette, card micro-animations, dark mode, sticky blurred navbar. Do not add new animation libraries.
4. **Never commit secrets.** `ANTHROPIC_API_KEY` lives only in `.env.local` (gitignored) and Vercel env vars.
5. **Keep the root `LICENSE` file** (MIT requirement).
6. After each phase, the site must build (`npm run build`) before starting the next phase.
7. **Package manager is bun.** `package.json` scripts shell out to bun, and `bun.lock` is what Vercel installs from. Never run `npm install` — it writes a `package-lock.json` that resolves newer transitive versions than `bun.lock` pins, which silently diverges local from prod. Use `bun install --frozen-lockfile`.

## Features to DELETE

All four template-feature deletions are done. Left here as a record of what went:

- ~~Gear/Setup page~~ — route, config, `components/gears/`, homepage Setup card, Meta entries
- ~~Resume page + Navbar resume link~~ — no PDF download anywhere
- ~~Blog~~ — routes, `content/blogs/`, `components/blog/`, `lib/blog.ts`, `types/blog.ts`, `FontSizeControls`, the blogs content-collection, Navbar entry. `CodeCopyButton` survived (moved to `components/projects/`, still used by project MDX). The `.prose` font-size CSS survived, with `--blog-font-size` renamed `--prose-font-size`.
- ~~GitHub contribution calendar~~ — plus the Discord/Lanyard `Presence` widget and `/api/presence` that lived inside it (needed `LANYARD_*` env vars we'll never set)
- ~~Template demo projects~~ — 7 MDX files, `public/project/`, unused `public/skills/`

Dependencies dropped as a result: `react-github-calendar`, `lenis` (the latter was already dead — `ReactLenis` was never mounted).

## Features to KEEP

- AI chat — but rewire it (see "Claude chat" below)
- Projects system (MDX case studies in `content/projects/`)
- Dark mode, responsive layout, SEO/OG config

## Featured projects (this order)

### 1. Smart Money Decoder (flagship)

- Repo: https://github.com/LianCr/smart-money-decoder · Live: https://smart-money-decoder.onrender.com/ · Video: https://youtu.be/egFu1kzgWrs
- One-liner: Paste a Polymarket wallet → find its largest political bet, reconstruct the news around entry, issue an AI verdict card — then backtest that verdict against how markets actually resolved.
- Case study source: the repo README (already structured as Problem/Architecture/Design principles/Status). Highlights to surface: T-7/T-1 backtest with difficulty scoring; anti-fabrication guards enforced in code; "math decides, AI narrates"; honest framing that wallet win rates aren't computable from public APIs.
- Tags: Python · FastAPI · React · Claude · Polymarket APIs · Tavily

### 2. DealLens

- Repo: https://github.com/LianCr/deallens · Live: https://deallens-xi.vercel.app/ · Demo GIF: `docs/demo.gif` in the repo
- One-liner: Enter a dealer quote for a real vehicle → see where it lands in the market distribution, 24-month price history with pinned events, and a grounded AI negotiation brief. Verdicts render without JavaScript.
- Highlights: Lighthouse 100 on all pages enforced by CI budget gates; 89 unit/contract tests + 56 Playwright E2E runs incl. a no-JS project; server-computed FACTS block grounding the AI; typed REAL/DEMO data-source honesty.
- Tags: Next.js · TypeScript · GraphQL · D3 · Claude API · Vitest · Playwright

## Work experience (use verbatim as source material for the Experience section)

### Ryzlink Corporation (DBA Chuwa America) — Full Stack Engineer — December 2025 – Present

Owned the end-to-end cart and checkout-readiness experience for a MERN e-commerce platform, delivering customer-facing workflows across React, Redux Toolkit, Node.js, Express, MongoDB, and JWT-secured REST APIs.

- Engineered a responsive cart and checkout interface with React, Material UI, and Redux Toolkit, supporting optimistic updates, inventory-aware quantity controls, promotional pricing, and real-time subtotal, tax, discount, and order-total calculations.
- Architected an event-driven cart synchronization layer using Redux listener middleware, revision guards, queued mutations, and bounded conflict retries, preventing stale responses from overwriting newer customer actions.
- Designed scalable Node.js and Express services for cart lifecycle management, guest-cart migration, pricing validation, and checkout preparation, using MongoDB atomic versioning to preserve consistency across sessions, tabs, and devices.
- Built a server-authoritative commerce rules engine that revalidated product pricing, inventory, availability, and promotion eligibility before checkout, protecting transactional workflows from stale or manipulated client state.
- Developed a failure-safe guest-to-customer conversion flow using localStorage, JWT authentication, and server-side cart reconciliation, preserving shopping intent across sign-in, network interruption, and session transitions.
- Prototyped an AI-powered checkout recovery assistant using OpenAI APIs, tool calling, and structured outputs to interpret inventory, promotion, and synchronization failures and recommend contextual recovery actions with deterministic fallbacks.
- Strengthened release reliability through frontend and backend automated testing, production-build validation, pull-request reviews, and Agile collaboration across engineering, QA, and product teams.

### ZentraPay — Full-Stack Developer — January 2025 – December 2025

Contributed to the development and modernization of a digital banking platform that enabled consumer and small-business users to review balances, explore transaction history, monitor multi-currency financial trends, and securely manage their accounts.

- Developed reusable Angular standalone components with TypeScript, Signals, RxJS, Reactive Forms, and Angular Material for account summaries, transaction filtering, cursor-based pagination, and role-based workflows.
- Built accessible D3.js visualizations for multi-currency balances and portfolio trends, including responsive SVG rendering, keyboard-accessible tooltips, ARIA labels, and foreign-exchange normalization.
- Contributed to selected modernization modules using React, Next.js, Redux Toolkit, and RTK Query, centralizing application state and reducing duplicated frontend data requests.
- Developed Node.js and TypeScript BFF services with Apollo GraphQL to aggregate account, transaction, user, and exchange-rate data from downstream APIs.
- Implemented secure authentication workflows using WebAuthn, JWT access tokens, Redis-backed refresh-token rotation, session revocation, and role-based authorization.
- Improved transaction-query performance through PostgreSQL indexing, debounced filtering, timestamp-based cursor pagination, and Redis caching for frequently accessed reference data.
- Supported AWS deployments using S3, CloudFront, API Gateway, and Lambda, with automated testing and environment-specific deployment workflows through GitHub Actions.
- Built unit, integration, and end-to-end test coverage using Jasmine, Jest, JUnit, Mockito, and Cypress.
- Collaborated with frontend, backend, QA, and product team members through Agile sprints, API contract discussions, pull-request reviews, Jira tracking, and cross-functional troubleshooting.

Homepage shows only the Ryzlink (current) experience as "Featured Experience"; the full history lives on a dedicated page.

## Technology icons

`src/config/technologies.tsx` is the single registry: an entry (id/name/href) drives the link, `iconByKey` drives the logo, `KEY_ALIASES` maps however a tech gets spelled in MDX frontmatter or `Experience.tsx` onto a canonical key. Add a tech in all three places or it silently degrades.

Icons are template-style components in `src/components/technologies/` — `viewBox="0 0 24 24"`, no width/height (they fill their container), `fill` set on the `<svg>`. Paths come from [simple-icons](https://github.com/simple-icons/simple-icons) (CC0); it was installed, used to generate the components, then removed, so there's no runtime dependency. Brand colors darker than ~0.12 relative luminance use `currentColor` instead, or they vanish on the dark theme (Angular, Apollo, WebAuthn).

Lucide has **no** brand logos — don't go looking there for one.

A tech with no icon is fine and degrades on purpose: `Skill` drops the icon slot, `ProjectCard` renders an outline `Badge` with the name. Currently text-only: Playwright, Polymarket, Tavily, JWT, OpenAI, RxJS, Jasmine.

## Content status

Identity, experience, both case studies, and all imagery are done. Assets in
place: `public/assets/avatar.png`, `public/company/{ryzlink,zentrapay}.png`,
`public/project/{smart-money-decoder,deallens}.png`,
`public/meta/opengraph-image.png`.

Project display order is explicit via `order:` in MDX frontmatter (Smart Money
Decoder is 1), because chronology alone would put the newer DealLens first.

CTA is a `mailto:` — Cal.com and `@calcom/embed-react` are gone.

## Claude chat (the one AI feature we keep)

Done. `src/app/api/chat/route.ts` calls the Anthropic Messages API
(`claude-haiku-4-5`, streaming SSE) with the system prompt from
`src/config/ChatPrompt.ts`, which derives itself from
`About`/`Experience`/`Hero`/`allProjects` — update those configs and the chat
follows automatically.

Model-specific constraints, deliberate and commented in the route: Haiku 4.5
**rejects `output_config.effort`**, has no thinking unless explicitly enabled,
and has a **4096-token minimum cacheable prefix** — the system prompt is ~1200
tokens, so `cache_control` is omitted rather than left as a silent no-op. All
three change if the model changes.

Guardrails in place:

- Per-IP limit (5/min) + a global daily cap (`CHAT_DAILY_LIMIT`, default 300), both
  with honest 429 copy authored server-side and rendered verbatim by the client.
- Rate limiting uses per-instance memory. Upstash Redis is supported and takes
  over automatically if `UPSTASH_REDIS_REST_*` are set, but is deliberately not
  configured — a personal portfolio doesn't attract the traffic that would
  justify it. The real spend guard is the Anthropic Console spend limit.
- First-turn answers are cached for an hour, so repeat questions cost nothing.
- `MOCK_AI=1` returns deterministic replies with zero tokens, for local dev and CI.
- No `ANTHROPIC_API_KEY` => `GET /api/chat` reports `{enabled: false}`, POST returns
  503, and `ChatBubble` renders nothing. The rest of the site never depends on it.

The Gemini/PostHog server integration is gone, and with it the `ws` dependency and
the two `next.config.ts` workarounds (`serverExternalPackages`, `outputFileTracingIncludes`)
that existed only to keep `@posthog/ai`'s dynamic `require('ws')` working on Vercel.

See `.env.example` for every variable.

## Deployment

- Vercel. `npm run build` must pass locally before every push.
- Update `src/config/Meta.tsx` (title, description, OG image) before go-live.
- After launch: point the primary domain here; old site (ryan-portfolio-mauve.vercel.app) redirects.
