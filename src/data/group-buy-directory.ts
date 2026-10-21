import { spyboxAffiliateUrl } from "@/config/site";
import {
  type ComparisonArticle,
  p1Comparisons,
} from "@/data/group-buy-comparisons";
import {
  evidenceDate,
  spyboxFacts,
  weeklySources,
} from "@/data/group-buy-evidence";
import { weeklyFlikoverComparison } from "@/data/group-buy-flikover-comparison";
import { spyboxDirectory, toolMap } from "@/data/group-buy-tools";

export type VerificationStatus =
  | "verified"
  | "provider-reported"
  | "requires-signup"
  | "not-publicly-disclosed"
  | "could-not-verify"
  | "unavailable";

export type SourceType =
  | "official-product"
  | "provider"
  | "policy"
  | "independent";

export type Source = {
  label: string;
  url: string;
  checkedAt: string;
  sourceType: SourceType;
};

export type Provider = {
  slug: string;
  name: string;
  shortDescription: string;
  publicToolCount?: string;
  startingPrice?: string;
  billingCycle?: string;
  accessMethod?: string;
  refundPolicy?: string;
  supportChannels?: string[];
  officialUrl: string;
  affiliateUrl?: string;
  sources: Source[];
  lastVerified: string;
  published: boolean;
};

export type Offer = {
  id: string;
  toolSlug: string;
  providerSlug: string;
  price?: string;
  billingCycle?: string;
  accessMethod?: string;
  limits?: string[];
  availability: VerificationStatus;
  sourceUrl: string;
  affiliateUrl?: string;
  lastVerified: string;
};

export type DirectoryCategory = {
  indexable?: boolean;
  slug: string;
  name: string;
  description: string;
  toolSlugs: string[];
  lastUpdated: string;
  published: boolean;
};

export type Collection = {
  slug: string;
  name: string;
  description: string;
  selectionNote: string;
  toolSlugs: string[];
  providerSlugs: string[];
  lastUpdated: string;
  published: boolean;
};

export type Comparison = {
  slug: string;
  title: string;
  description: string;
  providerSlugs: string[];
  toolSlugs: string[];
  dimensions: string[];
  verdict: string;
  lastUpdated: string;
  published: boolean;
  legacyPath?: string;
  article?: ComparisonArticle;
};

const spyboxSource: Source = {
  label: "SpyBox public tools directory",
  url: spyboxDirectory.sourceUrl,
  checkedAt: spyboxDirectory.lastChecked,
  sourceType: "provider",
};

const flikoverSource: Source = {
  label: "Flikover public site",
  url: toolMap.flikover.officialUrl,
  checkedAt: toolMap.flikover.lastVerified,
  sourceType: "provider",
};

