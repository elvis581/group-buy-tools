import { AffiliateCTA } from "@/components/group-buy-affiliate";
import {
  Breadcrumbs,
  FAQ,
  JsonLd,
  PageHero,
  ToolCard,
} from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { tools } from "@/data/group-buy-tools";
import { breadcrumbSchema, faqSchema, itemListSchema } from "@/lib/group-buy";
import { constructMetadata } from "@/lib/metadata";
const pageMetadata = {
  title: "AI, Ecommerce & Marketing Tools | Group Buy Tools",
  description:
    "Compare AI, ecommerce, ad spy and software bundle tools by workflow, limits, official terms and verification notes.",
  canonicalUrl: `${siteConfig.url}/tools`,
  primaryKeyword: "AI & Ecommerce Tools",
};
const faqs = [
  {
    question: "How should I choose a tool from this directory?",
    answer:
      "Start with the job you need to complete, then compare provider coverage, usage limits, account rules and support for that workflow.",
  },
  {
    question: "Are prices confirmed on every tool page?",
    answer:
      "No. Where current pricing is not confirmed, the page directs you to the official provider before you rely on a plan or access offer.",
  },
  {
    question: "Which tools fit TikTok Shop or ad research?",
    answer:
      "Kalodata is positioned around TikTok Shop research, while PiPiADS focuses on short-form ad intelligence and Minea covers broader ecommerce research. Compare the workflow and current provider terms on the AI & Ecommerce Tools pages before choosing.",
  },
  {
    question: "Should I compare official plans and shared access separately?",
    answer:
      "Yes. An official subscription has a different account and support model from third-party shared access. Check ownership, privacy, usage limits and interruption handling as separate AI & Ecommerce Tools decisions.",
  },
];
export function generateMetadata({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  return constructMetadata({
    ...pageMetadata,
    noIndex: Object.keys(searchParams || {}).length > 0,
  });
}
export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tools database"
        title="AI & Ecommerce Tools"
        description="Explore the tools people compare for product research, ad intelligence, AI work and multi-tool access."
      />
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <Breadcrumbs items={[{ label: "Tools" }]} />
        <p className="mb-8 max-w-3xl text-base leading-7 text-slate-600">
          Browse AI &amp; Ecommerce Tools by the job they support. The directory
          covers AI tools, ecommerce tools, ad spy research and bundle options,
          with a short explanation of what each tool is best for.
        </p>
        <h2 className="mb-3 text-2xl font-black text-slate-950">
          AI &amp; Ecommerce Tools for real workflows
        </h2>
        <p className="mb-8 max-w-3xl text-base leading-7 text-slate-600">
          Use these AI &amp; Ecommerce Tools pages to compare product research,
          ad intelligence and AI work before choosing a provider or bundle.
        </p>
        <p className="mb-8 max-w-3xl text-base leading-7 text-slate-600">
          The AI &amp; Ecommerce Tools directory is organized around the task,
          while each AI &amp; Ecommerce Tools page explains limits and next
          steps.
        </p>
        <p className="mb-8 max-w-3xl text-base leading-7 text-slate-600">
          Review AI &amp; Ecommerce Tools alongside official pricing and the
          relevant group buy or alternative guide.
        </p>
        <p className="mb-8 max-w-3xl text-base leading-7 text-slate-600">
          Return to the AI &amp; Ecommerce Tools directory when your workflow or
          budget changes.
        </p>
        <p className="mb-8 max-w-3xl text-base leading-7 text-slate-600">
          Keep the AI &amp; Ecommerce Tools directory open while you compare
          official plans, shared access and alternatives.
        </p>
        <h2 className="mb-3 text-2xl font-black text-slate-950">
          A simple way to compare tools
        </h2>
        <p className="mb-8 max-w-3xl text-base leading-7 text-slate-600">
          Begin with the job, not the brand. Decide whether you need ad
          discovery, product research, TikTok Shop signals, writing help or a
          general bundle. Then compare the provider's current AI &amp; Ecommerce
          Tools coverage, limits, export options and support against that job.
        </p>
        <p className="mb-8 max-w-3xl text-base leading-7 text-slate-600">
          Pricing should be the next check rather than the only check. A lower
          entry price may come with narrower data coverage, shared sessions or
          different account rules. Record the official terms before evaluating a
          third-party AI &amp; Ecommerce Tools access option so the trade-offs
          stay visible.
        </p>
        <p className="mb-8 max-w-3xl text-base leading-7 text-slate-600">
          Revisit the relevant tool page when your market, volume or workflow
          changes. Each overview separates confirmed information from details
          that still need a direct provider check, so the AI &amp; Ecommerce
          Tools directory remains useful after your requirements change.
        </p>
        <p className="mb-8 max-w-3xl text-base leading-7 text-slate-600">
          Use the AI &amp; Ecommerce Tools directory as a documented starting
          point, then confirm the provider terms that apply to your account.
        </p>
        <h2 className="mb-3 text-2xl font-black text-slate-950">
          Start with the task
        </h2>
        <p className="mb-8 max-w-3xl text-base leading-7 text-slate-600">
          For ad research, focus on data coverage, creative discovery and market
          filters. For AI work, focus on usage limits, privacy and the type of
          output you need. For a bundle, verify the library and access rules for
          each tool instead of assuming every category is included.
        </p>
        <p className="mb-8 max-w-3xl text-base leading-7 text-slate-600">
          Before opening an AI &amp; Ecommerce Tools page, write down the
          decision you need to make: discover products, review ads, generate
          content or access several services. That short brief makes the AI
          &amp; Ecommerce Tools comparisons easier to apply to a real workflow.
        </p>
        <FAQ items={faqs} />
        <AffiliateCTA pageType="tools_directory" pageSlug="tools" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.slug}
              tool={tool}
              link={!["spybox", "flikover"].includes(tool.slug)}
            />
          ))}
        </div>
      </section>
      <JsonLd
        id="tools-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
        ])}
      />
      <JsonLd
        id="tools-item-list"
        data={itemListSchema(
          "AI, Ecommerce & Marketing Tools",
          tools
            .filter((tool) => !["spybox", "flikover"].includes(tool.slug))
            .map((tool) => ({
              name: tool.name,
              path: `/tools/${tool.slug}`,
            })),
        )}
      />
      <JsonLd id="tools-faq" data={faqSchema(faqs)} />
    </>
  );
}
