# Content schema

The source of truth is `src/data/student-tools.ts`. `StudentTool` keeps the
page contract independent from Sanity or a future database.

Each record has identity fields, a single `category`, one primary `offerType`,
condition badges, free-plan facts, student use cases, alternatives, FAQs,
official sources and freshness fields. `status` supports `active`, `changed`,
`expiring-soon`, `expired`, `temporarily-unavailable`, `country-restricted` and
`verification-required`.

## Offer rules

`completely-free` and `open-source` may expose a confirmed zero-price Offer
schema. Other offer types do not emit a price unless a source review confirms
one. Unknown facts use `Not clearly stated`; they are not inferred from a
competitor or an AI response.

`officialUrl` is the primary destination. `affiliateUrl` is optional and is
currently empty for every phase-one record. The `/go/{slug}` route resolves
only one of those local fields, so it cannot be used as an open redirect.

## Freshness

Use a seven-day check for expiring student deals, 14 days for free credits, 30
days for trials, 60 days for free plans and 90 days for open-source tools. A
material source change belongs in `changelog`; do not change a review date just
to make a listing look fresh.
