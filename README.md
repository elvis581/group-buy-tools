# Group Buy Tools

Group Buy Tools (`https://group-buy-tools.com`) is an independent SEO-first information site for comparing group buy searches, official software pricing, cheaper alternatives and tool bundles across AI, ecommerce, SEO and marketing software.

## Stack and local development

This checkout uses the supplied Next.js App Router template with TypeScript, Tailwind CSS, React Server Components and static generation. The existing Sanity/auth infrastructure remains available as template infrastructure, while the public V1 is data-driven and does not require a CMS.

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
```

## Environment variables

Set these in `.env.local` or Vercel:

- `NEXT_PUBLIC_SITE_URL` — production URL; defaults to `https://group-buy-tools.com`
- `NEXT_PUBLIC_SPYBOX_AFFILIATE_URL` — optional SpyBox destination; falls back to `https://spybox.io/?via=rhcgszz`
- `NEXT_PUBLIC_GA_ID` — optional GA4 measurement ID
- `NEXT_PUBLIC_CLARITY_ID` — optional Microsoft Clarity project ID

Missing analytics IDs do not stop the site from rendering.

## Content architecture

Tool records live in `src/data/group-buy-tools.ts`. Add a complete tool record there, then add its slug to `primaryTools` only when a standalone tool page is ready. SpyBox and Flikover are comparison references in V1 and do not receive extra SEO URLs.

The four group-buy guides use the `Guide` records in the same file. Their copy is deliberately different by user need: Minea focuses on ad spy and product research, Kalodata on TikTok Shop analytics, PiPiADS on TikTok ad intelligence, and Claude on AI subscription and usage cost.

Alternative and comparison pages have dedicated route files so their intent stays distinct. Do not create future URLs until Search Console data supports them.

## Affiliate and analytics

SpyBox CTAs use `NEXT_PUBLIC_SPYBOX_AFFILIATE_URL` through the shared `AffiliateCTA` component and include `rel="sponsored noopener noreferrer"`. Events are pushed to `dataLayer` when available:

- `affiliate_click`
- `tool_search`
- `tool_card_click`

## SEO files and deployment

`src/app/sitemap.ts` explicitly allow-lists the core SEO routes plus About, Affiliate Disclosure, Privacy and Terms. `src/app/robots.ts` publishes the production sitemap URL. Import the repository into Vercel, set the environment variables, attach `group-buy-tools.com`, then submit `/sitemap.xml` in Search Console.
