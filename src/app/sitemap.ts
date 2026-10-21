import { siteConfig } from "@/config/site";
import {
  publishedCategories,
  publishedCollections,
  publishedComparisons,
  publishedProviders,
} from "@/data/group-buy-directory";
import { coreSeoPaths, primaryTools } from "@/data/group-buy-tools";
import type { MetadataRoute } from "next";

const date = "2026-09-21";

export default function sitemap(): MetadataRoute.Sitemap {
  const trustPaths = ["/about", "/affiliate-disclosure", "/privacy", "/terms"];
  const entries = new Map<string, string>(
    [...coreSeoPaths, ...trustPaths].map((path) => [path, date]),
  );
  entries.set("/compare", "2026-10-21");
  for (const path of [
    "/spybox-alternative",
    "/minea-alternative",
    "/minea-group-buy",
    "/deals",
  ])
    entries.set(path, "2026-10-21");
  for (const tool of primaryTools)
    entries.set(`/tools/${tool.slug}`, tool.lastVerified);
  for (const provider of publishedProviders) {
    entries.set(`/providers/${provider.slug}`, provider.lastVerified);
  }
  for (const category of publishedCategories) {
    if (category.indexable === false)
      entries.delete(`/categories/${category.slug}`);
    else entries.set(`/categories/${category.slug}`, category.lastUpdated);
  }
  for (const collection of publishedCollections) {
    entries.set(`/collections/${collection.slug}`, collection.lastUpdated);
  }
  for (const comparison of publishedComparisons) {
    entries.set(`/compare/${comparison.slug}`, comparison.lastUpdated);
  }
  return Array.from(entries, ([path, lastModified]) => ({
    url: path === "/" ? siteConfig.url : `${siteConfig.url}${path}`,
    lastModified,
  }));
}
