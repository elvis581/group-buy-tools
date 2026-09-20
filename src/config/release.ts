export const firstBatch = {
  toolSlugs: [
    "chatgpt",
    "google-gemini",
    "claude",
    "grammarly",
    "quillbot",
    "zotero",
    "photopea",
    "visual-studio-code",
    "replit",
  ],
  categorySlugs: [
    "ai-and-study",
    "writing-and-research",
    "design-and-creative",
    "coding-and-developer",
  ],
  collectionSlugs: [
    "best-free-ai-tools-for-students",
    "best-free-writing-tools-for-students",
    "free-tools-without-credit-card",
  ],
} as const;

export const firstBatchPageCount =
  2 +
  firstBatch.toolSlugs.length +
  firstBatch.categorySlugs.length +
  firstBatch.collectionSlugs.length;
