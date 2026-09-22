import {
  categories,
  collections,
  comparisons,
  publishedCategories,
  publishedCollections,
  publishedComparisons,
  publishedProviders,
  offers,
  providerMap,
} from "../src/data/group-buy-directory";
import {
  coreSeoPaths,
  guides,
  primaryTools,
  tools,
} from "../src/data/group-buy-tools";

const trustPaths = ["/about", "/affiliate-disclosure", "/privacy", "/terms"];
const errors: string[] = [];
const slugs = new Set(tools.map((tool) => tool.slug));

if (coreSeoPaths.length !== 31)
  errors.push(`Expected 31 core SEO paths, found ${coreSeoPaths.length}`);
if (guides.length !== 4)
  errors.push(`Expected 4 group-buy guides, found ${guides.length}`);
if (primaryTools.length !== 5)
  errors.push(`Expected 5 standalone tool pages, found ${primaryTools.length}`);
if (slugs.size !== tools.length) errors.push("Tool slugs are not unique");
for (const tool of tools) {
  if (!tool.name || !tool.slug || !tool.shortDescription)
    errors.push(`${tool.slug}: missing identity fields`);
  if (!tool.officialUrl.startsWith("https://"))
    errors.push(`${tool.slug}: official URL is not HTTPS`);
  if (!tool.lastVerified) errors.push(`${tool.slug}: missing lastVerified`);
  for (const alternative of tool.alternatives) {
    if (!tools.some((item) => item.name === alternative))
      errors.push(`${tool.slug}: unknown alternative ${alternative}`);
  }
}
if (new Set([...coreSeoPaths, ...trustPaths]).size !== 35)
  errors.push("Sitemap route set is not unique");
for (const providerSlug of ["spybox", "toolsurf", "toolzbuy"]) {
  const provider = providerMap[providerSlug];
  if (!provider?.published)
    errors.push(`${providerSlug} provider page is not published`);
  if (!provider?.sources.length)
    errors.push(`${providerSlug} provider has no public sources`);
  if (!provider?.officialUrl.startsWith("https://"))
    errors.push(`${providerSlug} provider URL is not HTTPS`);
  if (!offers.some((offer) => offer.providerSlug === providerSlug))
    errors.push(`${providerSlug} provider has no offer records`);
}
if (publishedProviders.some((provider) => !provider.published))
  errors.push("Published provider list contains an unpublished record");
for (const offer of offers) {
  if (!providerMap[offer.providerSlug])
    errors.push(`${offer.id}: unknown provider ${offer.providerSlug}`);
  if (!offer.sourceUrl.startsWith("https://"))
    errors.push(`${offer.id}: source URL is not HTTPS`);
}
for (const category of publishedCategories) {
  if (!categories.some((item) => item.slug === category.slug))
    errors.push(`Missing category source for ${category.slug}`);
}
for (const collection of publishedCollections) {
  if (!collections.some((item) => item.slug === collection.slug))
    errors.push(`Missing collection source for ${collection.slug}`);
}
for (const comparison of publishedComparisons) {
  if (!comparisons.some((item) => item.slug === comparison.slug))
    errors.push(`Missing comparison source for ${comparison.slug}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `Group Buy Tools verification passed: ${coreSeoPaths.length} core SEO paths, ${trustPaths.length} trust pages, ${tools.length} tool records.`,
);
