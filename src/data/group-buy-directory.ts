import { spyboxAffiliateUrl } from "@/config/site";
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
    publicToolCount: `${spyboxDirectory.toolCount} tools listed across ${spyboxDirectory.categories.length} categories`,
    startingPrice: "€29.99/month",
    billingCycle: "Monthly or annual offer shown publicly",
    accessMethod: "Not publicly disclosed; verify before purchase",
    refundPolicy: "Confirm the current checkout and refund terms",
    supportChannels: ["Provider website"],
    officialUrl: "https://spybox.io/",
    affiliateUrl: spyboxAffiliateUrl,
    sources: [
      spyboxSource,
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
    billingCycle: "Public page describes one-time payment for a specific month",
    accessMethod: "Not publicly disclosed",
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
      "$1.99/month advertised on the homepage; product pages may show different prices",
    billingCycle:
      "Monthly plans advertised; confirm the selected product and checkout cycle",
    accessMethod:
      "Instant access/provider login is advertised; the account model is not independently confirmed",
    refundPolicy: "Not publicly confirmed in the checked product pages",
    supportChannels: [
      "Provider support widget",
      "Support email on provider site",
    ],
    officialUrl: "https://www.toolsurf.com/",
    sources: [
      {
        label: "Toolsurf homepage",
        url: "https://www.toolsurf.com/",
        checkedAt: "2026-09-22",
        sourceType: "provider",
      },
      {
        label: "Toolsurf Minea product page",
        url: "https://www.toolsurf.com/seo-tools/minea-group-buy/",
        checkedAt: "2026-09-22",
        sourceType: "official-product",
      },
    ],
    lastVerified: "2026-09-22",
    published: true,
  },
  {
    slug: "toolzbuy",
    name: "ToolzBuy",
    shortDescription:
      "A provider-reported multi-tool service advertising 100+ tools and dedicated sessions.",
    publicToolCount:
      "100+ tools and 230+ free AI tools advertised on the homepage",
    startingPrice: "₹249/month advertised plans; individual tools from ₹49",
    billingCycle: "Monthly plans advertised from ₹249 to ₹2,999",
    accessMethod:
      "One-click dashboard and dedicated sessions are described by the provider",
    refundPolicy:
      "48-hour refund policy advertised; confirm eligibility at checkout",
    supportChannels: ["24/7 live chat", "WhatsApp", "Telegram"],
    officialUrl: "https://toolzbuy.com/",
    sources: [
      {
        label: "ToolzBuy homepage",
        url: "https://toolzbuy.com/",
        checkedAt: "2026-09-22",
        sourceType: "provider",
      },
      {
        label: "ToolzBuy Claude Pro Max page",
        url: "https://toolzbuy.com/tool/claude-pro-max-group-buy",
        checkedAt: "2026-09-22",
        sourceType: "official-product",
      },
    ],
    lastVerified: "2026-09-22",
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
    accessMethod: "Provider listing; exact account model requires confirmation",
    limits: ["Device, session, export and usage limits not publicly confirmed"],
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
    accessMethod: "Provider listing; exact account model requires confirmation",
    limits: ["Device, session, export and usage limits not publicly confirmed"],
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
    accessMethod: "Provider listing; exact account model requires confirmation",
    limits: ["Device, session, export and usage limits not publicly confirmed"],
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
    accessMethod: "Provider listing; exact account model requires confirmation",
    limits: ["Device, session, export and usage limits not publicly confirmed"],
    availability: "provider-reported",
    sourceUrl: spyboxDirectory.sourceUrl,
    affiliateUrl: spyboxAffiliateUrl,
    lastVerified: spyboxDirectory.lastChecked,
  },
  {
    id: "toolsurf-minea",
    toolSlug: "minea",
    providerSlug: "toolsurf",
    price: "$0.99 displayed product price; verify checkout",
    billingCycle:
      "Monthly product price displayed; checkout cycle requires confirmation",
    accessMethod:
      "Instant access/provider login advertised; account model not independently confirmed",
    limits: [
      "Feature parity, sessions, exports and support limits are not publicly confirmed",
    ],
    availability: "provider-reported",
    sourceUrl: "https://www.toolsurf.com/seo-tools/minea-group-buy/",
    lastVerified: "2026-09-22",
  },
  {
    id: "toolsurf-kalodata",
    toolSlug: "kalodata",
    providerSlug: "toolsurf",
    price: "$0.99 displayed product price; verify checkout",
    billingCycle:
      "Monthly product price displayed; checkout cycle requires confirmation",
    accessMethod:
      "Instant access/provider login advertised; account model not independently confirmed",
    limits: [
      "Feature parity, sessions, exports and support limits are not publicly confirmed",
    ],
    availability: "provider-reported",
    sourceUrl: "https://www.toolsurf.com/seo-tools/kalodata-group-buy/",
    lastVerified: "2026-09-22",
  },
  {
    id: "toolsurf-pipiads",
    toolSlug: "pipiads",
    providerSlug: "toolsurf",
    price: "$0.99 displayed product price; verify checkout",
    billingCycle:
      "Monthly product price displayed; checkout cycle requires confirmation",
    accessMethod:
      "Instant access/provider login advertised; account model not independently confirmed",
    limits: [
      "Feature parity, sessions, exports and support limits are not publicly confirmed",
    ],
    availability: "provider-reported",
    sourceUrl: "https://www.toolsurf.com/seo-tools/pipiads-group-buy/",
    lastVerified: "2026-09-22",
  },
  {
    id: "toolsurf-claude",
    toolSlug: "claude",
    providerSlug: "toolsurf",
    price: "$0.99 displayed product price; verify checkout",
    billingCycle:
      "Monthly product price displayed; checkout cycle requires confirmation",
    accessMethod:
      "Instant access/provider login advertised; account model not independently confirmed",
    limits: [
      "Feature parity, sessions, exports and support limits are not publicly confirmed",
    ],
    availability: "provider-reported",
    sourceUrl: "https://www.toolsurf.com/seo-tools/claude-ai-group-buy/",
    lastVerified: "2026-09-22",
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
  {
    slug: "spybox-vs-flikover",
    title: "SpyBox vs Flikover",
    description:
      "Compare two third-party tool access providers by library, pricing clarity, access rules, support and workflow fit.",
    providerSlugs: ["spybox", "flikover"],
    toolSlugs: ["spybox", "flikover"],
    dimensions: [
      "Public tool library",
      "Pricing and billing",
      "Access model and limits",
      "Support and refunds",
      "Workflow fit",
    ],
    verdict:
      "There is no universal winner. Choose only after each provider documents the tools, access rules and support you need.",
    lastUpdated: "2026-09-21",
    published: true,
    legacyPath: "/spybox-vs-flikover",
  },
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
