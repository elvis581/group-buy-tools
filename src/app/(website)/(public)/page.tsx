import { AffiliateCTA } from "@/components/group-buy-affiliate";
import { GroupBuySearch } from "@/components/group-buy-search";
import {
  CategoryCard,
  CollectionCard,
  ComparisonCard,
  FAQ,
  GuideCard,
  JsonLd,
  ProviderCard,
  ToolCard,
} from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import {
  publishedCategories,
  publishedCollections,
  publishedComparisons,
  publishedProviders,
} from "@/data/group-buy-directory";
import { guides, primaryTools, tools } from "@/data/group-buy-tools";
import { faqSchema } from "@/lib/group-buy";
import { constructMetadata } from "@/lib/metadata";
import Link from "next/link";

const pageMetadata = {
  title: "Group Buy Tools, Cheaper Alternatives & Tool Comparisons",
  description:
    "Compare group buy options, official pricing, cheaper alternatives and tool bundles for popular AI, ecommerce, SEO and marketing tools.",
  canonicalUrl: siteConfig.url,
  primaryKeyword: "group buy tools",
};
const homeFaqs = [
  {
    question: "What does Group Buy Tools compare?",
    answer:
      "Group Buy Tools compares official subscriptions, third-party access models, cheaper alternatives and multi-tool bundles for AI, ecommerce and marketing workflows.",
  },
  {
    question: "Are group buy tools official discounts?",
    answer:
      "Usually not. Group buy tools often refer to third-party or shared access, so check account ownership, privacy, limits and provider terms before paying.",
  },
  {
    question: "How should I verify a current access offer?",
    answer:
      "Open the linked official provider page, compare the current plan and usage rules, then check the third-party offer for its library, support, cancellation and interruption terms.",
  },
  {
    question: "Which Group Buy Tools page should I open first?",
    answer:
      "Start with the tool or workflow you need. Use the tools directory for product research, ad intelligence or AI work, then open a group buy or alternative guide when you need an access-model comparison.",
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

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.url}/tools?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
  return (
    <>
      <section className="border-b border-slate-200 bg-[linear-gradient(135deg,#edf7f1_0%,#f7faf8_65%)]">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 text-center sm:px-8 sm:py-14">
          <div className="mx-auto max-w-3xl rounded-lg border border-indigo-100 bg-white/60 px-4 py-2 text-sm font-semibold text-indigo-900">
            Independent access comparisons for AI, ecommerce and marketing tools
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </div>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-indigo-800">
            Group Buy Tools · Independent guides
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl">
            Compare Group Buy Tools, Official Plans &amp; Cheaper Alternatives
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Compare official plans, group buy access, cheaper alternatives and
            tool bundles before you commit to a subscription.
          </p>
          <GroupBuySearch
            tools={tools}
            providers={publishedProviders}
            categories={publishedCategories}
            comparisons={publishedComparisons}
          />
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link
              href="/deals"
              className="tag border-indigo-600 bg-indigo-600 px-4 py-2 text-white"
            >
              Trending guides
            </Link>
            <Link
              href="/minea-group-buy"
              className="tag px-4 py-2 hover:border-indigo-400"
            >
              Minea group buy
            </Link>
            <Link
              href="/claude-group-buy"
              className="tag px-4 py-2 hover:border-indigo-400"
            >
              AI tool access
            </Link>
            <Link
              href="/spybox-alternative"
              className="tag px-4 py-2 hover:border-indigo-400"
            >
              SpyBox options
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
              Featured offers
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Start with the products people compare most
            </h2>
          </div>
          <Link href="/tools" className="text-sm font-bold text-indigo-800">
            Browse all tools →
          </Link>
        </div>
        <AffiliateCTA pageType="homepage" pageSlug="home" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {primaryTools.map((tool) => (
            <ToolCard tool={tool} key={tool.slug} />
          ))}
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
              Categories
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Browse by workflow
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-sm font-bold text-indigo-800"
          >
            All categories →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {publishedCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
              Providers
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Review the access source
            </h2>
          </div>
          <Link href="/providers" className="text-sm font-bold text-indigo-800">
            All providers →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {publishedProviders.map((provider) => (
            <ProviderCard key={provider.slug} provider={provider} />
          ))}
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
              Comparisons
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Make the provider choice explicit
            </h2>
          </div>
          <Link href="/compare" className="text-sm font-bold text-indigo-800">
            All comparisons →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {publishedComparisons.map((comparison) => (
            <ComparisonCard key={comparison.slug} comparison={comparison} />
          ))}
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
              Collections
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Shortlists for real decisions
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-sm font-bold text-indigo-800"
          >
            All collections →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {publishedCollections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8">
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-7 sm:p-9">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
            Recently verified
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Follow the latest source checks
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Recent checks show when a public page was reviewed. They do not
            guarantee availability, uptime or unchanged terms.
          </p>
          <Link
            href="/collections/recently-verified"
            className="mt-5 inline-flex text-sm font-bold text-indigo-800"
          >
            Open recently verified collection →
          </Link>
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
              Group buy guides
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Go deeper on a product decision
            </h2>
          </div>
          <Link href="/deals" className="text-sm font-bold text-indigo-800">
            View all guides →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide) => (
            <GuideCard guide={guide} key={guide.slug} />
          ))}
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8">
        <FAQ items={homeFaqs} />
      </section>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-300">
            Our approach
          </p>
          <h2 className="mt-3 text-3xl font-black">How We Compare Tools</h2>
          <p className="mt-4 max-w-3xl leading-7 text-indigo-100/80">
            We check pricing regularly, explain official and third-party access
            separately, and match alternatives to real budgets and workflows. We
            do not directly sell shared software accounts.
          </p>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <strong>Pricing checked regularly</strong>
              <p className="mt-2 text-sm text-indigo-100/70">
                Verify provider pricing and terms before purchase.
              </p>
            </div>
            <div>
              <strong>Independent comparisons</strong>
              <p className="mt-2 text-sm text-indigo-100/70">
                Affiliate commissions do not automatically determine rankings.
              </p>
            </div>
            <div>
              <strong>Useful alternatives</strong>
              <p className="mt-2 text-sm text-indigo-100/70">
                Compare fit, limits and workflow depth alongside cost.
              </p>
            </div>
            <div>
              <strong>Clear disclosure</strong>
              <p className="mt-2 text-sm text-indigo-100/70">
                Some links may earn a commission at no extra cost.
              </p>
            </div>
          </div>
        </div>
      </section>
      <JsonLd id="group-buy-home-schema" data={schema} />
      <JsonLd id="group-buy-home-faq" data={faqSchema(homeFaqs)} />
    </>
  );
}
