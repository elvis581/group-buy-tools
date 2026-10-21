// Public-source checks for the October 21 maintenance batch. No paid-account testing.
export const evidenceDate = "2026-10-21";
export type EvidenceSource = {
  label: string;
  url: string;
  checkedAt: string;
  finding: string;
};
export const spyboxFacts = {
  price: "€29.99/month or €249.99/year",
  catalog:
    "Directory heading: 35+ tools; homepage and banner: 40+. Confirm the exact tools you need.",
  credits:
    "100,000 SBC per month at the full monthly price; annual plans retain 100,000 SBC per month. Monthly promotional discounts reduce the allocation proportionally.",
  access:
    "Windows/Mac app advertised; access is to SpyBox-held accounts, subject to credit and fair-use limits.",
  refunds:
    "Terms exclude refunds for catalog changes or service disruptions; compensation is discretionary.",
  coupon:
    "DCWSCX was supplied to us as a 10% code, but current eligibility was not verified. Check the final price and credit allocation before paying.",
};
export const weeklySources = {
  spybox: {
    label: "SpyBox pricing",
    url: "https://spybox.io/api/prices",
    checkedAt: evidenceDate,
    finding:
      "Public pricing lists EUR 29.99 monthly and EUR 249.99 annually. Checkout taxes and coupon eligibility were not tested.",
  },
  spyboxHome: {
    label: "SpyBox product and access overview",
    url: "https://spybox.io/",
    checkedAt: evidenceDate,
    finding:
      "Describes the Windows/Mac app and credit-based access. Savings and tool counts are provider claims, not measured savings or availability guarantees.",
  },
  spyboxTools: {
    label: "SpyBox tool directory",
    url: "https://spybox.io/tools",
    checkedAt: evidenceDate,
    finding: `${spyboxFacts.catalog} Minea, Kalodata, Pipi Ads and Claude AI were visible in the directory; account access was not tested.`,
  },
  spyboxTerms: {
    label: "SpyBox terms, sections 5, 9 and 10",
    url: "https://spybox.io/terms-of-service",
    checkedAt: evidenceDate,
    finding:
      "Terms dated October 10 cover provider-held accounts, promotional credit reductions, monthly resets, overage obligations and exclusions from refunds.",
  },
  toolzbuy: {
    label: "ToolzBuy plans and FAQ",
    url: "https://toolzbuy.com/",
    checkedAt: evidenceDate,
    finding:
      "Lite ₹249 / $5.50, Advance ₹549 / $10 and AI ₹2,999 / $35 monthly are displayed. INR is for Indian UPI customers; confirm final international checkout.",
  },
  toolzbuyTerms: {
    label: "ToolzBuy terms",
    url: "https://toolzbuy.com/terms",
    checkedAt: evidenceDate,
    finding:
      "Single-member access, no VPN/proxy/RDP, same-city use, daily fair-use limits and cancellation through support. Session isolation is a provider claim.",
  },
  toolzbuyRefunds: {
    label: "ToolzBuy refund policy",
    url: "https://toolzbuy.com/refund-policy",
    checkedAt: evidenceDate,
    finding:
      "First-purchase requests within 48 hours for nonworking included tools after support cannot resolve the issue. Exclusions include substantial use of working tools, rule violations, used renewals and temporary substitutions.",
  },
  flikover: {
    label: "Flikover public FAQ",
    url: "https://flikover.com/",
    checkedAt: evidenceDate,
    finding:
      "Advertises 35+ tools, cloud access and Chrome for some tools. Describes a one-time payment for a specific month without automatic renewal; price requires sign-up. Refund eligibility is not established.",
  },
  toolsurf: {
    label: "Toolsurf plan comparison",
    url: "https://www.toolsurf.com/",
    checkedAt: evidenceDate,
    finding:
      "Solo $9.99 and Agency $19 per 28 days, with two/four selection credits. Listed catalog tools are not necessarily included in each plan.",
  },
  toolsurfMinea: {
    label: "Toolsurf Minea listing",
    url: "https://www.toolsurf.com/seo-tools/minea-group-buy/",
    checkedAt: evidenceDate,
    finding:
      "Body shows $0.99, title says $3/mo; checkout amount and billing period remain unresolved.",
  },
  minea: {
    label: "Minea official pricing",
    url: "https://www.minea.com/pricing",
    checkedAt: evidenceDate,
    finding:
      "Monthly Starter $49, Premium $99, Business $199. Starter includes 10 AI analyses, 10 transcripts and 50 Magic searches per month.",
  },
  pipiads: {
    label: "PiPiADS official features and plans",
    url: "https://www.pipiads.com/",
    checkedAt: evidenceDate,
    finding:
      "TikTok/Facebook ads and commerce research. Displayed monthly Basic $49, Advanced $99 and Enterprise $900; annual promotions are separate. Basic shows 30,000 credits and two trackers.",
  },
  kalodata: {
    label: "Kalodata official mobile landing page",
    url: "https://mobile.kalodata.com/tk-roff/",
    checkedAt: evidenceDate,
    finding:
      "Promotes TikTok Shop research and sign-up. No current paid amount was exposed; country coverage and plan limits require confirmation.",
  },
} satisfies Record<string, EvidenceSource>;
