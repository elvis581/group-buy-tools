import {
  coreSeoPaths,
  guides,
  primaryTools,
  tools,
} from "../src/data/group-buy-tools";

const trustPaths = [
  "/about",
  "/affiliate-disclosure",
  "/editorial-policy",
  "/privacy",
  "/terms",
];
const errors: string[] = [];
const slugs = new Set(tools.map((tool) => tool.slug));

if (coreSeoPaths.length !== 16)
  errors.push(`Expected 16 core SEO paths, found ${coreSeoPaths.length}`);
if (guides.length !== 4)
  errors.push(`Expected 4 group-buy guides, found ${guides.length}`);
if (primaryTools.length !== 4)
  errors.push(`Expected 4 standalone tool pages, found ${primaryTools.length}`);
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
if (new Set([...coreSeoPaths, ...trustPaths]).size !== 21)
  errors.push("Sitemap route set is not unique");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `Group Buy Tools verification passed: ${coreSeoPaths.length} core SEO paths, ${trustPaths.length} trust pages, ${tools.length} tool records.`,
);
