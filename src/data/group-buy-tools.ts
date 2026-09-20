import { spyboxAffiliateUrl } from "@/config/site";

export type Tool = {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  categories: string[];
  officialUrl: string;
  affiliateUrl?: string;
  pricing: {
    startingPrice?: number;
    currency?: string;
    billing?: string;
    summary?: string;
    sourceUrl?: string;
    lastChecked?: string;
    notes: string;
    confirmed: boolean;
  };
  bestFor: string[];
  features: string[];
  pros: string[];
  cons: string[];
  alternatives: string[];
  competitors: string[];
  spyboxIncluded?: boolean;
  lastVerified: string;
};

export const tools: Tool[] = [
  {
    slug: "minea",
    name: "Minea",
    shortDescription:
      "Ad spy and product research platform for ecommerce operators.",
    fullDescription:
      "Minea brings product discovery and advertising research into one ecommerce workflow. This overview explains the job it serves and the questions to ask before committing to a plan.",
    categories: ["Ecommerce", "Ad Spy", "Product Research"],
    officialUrl: "https://minea.com/",
    pricing: {
      startingPrice: 49,
      currency: "USD",
      billing: "monthly",
      summary:
        "Starter $49/month, Premium $99/month and Business $199/month. Quarterly billing displays $39, $79 and $158 per month respectively.",
      sourceUrl: "https://www.minea.com/pricing",
      lastChecked: "2026-09-20",
      notes:
        "Official pricing can change; confirm the plan and billing cycle before purchase.",
      confirmed: true,
    },
    bestFor: ["Product discovery", "Ad research", "Store operators"],
    features: [
      "Ad and product research",
      "Creative discovery",
      "Market exploration",
    ],
    pros: [
      "Broad ecommerce research use case",
      "Useful starting point for product discovery",
    ],
    cons: [
      "Current plan details require direct verification",
      "Research quality depends on market and filters",
    ],
    alternatives: ["PiPiADS", "Kalodata", "SpyBox"],
    competitors: ["PiPiADS", "Kalodata"],
    lastVerified: "2026-09-20",
  },
  {
    slug: "kalodata",
    name: "Kalodata",
    shortDescription:
      "TikTok Shop analytics and creator-product research platform.",
    fullDescription:
      "Kalodata is built around TikTok Shop research, creator signals and product discovery. This page focuses on product fit rather than group-buy access.",
    categories: ["Ecommerce", "TikTok Shop", "Product Research"],
    officialUrl: "https://kalodata.com/",
    pricing: {
      summary:
        "The official landing page currently advertises a 7-day free trial and 10% off the first payment; the paid amount is shown after sign-up.",
      sourceUrl: "https://mobile.kalodata.com/",
      lastChecked: "2026-09-20",
      notes:
        "No public paid amount was exposed on the accessible official page; confirm the checkout amount before purchase.",
      confirmed: false,
    },
    bestFor: [
      "TikTok Shop research",
      "Creator-led products",
      "Trend discovery",
    ],
    features: [
      "TikTok Shop analytics",
      "Product research",
      "Creator and market signals",
    ],
    pros: [
      "Focused TikTok Shop workflow",
      "Relevant for creator commerce research",
    ],
    cons: [
      "Coverage and pricing can change",
      "Data is not a substitute for demand validation",
    ],
    alternatives: ["Minea", "PiPiADS", "SpyBox"],
    competitors: ["Minea", "PiPiADS"],
    lastVerified: "2026-09-20",
  },
  {
    slug: "pipiads",
    name: "PiPiADS",
    shortDescription:
      "Ad intelligence platform for TikTok and short-form creative research.",
    fullDescription:
      "PiPiADS helps marketers study short-form ad creative and product signals. This overview separates the research workflow from questions about shared access.",
    categories: ["Ad Spy", "TikTok", "Ecommerce"],
    officialUrl: "https://www.pipiads.com/",
    pricing: {
      startingPrice: 49,
      currency: "USD",
      billing: "monthly",
      summary:
        "The current official homepage display shows Trial $0, Basic $49/month, Advanced $99/month, Enterprise $900/month and Flexible $180/month.",
      sourceUrl: "https://www.pipiads.com/",
      lastChecked: "2026-09-20",
      notes:
        "The page also shows promotional/list prices; confirm the live checkout amount and credits before purchase.",
      confirmed: true,
    },
    bestFor: [
      "TikTok ad research",
      "Creative inspiration",
      "Competitor monitoring",
    ],
    features: [
      "Ad library research",
      "Creative discovery",
      "Advertiser signals",
    ],
    pros: [
      "Strong short-form ad research focus",
      "Useful for creative benchmarking",
    ],
    cons: [
      "Data coverage may vary by market",
      "Access terms require verification",
    ],
    alternatives: ["Minea", "Kalodata", "SpyBox"],
    competitors: ["Minea", "Kalodata"],
    lastVerified: "2026-09-20",
  },
  {
    slug: "claude",
    name: "Claude",
    shortDescription:
      "AI assistant for writing, analysis, coding and knowledge work.",
    fullDescription:
      "Claude is an AI assistant from Anthropic. This overview covers its use cases and the product questions to verify before choosing an access model.",
    categories: ["AI", "Productivity", "Writing"],
    officialUrl: "https://claude.ai/",
    pricing: {
      startingPrice: 20,
      currency: "USD",
      billing: "monthly",
      summary:
        "Free $0, Pro $20/month ($17/month with annual billing, $200 billed up front) and Max from $100/month.",
      sourceUrl: "https://www.anthropic.com/pricing",
      lastChecked: "2026-09-20",
      notes:
        "Taxes, usage limits and plan availability can change; confirm the current Anthropic terms.",
      confirmed: true,
    },
    bestFor: ["Writing and analysis", "Coding help", "Knowledge work"],
    features: [
      "Conversational AI",
      "Writing and analysis",
      "Coding assistance",
    ],
    pros: [
      "Flexible general-purpose assistant",
      "Useful across writing and technical tasks",
    ],
    cons: [
      "Usage limits depend on plan and demand",
      "Provider terms should be reviewed",
    ],
    alternatives: ["SpyBox"],
    competitors: ["ChatGPT", "Gemini"],
    lastVerified: "2026-09-20",
  },
  {
    slug: "spybox",
    name: "SpyBox",
    shortDescription:
      "Multi-tool bundle option that may combine access to several software categories.",
    fullDescription:
      "SpyBox is included as a multi-tool option for readers comparing research and software bundle models. Check its current library, access model, pricing, limits and support with the provider.",
    categories: ["Tool Bundle", "Group Buy"],
    officialUrl: "https://spybox.io/",
    affiliateUrl: spyboxAffiliateUrl,
    pricing: {
      startingPrice: 29.99,
      currency: "EUR",
      billing: "monthly",
      summary:
        "The current SpyBox offer shows €29.99/month or €249.99/year for the all-inclusive plan.",
      sourceUrl: "https://spybox.io/api/prices",
      lastChecked: "2026-09-20",
      notes:
        "Confirm the final currency, taxes, included tools and cancellation terms on the checkout page.",
      confirmed: true,
    },
    bestFor: [
      "Bundle comparisons",
      "Budget-conscious research",
      "Multi-tool evaluation",
    ],
    features: [
      "Multi-tool access model",
      "Bundle-oriented offer",
      "Provider-managed access",
    ],
    pros: [
      "May cover multiple tool categories",
      "One destination for bundle research",
    ],
    cons: [
      "Library and limits are not independently confirmed",
      "Shared access can involve interruptions and privacy trade-offs",
    ],
    alternatives: ["Flikover"],
    competitors: ["Flikover"],
    spyboxIncluded: true,
    lastVerified: "2026-09-20",
  },
  {
    slug: "flikover",
    name: "Flikover",
    shortDescription:
      "Third-party software access platform compared with group-buy style services.",
    fullDescription:
      "Flikover is included for a focused comparison with SpyBox. Current library, pricing, support, refunds and access limits should be confirmed with the provider.",
    categories: ["Tool Bundle", "Group Buy"],
    officialUrl: "https://flikover.com/",
    pricing: {
      summary:
        "The public Flikover page says billing is a one-time payment for a specific month, but it does not publish the amount before sign-up.",
      sourceUrl: "https://flikover.com/",
      lastChecked: "2026-09-20",
      notes:
        "Confirm the dashboard price, included tools, refund terms and month covered before purchase.",
      confirmed: false,
    },
    bestFor: ["Access-platform comparisons", "Bundle research"],
    features: ["Third-party access model", "Multi-category positioning"],
    pros: ["Useful comparison point", "May suit readers seeking a bundle"],
    cons: [
      "Current service details are not independently confirmed",
      "Provider terms and stability require review",
    ],
    alternatives: ["SpyBox"],
    competitors: ["SpyBox"],
    lastVerified: "2026-09-20",
  },
];

