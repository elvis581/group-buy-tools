import { AffiliateCTA } from "@/components/group-buy-affiliate";
import { GroupBuySearch } from "@/components/group-buy-search";
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
import Link from "next/link";
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
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          Browse by the job you need to complete: product research, ad
          intelligence, TikTok Shop analysis, AI work or multi-tool access. Each
          card shows the tool's best-fit workflow, current pricing notes and the
          next page to compare.
        </p>
        <GroupBuySearch tools={tools} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.slug}
              tool={tool}
              link={!["spybox", "flikover"].includes(tool.slug)}
            />
          ))}
        </div>
        <section className="mt-14 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-black text-slate-950">
            Compare tools by workflow
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Start with the job, then compare data coverage, limits, account
            ownership, export behavior and support. Official plans and
            third-party access answer different questions, so keep those
            decisions separate.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Link
              href="/minea-alternative"
              className="rounded-lg border border-slate-300 bg-white p-4 text-sm font-bold text-indigo-800 hover:border-indigo-500"
            >
              Minea alternatives →
            </Link>
            <Link
              href="/spybox-alternative"
              className="rounded-lg border border-slate-300 bg-white p-4 text-sm font-bold text-indigo-800 hover:border-indigo-500"
            >
              SpyBox alternatives →
            </Link>
            <Link
              href="/spybox-review"
              className="rounded-lg border border-slate-300 bg-white p-4 text-sm font-bold text-indigo-800 hover:border-indigo-500"
            >
              SpyBox review →
            </Link>
          </div>
        </section>
        <div className="mt-14">
          <FAQ items={faqs} />
        </div>
        <div className="mt-10">
          <AffiliateCTA pageType="tools_directory" pageSlug="tools" />
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