export const providers: Provider[] = [
  {
    slug: "spybox",
    name: "SpyBox",
    shortDescription:
      "A multi-tool access provider with a public directory covering several ecommerce, AI, ad research and content categories.",
    publicToolCount: spyboxFacts.catalog,
    startingPrice: spyboxFacts.price,
    billingCycle: "Monthly or annual offer shown publicly",
    accessMethod: spyboxFacts.access,
    refundPolicy: spyboxFacts.refunds,
    supportChannels: ["Telegram support", "Contact@spybox.io"],
    officialUrl: "https://spybox.io/",
    affiliateUrl: spyboxAffiliateUrl,
    sources: [
      spyboxSource,
      { ...weeklySources.spyboxTerms, sourceType: "policy" },
      { ...weeklySources.spyboxHome, sourceType: "provider" },
      {
        label: "SpyBox price endpoint",
        url: toolMap.spybox.pricing.sourceUrl || "https://spybox.io/",
        checkedAt:
          toolMap.spybox.pricing.lastChecked || spyboxDirectory.lastChecked,
        sourceType: "provider",
      },
    ],
    lastVerified: spyboxDirectory.lastChecked,
    published: true,
  },
  {
    slug: "flikover",
    name: "Flikover",
    shortDescription:
      "A third-party software access platform whose current commercial details require confirmation before purchase.",
    publicToolCount:
      "35+ tools advertised; named plan inclusion requires confirmation",
    billingCycle:
      "One-time payment for a specific month; no automatic renewal advertised",
    accessMethod:
      "Cloud-based shared software access; some tools require Chrome",
    refundPolicy: "Not publicly disclosed",
    supportChannels: ["Provider website"],
    officialUrl: toolMap.flikover.officialUrl,
    sources: [flikoverSource],
    lastVerified: toolMap.flikover.lastVerified,
    published: true,
  },
  {
    slug: "toolsurf",
    name: "Toolsurf",
    shortDescription:
      "A provider-reported multi-tool access service advertising ecommerce, SEO and AI tools.",
    publicToolCount: "100+ tools advertised on the public homepage",
    startingPrice:
      "Solo $9.99 or Agency $19 per 28 days; tool inclusion varies by plan",
    billingCycle: "Renews every 28 days, not once per calendar month",
    accessMethod:
      "Cloud dashboard with no downloads or shared passwords advertised; not independently tested",
    refundPolicy:
      "Conditional 24-hour refund message on homepage; verify eligibility",
    supportChannels: [
      "Provider support widget",
      "Support email on provider site",
    ],
    officialUrl: "https://www.toolsurf.com/",
    sources: [
      {
        label: "Toolsurf homepage",
        url: "https://www.toolsurf.com/",
        checkedAt: "2026-10-21",
        sourceType: "provider",
      },
      {
        label: "Toolsurf Minea product page",
        url: "https://www.toolsurf.com/seo-tools/minea-group-buy/",
        checkedAt: "2026-10-21",
        sourceType: "provider",
      },
    ],
    lastVerified: "2026-10-21",
    published: true,
  },
  {
    slug: "toolzbuy",
    name: "ToolzBuy",
    shortDescription:
      "A provider-reported multi-tool service advertising 100+ tools and dedicated sessions.",
    publicToolCount:
      "100+ tools and 230+ free AI tools advertised on the homepage",
    startingPrice:
      "Lite ₹249 / $5.50; Advance ₹549 / $10; AI ₹2,999 / $35 per month",
    billingCycle:
      "Monthly; INR for Indian UPI customers, USD prices displayed for international buyers",
    accessMethod:
      "Shared master subscriptions with isolated member sessions claimed; single-member, same-city rules apply",
    refundPolicy:
      "First purchase: request within 48 hours if included tools fail and support cannot resolve it; exclusions apply",
    supportChannels: ["24/7 live chat", "WhatsApp", "Telegram"],
    officialUrl: "https://toolzbuy.com/",
    sources: [
      { ...weeklySources.toolzbuyTerms, sourceType: "policy" },
      { ...weeklySources.toolzbuyRefunds, sourceType: "policy" },
      {
        label: "ToolzBuy homepage",
        url: "https://toolzbuy.com/",
        checkedAt: evidenceDate,
        sourceType: "provider",
      },
      {
        label: "ToolzBuy Claude Pro Max page",
        url: "https://toolzbuy.com/tool/claude-pro-max-group-buy",
        checkedAt: "2026-09-22",
        sourceType: "official-product",
      },
    ],
    lastVerified: evidenceDate,
    published: true,
  },
];

