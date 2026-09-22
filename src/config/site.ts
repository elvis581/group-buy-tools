import type { SiteConfig } from "@/types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://group-buy-tools.com";

export const spyboxAffiliateUrl =
  process.env.NEXT_PUBLIC_SPYBOX_AFFILIATE_URL ||
  "https://spybox.io/?via=rhcgszz";

export const siteConfig: SiteConfig = {
  name: "Group Buy Tools",
  tagline: "Group buy guides, cheaper alternatives and tool comparisons.",
  description:
    "Compare group buy options, official pricing, cheaper alternatives and tool bundles for popular AI, ecommerce, SEO and marketing tools.",
  keywords: [
    "group buy tools",
    "cheaper software alternatives",
    "tool comparisons",
    "minea group buy",
    "kalodata group buy",
    "pipiads group buy",
    "claude group buy",
  ],
  author: "Group Buy Tools editorial team",
  url: SITE_URL,
  logo: "/android-chrome-512x512.png",
  logoMark: "/android-chrome-512x512.png",
  // set the logoDark if you have put the logo-dark.png in the public folder
  // logoDark: "/logo-dark.png",
  // please increase the version number when you update the image
  image: `${SITE_URL}/og.png?v=2`,
  mail: "hello@group-buy-tools.com",
  utm: {
    source: "group-buy-tools.com",
    medium: "referral",
    campaign: "official-cta",
  },
  links: {
    // leave it blank if you don't want to show the link (don't delete)
    twitter: "",
    github: "",
    youtube: "",
  },
};
