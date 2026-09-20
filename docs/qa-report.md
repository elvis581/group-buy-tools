# QA report

Review date: 2026-09-01.

## Automated checks

- `node_modules/.bin/biome check` on the first-phase app, data, config and
  verification files: passed.
- `node_modules/.bin/tsc --noEmit`: passed.
- `node_modules/.bin/next build`: passed; 39 routes generated, including nine
  first-batch tool detail routes, four category routes and three collection
  routes.
- `pnpm typecheck`: passed.
- `pnpm test`: passed through `tsx scripts/verify-student-site.ts`.

## Runtime smoke test

- After a clean local preview restart with `NEXT_PUBLIC_APP_URL=http://localhost:3001`,
  `/`, `/tools/chatgpt`, `/tools?offer=open-source`, `/sitemap.xml` and
  `/robots.txt` returned HTTP 200.
- All 18 URLs listed in the sitemap returned HTTP 200 when requested from the
  local preview.
- `/go/chatgpt` returned HTTP 307 to the official ChatGPT URL with
  `X-Robots-Tag: noindex, nofollow` and `Cache-Control: no-store`.
- `/go/no-such-offer` returned HTTP 404 with the same non-indexable and
  non-cacheable headers.

## Coverage

- Fixed data scope: 20 tool records, four categories and four collections.
- First-batch indexable scope: 18 pages made up of the homepage, tools hub,
  four category pages, three collections and nine product detail pages.
- All tool records have an HTTPS official URL, source list, freshness dates and
  valid alternative slugs.
- No affiliate destination is configured at launch.
- No advertising component or advertising script is used by the public route
  tree.
- Sitemap excludes query pages and `/go/` routes.
- `/go/` accepts only local tool slugs and returns `307`, `X-Robots-Tag` and
  `Cache-Control: no-store`.
- Newsletter returns a configuration message until both Resend environment
  variables exist; it does not fake a successful subscription.

## Not yet measured

Lighthouse scores, live domain behavior, production HTTPS, analytics receipts,
real Resend delivery, and provider-side offer changes require a configured
deployment environment. They are not claimed as passed by this local report.
