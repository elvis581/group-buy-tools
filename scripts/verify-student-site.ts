import { readFile } from "node:fs/promises";
import { firstBatchPageCount } from "../src/config/release";
import {
  categories,
  collections,
  publishedCategories,
  publishedCollections,
  publishedTools,
  tools,
} from "../src/data/student-tools";

async function main() {
  const errors: string[] = [];
  const slugs = new Set(tools.map((tool) => tool.slug));

  if (tools.length !== 20)
    errors.push(`Expected 20 tools, found ${tools.length}`);
  if (categories.length !== 4)
    errors.push(`Expected 4 categories, found ${categories.length}`);
  if (collections.length !== 4)
    errors.push(`Expected 4 collections, found ${collections.length}`);
  if (publishedTools.length !== 9)
    errors.push(`Expected 9 first-batch tools, found ${publishedTools.length}`);
  if (publishedCategories.length !== 4)
    errors.push(
      `Expected 4 first-batch categories, found ${publishedCategories.length}`,
    );
  if (publishedCollections.length !== 3)
    errors.push(
      `Expected 3 first-batch collections, found ${publishedCollections.length}`,
    );
  if (firstBatchPageCount !== 18)
    errors.push(`Expected 18 first-batch pages, found ${firstBatchPageCount}`);
  if (slugs.size !== tools.length) errors.push("Tool slugs are not unique");

  for (const tool of tools) {
    if (
      !tool.name ||
      !tool.slug ||
      !tool.primaryKeyword ||
      !tool.shortDescription
    )
      errors.push(`${tool.slug}: missing identity fields`);
    if (!tool.officialUrl.startsWith("https://"))
      errors.push(`${tool.slug}: official URL is not HTTPS`);
    if (!tool.officialSources.length)
      errors.push(`${tool.slug}: missing official source`);
    if (!tool.accessGuide || !tool.accessGuide.pageTitle)
      errors.push(`${tool.slug}: missing product-specific access guide`);
    if (tool.accessGuide.claimSteps.length < 4)
      errors.push(`${tool.slug}: access guide needs at least four steps`);
    if (!tool.accessGuide.included || !tool.accessGuide.afterAccess)
      errors.push(`${tool.slug}: access guide is missing scope or follow-up`);
    if (tool.faq.length + tool.accessGuide.faq.length < 3)
      errors.push(`${tool.slug}: needs at least three FAQs`);
    if (!tool.lastVerifiedAt || !tool.nextCheckAt)
      errors.push(`${tool.slug}: missing freshness dates`);
    for (const alternative of tool.alternativeToolSlugs) {
      if (!slugs.has(alternative))
        errors.push(`${tool.slug}: unknown alternative ${alternative}`);
    }
  }

  for (const category of categories) {
    if (!category.primaryKeyword)
      errors.push(`${category.slug}: missing primary keyword`);
  }
  for (const collection of collections) {
    if (!collection.primaryKeyword)
      errors.push(`${collection.slug}: missing primary keyword`);
  }

  const appFiles = await readFile("src/components/student-site.tsx", "utf8");
  if (/AdSense|DoubleClick|advertisement/i.test(appFiles))
    errors.push("Advertising code found in public components");
  if (tools.some((tool) => tool.affiliateUrl))
    errors.push("An affiliate URL is configured before launch review");

  if (errors.length) {
    console.error(errors.join("\n"));
    process.exit(1);
  }

  console.log(
    `Student site verification passed: ${tools.length} tools, ${categories.length} categories, ${collections.length} collections, no configured affiliate destinations.`,
  );
}

main();