export const offers: Offer[] = [
  {
    id: "spybox-minea",
    toolSlug: "minea",
    providerSlug: "spybox",
    price: "€29.99/month or €249.99/year",
    billingCycle: "Monthly or annual",
    accessMethod: spyboxFacts.access,
    limits: [
      spyboxFacts.credits,
      "Exports, concurrency and tool-specific access require confirmation; SBC overages can remain payable.",
    ],
    availability: "provider-reported",
    sourceUrl: spyboxDirectory.sourceUrl,
    affiliateUrl: spyboxAffiliateUrl,
    lastVerified: spyboxDirectory.lastChecked,
  },
  {
    id: "spybox-kalodata",
    toolSlug: "kalodata",
    providerSlug: "spybox",
    price: "€29.99/month or €249.99/year",
    billingCycle: "Monthly or annual",
    accessMethod: spyboxFacts.access,
    limits: [
      spyboxFacts.credits,
      "Exports, concurrency and tool-specific access require confirmation; SBC overages can remain payable.",
    ],
    availability: "provider-reported",
    sourceUrl: spyboxDirectory.sourceUrl,
    affiliateUrl: spyboxAffiliateUrl,
    lastVerified: spyboxDirectory.lastChecked,
  },
  {
    id: "spybox-pipiads",
    toolSlug: "pipiads",
    providerSlug: "spybox",
    price: "€29.99/month or €249.99/year",
    billingCycle: "Monthly or annual",
    accessMethod: spyboxFacts.access,
    limits: [
      spyboxFacts.credits,
      "Exports, concurrency and tool-specific access require confirmation; SBC overages can remain payable.",
    ],
    availability: "provider-reported",
    sourceUrl: spyboxDirectory.sourceUrl,
    affiliateUrl: spyboxAffiliateUrl,
    lastVerified: spyboxDirectory.lastChecked,
  },
  {
    id: "spybox-claude",
    toolSlug: "claude",
    providerSlug: "spybox",
    price: "€29.99/month or €249.99/year",
    billingCycle: "Monthly or annual",
    accessMethod: spyboxFacts.access,
    limits: [
      spyboxFacts.credits,
      "Exports, concurrency and tool-specific access require confirmation; SBC overages can remain payable.",
    ],
    availability: "provider-reported",
    sourceUrl: spyboxDirectory.sourceUrl,
    affiliateUrl: spyboxAffiliateUrl,
    lastVerified: spyboxDirectory.lastChecked,
  },
  {
    id: "toolsurf-minea",
    toolSlug: "minea",
    providerSlug: "toolsurf",
    price: "$0.99 in product body; title says $3/mo; confirm checkout",
    billingCycle:
      "Product billing period unresolved; homepage bundles renew every 28 days",
    accessMethod:
      "Instant access/provider login advertised; account model not independently confirmed",
    limits: [
      "Feature parity, sessions, exports and support limits are not publicly confirmed",
    ],
    availability: "provider-reported",
    sourceUrl: "https://www.toolsurf.com/seo-tools/minea-group-buy/",
    lastVerified: evidenceDate,
  },
  {
    id: "toolsurf-kalodata",
    toolSlug: "kalodata",
    providerSlug: "toolsurf",
    price: "$0.99 in product body; title says $3/mo; confirm checkout",
    billingCycle:
      "Product billing period unresolved; homepage bundles renew every 28 days",
    accessMethod:
      "Instant access/provider login advertised; account model not independently confirmed",
    limits: [
      "Feature parity, sessions, exports and support limits are not publicly confirmed",
    ],
    availability: "provider-reported",
    sourceUrl: "https://www.toolsurf.com/seo-tools/kalodata-group-buy/",
    lastVerified: "2026-10-16",
  },
  {
    id: "toolsurf-pipiads",
    toolSlug: "pipiads",
    providerSlug: "toolsurf",
    price: "$0.99 in product body; title says $3/mo; confirm checkout",
    billingCycle:
      "Product billing period unresolved; homepage bundles renew every 28 days",
    accessMethod:
      "Instant access/provider login advertised; account model not independently confirmed",
    limits: [
      "Feature parity, sessions, exports and support limits are not publicly confirmed",
    ],
    availability: "provider-reported",
    sourceUrl: "https://www.toolsurf.com/seo-tools/pipiads-group-buy/",
    lastVerified: "2026-10-16",
  },
  {
    id: "toolsurf-claude",
    toolSlug: "claude",
    providerSlug: "toolsurf",
    price: "$0.99 in product body; title says $3/mo; confirm checkout",
    billingCycle:
      "Product billing period unresolved; homepage bundles renew every 28 days",
    accessMethod:
      "Instant access/provider login advertised; account model not independently confirmed",
    limits: [
      "Feature parity, sessions, exports and support limits are not publicly confirmed",
    ],
    availability: "provider-reported",
    sourceUrl: "https://www.toolsurf.com/seo-tools/claude-ai-group-buy/",
    lastVerified: "2026-10-16",
  },
  {
    id: "toolzbuy-claude",
    toolSlug: "claude",
    providerSlug: "toolzbuy",
    price: "₹2,999/month (Claude Pro Max)",
    billingCycle: "Monthly",
    accessMethod: "One-click dedicated session described by the provider",
    limits: [
      "3x usage limit is provider-claimed; exact caps and account terms require confirmation",
    ],
    availability: "provider-reported",
    sourceUrl: "https://toolzbuy.com/tool/claude-pro-max-group-buy",
    lastVerified: "2026-09-22",
  },
];

