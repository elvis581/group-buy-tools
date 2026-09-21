import { siteConfig } from "@/config/site";
import { coreSeoPaths } from "@/data/group-buy-tools";
import type { MetadataRoute } from "next";

const date = "2026-09-21";

export default function sitemap(): MetadataRoute.Sitemap {
  const trustPaths = [
    "/about",
    "/affiliate-disclosure",
    "/editorial-policy",
    "/privacy",
    "/terms",
  ];
  return [...coreSeoPaths, ...trustPaths].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: date,
  }));
}
