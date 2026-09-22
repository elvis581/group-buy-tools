import { AffiliateCTA } from "@/components/group-buy-affiliate";
import {
  Breadcrumbs,
  ComparisonTable,
  Disclosure,
  FAQ,
  JsonLd,
  PageHero,
  RelatedPages,
} from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import {
  comparisonMap,
  providerMap,
  publishedComparisons,
} from "@/data/group-buy-directory";
import { formatPricingLabel, toolMap } from "@/data/group-buy-tools";
import { breadcrumbSchema, faqSchema } from "@/lib/group-buy";
import { constructMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return publishedComparisons.map((comparison) => ({ slug: comparison.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }) {
  const comparison = comparisonMap[params.slug];
  if (!comparison?.published) return {};
  return constructMetadata({
    title: `${comparison.title}: Pricing, Limits & Workflow Fit`,
    description: comparison.description,
    canonicalUrl: `${siteConfig.url}/compare/${comparison.slug}`,
    primaryKeyword: comparison.title,
  });
}

export default function ComparisonPage({
  params,
}: { params: { slug: string } }) {
  const comparison = comparisonMap[params.slug];
  if (!comparison?.published) notFound();
  const [left, right] = comparison.providerSlugs.map(
    (slug) => providerMap[slug],
  );
  const leftTool = toolMap[comparison.toolSlugs[0]];
  const rightTool = toolMap[comparison.toolSlugs[1]];
  if (!left || !right || !leftTool || !rightTool) notFound();
  const rows = [
    [
      "Pricing",
      left.startingPrice || formatPricingLabel(leftTool),
      right.startingPrice || formatPricingLabel(rightTool),
    ],
    [
      "Public library",
      left.publicToolCount || "Not publicly listed",
      right.publicToolCount || "Not publicly listed",
    ],
    [
      "Access model",
      left.accessMethod || "Not publicly disclosed",
      right.accessMethod || "Not publicly disclosed",
    ],
    [
      "Billing",
      left.billingCycle || "Not publicly disclosed",
      right.billingCycle || "Not publicly disclosed",
    ],
    [
      "Refund policy",
      left.refundPolicy || "Not publicly disclosed",
      right.refundPolicy || "Not publicly disclosed",
    ],
    [
      "Support",
      left.supportChannels?.join(", ") || "Not publicly disclosed",
      right.supportChannels?.join(", ") || "Not publicly disclosed",
    ],
  ];
  const faqs = [
    {
      question: `Is ${left.name} better than ${right.name}?`,
      answer: comparison.verdict,
    },
    {
      question: "Are both sides verified equally?",
      answer:
        "No. Each cell reflects the evidence available for that provider. A missing or undisclosed value should be treated as an open question, not as proof that the other side is better.",
    },
    {
      question: "What should I compare before paying?",
      answer:
        "Compare the exact tool list, account ownership, concurrent sessions, usage caps, support, cancellation and refund terms for the workflow you plan to run.",
    },
  ];
  return (
    <>
      <PageHero
        eyebrow="Head-to-head comparison"
        title={comparison.title}
        description={comparison.description}
      />
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="prose-content max-w-none">
          <Breadcrumbs
            items={[
              { label: "Compare", href: "/compare" },
              { label: comparison.title },
            ]}
          />
          <h2>Quick verdict</h2>
          <p>{comparison.verdict}</p>
          <h2>Shared comparison dimensions</h2>
          <ul>
            {comparison.dimensions.map((dimension) => (
              <li key={dimension}>{dimension}</li>
            ))}
          </ul>
          <h2>Side-by-side evidence</h2>
          <ComparisonTable
            headers={["Dimension", left.name, right.name]}
            rows={rows}
          />
          <h2>How to use this comparison</h2>
          <p>
            Start with the product or workflow you need, then open each provider
            page and confirm the commercial details immediately before purchase.
            A bundle headline cannot establish feature parity, privacy,
            reliability or support for your account.
          </p>
          <AffiliateCTA
            pageType="comparison"
            pageSlug={`compare/${comparison.slug}`}
          />
          <FAQ items={faqs} />
          <Disclosure />
        </article>
        <aside className="h-fit rounded-xl border border-slate-300 bg-white p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-black">Open source pages</h2>
          {[left, right].map((provider) => (
            <Link
              key={provider.slug}
              href={`/providers/${provider.slug}`}
              className="mt-4 block text-sm font-bold text-indigo-800"
            >
              {provider.name} provider review →
            </Link>
          ))}
          {[leftTool, rightTool].map((tool) => (
            <Link
              key={tool.slug}
              href={
                tool.slug === "flikover"
                  ? "/providers/flikover"
                  : `/tools/${tool.slug}`
              }
              className="mt-4 block text-sm font-bold text-indigo-800"
            >
              {tool.name} {tool.slug === "flikover" ? "provider" : "tool"} page
              →
            </Link>
          ))}
        </aside>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8">
        <RelatedPages
          links={[
            { href: "/providers", label: "All provider reviews" },
            {
              href: "/collections/recently-verified",
              label: "Recently verified",
            },
            { href: "/tools", label: "All tools" },
          ]}
        />
      </section>
      <JsonLd
        id="comparison-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: comparison.title, path: `/compare/${comparison.slug}` },
        ])}
      />
      <JsonLd id="comparison-faq" data={faqSchema(faqs)} />
    </>
  );
}