export const categories: DirectoryCategory[] = [
  {
    slug: "ad-spy",
    name: "Ad Spy Tools",
    description:
      "Tools for studying ad creative, advertiser signals, product discovery and short-form campaign research.",
    toolSlugs: ["minea", "pipiads"],
    lastUpdated: "2026-09-21",
    published: true,
  },
  {
    slug: "ecommerce-research",
    name: "Ecommerce Research Tools",
    description:
      "Product, store, creator and market research tools for ecommerce operators.",
    toolSlugs: ["minea", "kalodata", "pipiads"],
    lastUpdated: "2026-09-21",
    published: true,
  },
  {
    slug: "seo-tools",
    indexable: false,
    name: "SEO Tools",
    description:
      "A growing category for SEO and marketplace research products. Current standalone coverage is limited and should not be inferred from a bundle listing.",
    toolSlugs: [],
    lastUpdated: "2026-09-21",
    published: true,
  },
  {
    slug: "ai-tools",
    name: "AI Tools",
    description:
      "AI assistants and content tools compared by workflow, plan ownership and access model.",
    toolSlugs: ["claude"],
    lastUpdated: "2026-09-21",
    published: true,
  },
];

export const collections: Collection[] = [
  {
    slug: "recently-verified",
    name: "Recently Verified Tools & Providers",
    description:
      "A dated shortlist of tool and provider records checked most recently in the directory.",
    selectionNote:
      "Included because the source record has a current last-verified date. A recent check does not guarantee availability or service quality.",
    toolSlugs: ["spybox", "minea", "kalodata", "pipiads", "claude"],
    providerSlugs: ["spybox", "flikover", "toolsurf", "toolzbuy"],
    lastUpdated: "2026-09-22",
    published: true,
  },
  {
    slug: "ecommerce-research",
    name: "Group Buy Tools for Ecommerce Research",
    description:
      "A workflow collection for operators comparing product, ad and TikTok Shop research access.",
    selectionNote:
      "Selected from current ecommerce research records with published official or provider sources.",
    toolSlugs: ["minea", "kalodata", "pipiads"],
    providerSlugs: ["spybox"],
    lastUpdated: "2026-09-21",
    published: true,
  },
  {
    slug: "ai-tools",
    name: "AI Group Buy Tools",
    description:
      "AI workflow records that need separate review of privacy, usage caps and account ownership.",
    selectionNote:
      "This is a workflow shortlist, not a ranking or claim that shared access matches an official plan.",
    toolSlugs: ["claude"],
    providerSlugs: ["spybox"],
    lastUpdated: "2026-09-21",
    published: true,
  },
];

export const comparisons: Comparison[] = [
  ...p1Comparisons,
  weeklyFlikoverComparison,
];

export const providerMap = Object.fromEntries(
  providers.map((provider) => [provider.slug, provider]),
) as Record<string, Provider>;

export const categoryMap = Object.fromEntries(
  categories.map((category) => [category.slug, category]),
) as Record<string, DirectoryCategory>;

export const collectionMap = Object.fromEntries(
  collections.map((collection) => [collection.slug, collection]),
) as Record<string, Collection>;

export const comparisonMap = Object.fromEntries(
  comparisons.map((comparison) => [comparison.slug, comparison]),
) as Record<string, Comparison>;

export const publishedProviders = providers.filter(
  (provider) => provider.published,
);
export const publishedCategories = categories.filter(
  (category) => category.published,
);
export const publishedCollections = collections.filter(
  (collection) => collection.published,
);
export const publishedComparisons = comparisons.filter(
  (comparison) => comparison.published,
);

export function offersForTool(toolSlug: string) {
  return offers.filter((offer) => offer.toolSlug === toolSlug);
}

export function offersForProvider(providerSlug: string) {
  return offers.filter((offer) => offer.providerSlug === providerSlug);
}
