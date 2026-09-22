import { siteConfig } from "@/config/site";
import {
  publishedCategories,
  publishedCollections,
  publishedComparisons,
  publishedProviders,
} from "@/data/group-buy-directory";
import { coreSeoPaths } from "@/data/group-buy-tools";
import type { MetadataRoute } from "next";

const date = "2026-09-21";

export default function sitemap(): MetadataRoute.Sitemap {
  const trustPaths = ["/about", "/affiliate-disclosure", "/privacy", "/terms"];
  const entries = new Map<string, string>(
    [...coreSeoPaths, ...trustPaths].map((path) => [path, date]),
  );
  for (const provider of publishedProviders) {
    entries.set(`/providers/${provider.slug}`, provider.lastVerified);
  }
  for (const category of publishedCategories) {
    entries.set(`/categories/${category.slug}`, category.lastUpdated);
  }
  for (const collection of publishedCollections) {
    entries.set(`/collections/${collection.slug}`, collection.lastUpdated);
  }
  for (const comparison of publishedComparisons) {
    entries.set(`/compare/${comparison.slug}`, comparison.lastUpdated);
  }
  return Array.from(entries, ([path, lastModified]) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
  }));
}
