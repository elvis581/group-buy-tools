# Group Buy Tools Website System Plan

Status: V1 implementation baseline
Domain: `https://group-buy-tools.com`
Brand: Group Buy Tools

## Positioning

Group Buy Tools is an independent information site for comparing group buy access, official pricing, cheaper alternatives and tool comparisons across AI, ecommerce, SEO and marketing software. SpyBox is one multi-tool option and affiliate destination; the site remains useful when readers choose an official plan or another alternative.

## V1 route scope

The public SEO set is intentionally limited to 15 routes:

- `/`, `/tools`, `/deals`, `/alternatives`
- `/tools/minea`, `/tools/kalodata`, `/tools/pipiads`, `/tools/claude`
- `/minea-group-buy`, `/kalodata-group-buy`, `/pipiads-group-buy`, `/claude-group-buy`
- `/minea-alternative`, `/spybox-alternative`, `/spybox-vs-flikover`

Trust and compliance pages are separate: `/about`, `/affiliate-disclosure`, `/editorial-policy`, `/privacy`, and `/terms`.

Do not add pricing, review, or additional brand routes until search data supports a distinct intent and the page has source-backed content.

## Content system

All tool records and guide records live in `src/data/group-buy-tools.ts`. Four tools have standalone V1 pages. SpyBox and Flikover remain comparison references so the first release does not create thin URLs. Each public page owns one search intent, includes a useful above-fold answer, links to related decisions, and keeps official source links separate from sponsored CTAs.

Claims about prices, discounts, ratings, availability, guarantees, refunds, partnerships, or tool counts must be verified before publication. Shared access pages explain session limits, usage caps, privacy concerns, interruptions and provider terms without promising safety or legality.

## Technical baseline

The site uses the supplied Next.js App Router and Tailwind template, with server-rendered public pages, static route generation, a single site configuration, canonical metadata, JSON-LD breadcrumbs/FAQ, an explicit sitemap allow-list, and robots metadata. The old directory data and UI are not part of the public route tree.

Run locally:

```bash
pnpm dev
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

Production claims remain gated until HTTPS, custom-domain behavior, Search Console, analytics receipt, and live provider-source checks are verified.
