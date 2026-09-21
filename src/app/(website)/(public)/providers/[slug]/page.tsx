import { AffiliateCTA } from "@/components/group-buy-affiliate";
import {
  Breadcrumbs,
  Disclosure,
  FAQ,
  JsonLd,
  PageHero,
  RelatedPages,
} from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import {
  offersForProvider,
  providerMap,
  publishedProviders,
} from "@/data/group-buy-directory";
import { toolMap } from "@/data/group-buy-tools";
import { breadcrumbSchema, faqSchema, formatDate } from "@/lib/group-buy";
import { constructMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return publishedProviders.map((provider) => ({ slug: provider.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }) {
  const provider = providerMap[params.slug];
  if (!provider?.published) return {};
  return constructMetadata({
    title: `${provider.name} Review: Pricing, Tools, Access & Support`,
    description: `${provider.shortDescription} Review public pricing, tool coverage, access model, limits, support and source notes for ${provider.name}.`,
    canonicalUrl: `${siteConfig.url}/providers/${provider.slug}`,
    primaryKeyword: `${provider.name} review`,
  });
}

export default function ProviderPage({ params }: { params: { slug: string } }) {
  const provider = providerMap[params.slug];
  if (!provider?.published) notFound();
  const offers = offersForProvider(provider.slug);
  const listedTools = offers
    .map((offer) => toolMap[offer.toolSlug])
    .filter(Boolean);
  const faqs = [
    {
      question: `What does the ${provider.name} provider page verify?`,
      answer: `It records the public source, pricing notes, listed coverage and access questions available for ${provider.name}. It does not guarantee uptime, account access or a particular tool unless the provider documents that detail.`,
    },
    {
      question: `Is ${provider.name} an official plan for every listed tool?`,
      answer:
        "No. Treat a third-party provider listing and an official product subscription as separate access models, then check ownership, privacy, limits and support.",
    },
    {
      question: `What should I confirm before paying ${provider.name}?`,
      answer:
        "Confirm the exact tool or plan, account model, concurrent-session rules, usage caps, support path, cancellation and refund terms at checkout.",
    },
    {
      question: `How current is this ${provider.name} review?`,
      answer: `The provider record was last checked on ${formatDate(provider.lastVerified)}. Recheck the source immediately before relying on a recurring offer because provider terms can change.`,
    },
  ];
  return (
    <>
      <PageHero
        eyebrow="Provider review"
        title={`${provider.name}: Pricing, Tools, Access & Support`}
        description={provider.shortDescription}
      >
        <p className="mt-4 text-sm text-slate-500">
          Last verified: {formatDate(provider.lastVerified)}
        </p>
      </PageHero>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="prose-content max-w-none">
          <Breadcrumbs
            items={[
              { label: "Providers", href: "/providers" },
              { label: provider.name },
            ]}
          />
          <h2>Quick verdict</h2>
          <p>
            {provider.name} is listed as a provider-level access option. Use the
            public evidence below to decide whether its current offer deserves a
            closer check, then verify every commercial detail with the provider.
          </p>
          <h2>Public pricing and access model</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              [
                "Public library",
                provider.publicToolCount || "Not publicly listed",
              ],
              [
                "Starting price",
                provider.startingPrice || "Not publicly disclosed",
              ],
              ["Billing", provider.billingCycle || "Not publicly disclosed"],
              ["Access", provider.accessMethod || "Not publicly disclosed"],
              ["Refunds", provider.refundPolicy || "Not publicly disclosed"],
              [
                "Support",
                provider.supportChannels?.join(", ") ||
                  "Not publicly disclosed",
              ],
            ].map(([term, value]) => (
              <div
                key={term}
                className="rounded-lg border border-slate-300 bg-white p-4"
              >
                <dt className="text-xs font-black uppercase tracking-wide text-slate-500">
                  {term}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-slate-700">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <h2>Public tool library and offers</h2>
          {listedTools.length ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {listedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="rounded-lg border border-slate-300 bg-white p-4 text-sm font-bold text-indigo-800 hover:border-indigo-500"
                >
                  {tool.name} tool page <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          ) : (
            <p>
              No provider offer records are currently published for this
              provider.
            </p>
          )}
          <p className="mt-4">
            A provider listing shows what was publicly advertised when checked.
            It does not independently confirm access, feature parity, export
            rights, support response or uninterrupted service.
          </p>
          <h2>Limits, refunds and support to verify</h2>
          <ul>
            <li>Account ownership, login method and permitted sessions.</li>
            <li>Device, IP, concurrency, usage and export limits.</li>
            <li>How support handles interruptions and account recovery.</li>
            <li>Cancellation, refund and renewal terms.</li>
            <li>Whether your work is appropriate for a third-party account.</li>
          </ul>
          {provider.slug === "spybox" && (
            <AffiliateCTA
              pageType="provider_review"
              pageSlug="providers/spybox"
            />
          )}
          <h2>Sources</h2>
          <ul>
            {provider.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.label} ↗
                </a>{" "}
                <span>checked {formatDate(source.checkedAt)}</span>
              </li>
            ))}
          </ul>
          <FAQ items={faqs} />
          <Disclosure />
        </article>
        <aside className="h-fit rounded-xl border border-slate-300 bg-white p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-black">Continue researching</h2>
          <a
            href={provider.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-sm font-bold text-indigo-800"
          >
            Visit {provider.name} source ↗
          </a>
          <Link
            href="/tools"
            className="mt-4 block text-sm font-bold text-indigo-800"
          >
            Browse product pages →
          </Link>
          <Link
            href="/compare"
            className="mt-4 block text-sm font-bold text-indigo-800"
          >
            Compare providers →
          </Link>
        </aside>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8">
        <h2 className="text-2xl font-black">Related pages</h2>
        <div className="mt-5">
          <RelatedPages
            links={[
              ...listedTools.slice(0, 3).map((tool) => ({
                href: `/tools/${tool.slug}`,
                label: `${tool.name} tool page`,
              })),
              {
                href: "/collections/recently-verified",
                label: "Recently verified",
              },
            ]}
          />
        </div>
      </section>
      <JsonLd
        id="provider-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Providers", path: "/providers" },
          { name: provider.name, path: `/providers/${provider.slug}` },
        ])}
      />
      <JsonLd id="provider-faq" data={faqSchema(faqs)} />
    </>
  );
}
