import { AffiliateCTA } from "@/components/group-buy-affiliate";
import {
  Breadcrumbs,
  ComparisonTable,
  Disclosure,
  FAQ,
  JsonLd,
  PageHero,
} from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { spyboxDirectory, toolMap } from "@/data/group-buy-tools";
import { breadcrumbSchema, faqSchema, formatDate } from "@/lib/group-buy";
import { constructMetadata } from "@/lib/metadata";
import Link from "next/link";

const faqs = [
  {
    question: "What is SpyBox?",
    answer:
      "SpyBox is a third-party multi-tool access option. Its public tools directory currently lists 36 tools across six categories, but the listing should not be treated as a guarantee of access level, uptime or export rights.",
  },
  {
    question: "How much does SpyBox cost?",
    answer:
      "The current offer lists €29.99 per month or €249.99 per year for the all-inclusive plan. Check the checkout total, taxes, included tools and cancellation terms before paying.",
  },
  {
    question: "Does SpyBox currently list Minea, Kalodata, PiPiADS and Claude?",
    answer:
      "The public directory checked on September 21, 2026 lists Minea, Kalodata, Pipi Ads and Claude AI. A public listing confirms what SpyBox advertises at the time of checking, not a guaranteed access outcome.",
  },
  {
    question: "What is the SpyBox coupon code?",
    answer:
      "Use promo code DCWSCX at checkout for 10% off, then confirm that the discount appears in the final checkout total.",
  },
  {
    question: "Who should avoid SpyBox?",
    answer:
      "Avoid relying on a third-party bundle for confidential work, guaranteed uptime, contractual exports or a workflow that cannot tolerate access interruptions until those terms are documented for your account.",
  },
];

export const metadata = constructMetadata({
  title: "SpyBox Review: Tools, Pricing, Access Model & Coupon (2026)",
  description:
    "Review SpyBox's public tool directory, current pricing, access questions, 10% coupon code and fit for ecommerce and AI workflows.",
  canonicalUrl: `${siteConfig.url}/spybox-review`,
  primaryKeyword: "SpyBox review",
});

export default function SpyBoxReviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Multi-tool access review"
        title="SpyBox Review: Tools, Pricing, Access Model & Coupon"
        description="A source-checked overview of SpyBox's public tool directory, current offer, coupon and questions to answer before purchase."
      >
        <p className="mt-4 text-sm text-slate-500">
          Directory checked: {formatDate(spyboxDirectory.lastChecked)}
        </p>
      </PageHero>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="prose-content max-w-none">
          <Breadcrumbs
            items={[
              { label: "Tools", href: "/tools" },
              { label: "SpyBox Review" },
            ]}
          />
          <h2>Quick verdict</h2>
          <p>
            SpyBox is a third-party multi-tool access option. Its public
            directory currently lists {spyboxDirectory.toolCount} tools across
            six categories, including the Minea, Kalodata, Pipi Ads and Claude
            AI listings checked for this review. That evidence supports a
            current listing claim; it does not prove a specific account model,
            export right, uptime level or support response.
          </p>
          <AffiliateCTA pageType="review" pageSlug="spybox-review" />
          <h2>What SpyBox currently lists</h2>
          <ComparisonTable
            headers={["Category", "Listed tools", "What it suggests"]}
            rows={spyboxDirectory.categories.map((category) => [
              category.name,
              String(category.count),
              "A category represented in the public directory",
            ])}
          />
          <p>
            The directory is useful for checking whether a tool is advertised
            before you click through. Recheck it immediately before purchase
            because the public list and access terms can change.
          </p>
          <h2>SpyBox pricing and coupon</h2>
          <div className="mt-4 rounded-xl border border-slate-300 bg-slate-50 p-5">
            <p className="text-lg font-black text-slate-950">
              {toolMap.spybox.pricing.summary}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use promo code <strong>DCWSCX</strong> at checkout for 10% off.
              Confirm the discount, currency, taxes and renewal terms in the
              final checkout step.
            </p>
            <p className="mt-3 text-xs font-semibold text-slate-500">
              Price checked{" "}
              {formatDate(
                toolMap.spybox.pricing.lastChecked ||
                  spyboxDirectory.lastChecked,
              )}
              {toolMap.spybox.pricing.sourceUrl && (
                <>
                  {" · "}
                  <a
                    href={toolMap.spybox.pricing.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-indigo-800 underline"
                  >
                    View price source ↗
                  </a>
                </>
              )}
            </p>
          </div>
          <h2>What still needs verification</h2>
          <ul>
            <li>
              Whether the listed tool is available on the plan you select.
            </li>
            <li>
              Whether access uses a shared account, managed login or another
              model.
            </li>
            <li>Device, IP, concurrency, export and daily-use limits.</li>
            <li>
              Support response, interruptions, refunds and cancellation
              handling.
            </li>
            <li>
              Whether your data is appropriate for a third-party access model.
            </li>
          </ul>
          <h2>Who SpyBox may fit</h2>
          <p>
            SpyBox may fit readers who want to compare several AI, ecommerce, ad
            research, SEO and content tools from one access point and who can
            tolerate provider-specific limits. It is a weaker fit for sensitive
            work, contractual deliverables or workflows that require a
            provider-owned account with predictable support.
          </p>
          <h2>SpyBox alternatives and next steps</h2>
          <p>
            Compare the public listing and price with the official plan for the
            tool you actually need. Then use the comparison pages for
            access-model trade-offs rather than assuming that a larger bundle is
            a complete replacement.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/spybox-alternative"
              className="rounded-lg border border-slate-300 bg-white p-4 text-sm font-bold text-indigo-800 hover:border-indigo-500"
            >
              Compare SpyBox alternatives →
            </Link>
            <Link
              href="/spybox-vs-flikover"
              className="rounded-lg border border-slate-300 bg-white p-4 text-sm font-bold text-indigo-800 hover:border-indigo-500"
            >
              SpyBox vs Flikover →
            </Link>
          </div>
          <FAQ items={faqs} />
          <Disclosure />
        </article>
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-black">SpyBox sources</h2>
          <a
            href={spyboxDirectory.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-sm font-bold text-indigo-800"
          >
            Public tools directory ↗
          </a>
          <a
            href={toolMap.spybox.pricing.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-sm font-bold text-indigo-800"
          >
            Current price source ↗
          </a>
          <Link
            href="/minea-group-buy"
            className="mt-6 block text-sm font-bold text-indigo-800"
          >
            Minea Group Buy guide →
          </Link>
        </aside>
      </section>
      <JsonLd
        id="spybox-review-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: "SpyBox Review" },
        ])}
      />
      <JsonLd id="spybox-review-faq" data={faqSchema(faqs)} />
    </>
  );
}