export const toolMap = Object.fromEntries(
  tools.map((tool) => [tool.slug, tool]),
) as Record<string, Tool>;

export function formatPricingLabel(tool: Tool) {
  if (tool.pricing.confirmed && tool.pricing.startingPrice !== undefined) {
    const symbol =
      tool.pricing.currency === "EUR"
        ? "€"
        : tool.pricing.currency === "USD"
          ? "$"
          : `${tool.pricing.currency || ""} `;
    const billing = tool.pricing.billing === "monthly" ? "/month" : "";
    return `From ${symbol}${tool.pricing.startingPrice}${billing}`;
  }
  return tool.pricing.summary || "Provider pricing is not publicly listed.";
}

export const primaryTools = tools.filter((tool) =>
  ["minea", "kalodata", "pipiads", "claude"].includes(tool.slug),
);

export type Guide = {
  slug: string;
  brand: string;
  title: string;
  description: string;
  why: string;
  alternative: string;
  verdict: string;
  faq: { question: string; answer: string }[];
};
export const guides: Guide[] = [
  {
    slug: "minea-group-buy",
    brand: "Minea",
    title: "Minea Group Buy: Is There a Cheaper Way to Access Minea?",
    description:
      "Looking for a Minea group buy? Compare official pricing, shared-access limitations, cheaper alternatives and multi-tool options.",
    why: "Minea group buy searches usually come from ecommerce operators who want ad spy and product research coverage without committing to a full subscription before validating a workflow.",
    alternative:
      "For ad research, compare PiPiADS or a broader product-research workflow. A multi-tool option may be worth investigating when the real need spans several categories.",
    verdict:
      "Treat a Minea group buy as a comparison question. Verify the official plan first, then weigh access reliability, privacy and research depth against alternatives.",
    faq: [
      {
        question: "Is a Minea group buy an official Minea plan?",
        answer:
          "Usually no. Group buy generally refers to third-party or shared access, so verify the provider, account model and terms before paying.",
      },
      {
        question: "What is a safer starting point?",
        answer:
          "Start with official Minea pricing and a documented plan if available, then compare the workflow with alternatives.",
      },
      {
        question: "Can a Minea group buy support regular ad research?",
        answer:
          "Do not assume it can. Confirm session continuity, search limits, export behavior and support before using shared access for recurring Minea research.",
      },
      {
        question: "What should I verify before paying for Minea access?",
        answer:
          "Verify who controls the account, what Minea features are included, how interruptions are handled and whether the terms match your product research workflow.",
      },
    ],
  },
  {
    slug: "kalodata-group-buy",
    brand: "Kalodata",
    title: "Kalodata Group Buy: Cheaper Access for TikTok Shop Research?",
    description:
      "Compare Kalodata group buy access with official pricing, TikTok Shop research alternatives, shared-access limits and multi-tool options.",
    why: "People search for a Kalodata group buy when TikTok Shop analytics is useful but a recurring subscription feels difficult to justify while testing a store or creator niche.",
    alternative:
      "PiPiADS may fit ad creative research, while Minea can be a broader ecommerce research comparison. Consider a bundle only after checking whether its coverage includes your workflow.",
    verdict:
      "A Kalodata group buy can lower the entry conversation, but access caps and account stability matter. Compare the official product and alternatives before choosing.",
    faq: [
      {
        question: "Does a Kalodata group buy include official support?",
        answer:
          "Do not assume it does. Third-party access may have different support, usage caps and provider terms.",
      },
      {
        question: "What should TikTok Shop researchers compare?",
        answer:
          "Compare data coverage, creator signals, product research depth, refresh frequency and account consistency.",
      },
      {
        question: "Can a Kalodata group buy be used by a team?",
        answer:
          "Only if the provider clearly explains the account and session rules. Check whether team use, concurrent sessions and data sharing are allowed before relying on it.",
      },
      {
        question: "What is the main risk for Kalodata research?",
        answer:
          "The practical risk is a mismatch between the advertised access and the TikTok Shop signals, limits or continuity your workflow requires. Verify those details directly.",
      },
    ],
  },
  {
    slug: "pipiads-group-buy",
    brand: "PiPiADS",
    title: "PiPiADS Group Buy: Cheaper Access, Risks & Alternatives",
    description:
      "Explore PiPiADS group buy questions, official pricing checks, shared-access risks, ad research alternatives and bundle options.",
    why: "PiPiADS group buy searches often come from marketers who need short-form ad intelligence but want to test the research value before paying for an ongoing plan.",
    alternative:
      "Minea offers a broader ecommerce research angle, Kalodata is centered on TikTok Shop signals, and a multi-tool bundle may fit a mixed research stack. Compare a PiPiADS group buy with those alternatives before deciding. The PiPiADS group buy question should stay tied to your actual ad research workflow.",
    verdict:
      "Compare PiPiADS on the quality and breadth of ad research you need. A group buy is a third-party access decision with stability and privacy trade-offs.",
    faq: [
      {
        question: "Can I assume a PiPiADS group buy has the same features?",
        answer:
          "No. Shared access may have different limits, sessions, features or interruptions. Confirm the exact offer before relying on it.",
      },
      {
        question: "Who should consider PiPiADS first?",
        answer:
          "Marketers who need short-form ad and creative research should compare its official workflow with alternatives before choosing an access model.",
      },
      {
        question: "Does a PiPiADS group buy include the full ad library?",
        answer:
          "That is not confirmed by the directory. Ask the provider which markets, filters, history and exports are included before depending on the access.",
      },
      {
        question: "When is an official PiPiADS plan easier to evaluate?",
        answer:
          "An official plan is easier to assess when you need clear ownership, predictable support or uninterrupted ad research. Confirm the current official terms before choosing.",
      },
    ],
  },
  {
    slug: "claude-group-buy",
    brand: "Claude",
    title: "Claude Group Buy: Cheaper Access, Risks & Alternatives",
    description:
      "Compare Claude group buy searches with official pricing, shared-access risks, AI alternatives and multi-tool options.",
    why: "Claude group buy searches usually reflect the cost of recurring AI usage, especially for writing, analysis or coding workloads that exceed a free allowance.",
    alternative:
      "Compare official Claude access with other AI assistants for your workload. A multi-tool provider may advertise access to several products, but its limits and terms need separate verification.",
    verdict:
      "Claude group buy access is not the same as an official Anthropic subscription. Compare privacy, account stability, usage caps and provider terms first.",
    faq: [
      {
        question: "Is shared Claude access private?",
        answer:
          "Privacy cannot be assumed. Shared accounts may expose activity or create session conflicts, so review provider terms and avoid sensitive work.",
      },
      {
        question: "What is the most reliable option?",
        answer:
          "An official plan purchased from the provider gives the clearest account ownership and support expectations; verify current pricing before deciding.",
      },
      {
        question: "Can shared Claude access be used for confidential work?",
        answer:
          "Do not assume it is appropriate. Review the access model and privacy terms, and keep confidential work on an account arrangement you control.",
      },
      {
        question: "What should I check if Claude usage is interrupted?",
        answer:
          "Check the provider's session policy, usage cap, support channel and recovery process. Compare those details with the continuity your Claude group buy workflow needs before relying on shared access.",
      },
    ],
  },
];

export const coreSeoPaths = [
  "/",
  "/tools",
  "/deals",
  "/alternatives",
  "/tools/minea",
  "/tools/kalodata",
  "/tools/pipiads",
  "/tools/claude",
  ...guides.map((guide) => `/${guide.slug}`),
  "/minea-alternative",
  "/spybox-alternative",
  "/spybox-vs-flikover",
];
