# SEO and event rules

Every indexable route has a canonical URL, unique title, description and H1.
Tool detail pages use `SoftwareApplication` and `BreadcrumbList` only for facts
visible on the page. A zero-price `Offer` is emitted only for the completely
free and open-source records. There is no Review or AggregateRating schema.

The first-batch sitemap contains the homepage, the tools directory, nine tool
routes, four category routes and three collection routes. It does not contain
query-string filter pages or `/go/` redirects. `/tools` keeps its canonical URL
when filtered so duplicate parameter URLs do not become separate index targets.

## Internal linking

Tool pages link to their category, alternatives, sources and related directory
paths. Category pages link to all tools and related categories. Collections
include an independent selection explanation, comparison table, cards and
related navigation. No first-phase public page is intentionally orphaned.

## Events

The optional client adapter uses these names without loading a third-party
script by default:

`tool_view`, `search`, `filter_used`, `free_cta_click`, `affiliate_click`,
`paid_upgrade_click`, `alternative_click`, `newsletter_signup`,
`report_outdated`, `submit_tool_click`.

CTA links record the tool, placement and whether the local record has an
affiliate destination. An analytics provider must be configured and disclosed
before adding a network script.
