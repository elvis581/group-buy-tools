import sitemap from "../src/app/sitemap";
import {
  categories,
  collections,
  comparisons,
  offers,
  providerMap,
  publishedCategories,
  publishedCollections,
  publishedComparisons,
  publishedProviders,
} from "../src/data/group-buy-directory";
import {
  coreSeoPaths,
  guides,
  primaryTools,
  toolMap,
  tools,
} from "../src/data/group-buy-tools";
import { weeklyEditorialPages } from "../src/data/group-buy-weekly-pages";

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
const sitemapPaths = sitemap().map((entry) => new URL(entry.url).pathname);
const expectedPaths = new Set([
  ...coreSeoPaths,
  ...trustPaths,
  ...publishedComparisons.map((item) => `/compare/${item.slug}`),
]);
for (const category of publishedCategories) {
  if (category.indexable === false)
    expectedPaths.delete(`/categories/${category.slug}`);
}
if (sitemapPaths.includes("/categories/seo-tools"))
  errors.push("Noindex SEO category must be absent from sitemap");
for (const page of weeklyEditorialPages) {
  if (!expectedPaths.has(page.path))
    errors.push(`${page.path}: editorial page absent from sitemap`);
  for (const link of [
    ...page.related,
    ...page.sections.flatMap((section) => section.links ?? []),
  ]) {
    if (!expectedPaths.has(link.href))
      errors.push(`${page.path}: missing internal destination ${link.href}`);
  }
  if (page.table.rows.some((row) => row.length !== page.table.headers.length))
    errors.push(`${page.path}: inconsistent table columns`);
  if (new Set(page.faq.map((item) => item.question)).size !== page.faq.length)
    errors.push(`${page.path}: duplicate FAQ`);
}
if (
  sitemapPaths.length !== new Set(sitemapPaths).size ||
  sitemapPaths.length !== expectedPaths.size
)
  errors.push("Sitemap duplicates or missing routes");
for (const path of Array.from(expectedPaths))
  if (!sitemapPaths.includes(path))
    errors.push(`Missing sitemap route ${path}`);
const comparisonTitles = new Set<string>();
const comparisonDescriptions = new Set<string>();
for (const comparison of publishedComparisons) {
  if (
    comparisonTitles.has(comparison.title) ||
    comparisonDescriptions.has(comparison.description)
  )
    errors.push(`${comparison.slug}: duplicate metadata`);
  comparisonTitles.add(comparison.title);
  comparisonDescriptions.add(comparison.description);
  const article = comparison.article;
  if (!article) continue;
  const entities = article.kind === "provider" ? providerMap : toolMap;
  for (const slug of article.sides)
    if (!entities[slug])
      errors.push(`${comparison.slug}: unknown ${article.kind} ${slug}`);
  const declared =
    article.kind === "provider"
      ? comparison.providerSlugs
      : comparison.toolSlugs;
  if (article.sides.join() !== declared.join())
    errors.push(`${comparison.slug}: inconsistent entity order`);
  if (article.rows.some((row) => row.length !== 3 || row.some((cell) => !cell)))
    errors.push(`${comparison.slug}: incomplete comparison table`);
  if (
    new Set(article.faq.map((item) => item.question)).size !==
    article.faq.length
  )
    errors.push(`${comparison.slug}: duplicate FAQs`);
  for (const source of article.sources)
    if (
      !source.url.startsWith("https://") ||
      !source.checkedAt ||
      !source.finding
    )
      errors.push(`${comparison.slug}: incomplete evidence`);
  for (const link of article.related)
    if (!expectedPaths.has(link.href))
      errors.push(`${comparison.slug}: invalid internal link ${link.href}`);
}

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
  `Group Buy Tools verification passed: ${sitemapPaths.length} sitemap URLs, ${publishedComparisons.length} comparisons, ${tools.length} tool records.`,
);
