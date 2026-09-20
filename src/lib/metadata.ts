import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  canonicalUrl,
  image = siteConfig.image,
  noIndex = false,
  primaryKeyword,
  additionalKeywords = [],
}: {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  image?: string;
  noIndex?: boolean;
  primaryKeyword?: string;
  additionalKeywords?: string[];
} = {}): Metadata {
  const fullTitle = title || siteConfig.name;
  return {
    title: fullTitle,
    description,
    keywords: primaryKeyword
      ? Array.from(
          new Set([
            primaryKeyword,
            ...additionalKeywords,
            ...siteConfig.keywords,
          ]),
        )
      : Array.from(new Set([...additionalKeywords, ...siteConfig.keywords])),
    creator: siteConfig.author,
    authors: [{ name: siteConfig.author }],
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl || siteConfig.url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: image ? [image] : undefined,
      site: siteConfig.url,
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}
