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
  formatPricingLabel,
  primaryTools,
  toolMap,
} from "@/data/group-buy-tools";
import { breadcrumbSchema, faqSchema, formatDate } from "@/lib/group-buy";
import { constructMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return primaryTools.map((tool) => ({ slug: tool.slug }));
}
export const dynamicParams = false;
export function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = toolMap[params.slug];
  if (!tool) return {};
  return constructMetadata({
    title: `${tool.name}: Pricing, Features, Alternatives & Cheaper Options`,
    description: `${tool.shortDescription} Review the workflow, pricing notes, pros, cons and alternatives for ${tool.name}.`,
    canonicalUrl: `${siteConfig.url}/tools/${params.slug}`,
    primaryKeyword: tool.name,
  });
}
export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = toolMap[params.slug];
  if (!tool || !primaryTools.some((item) => item.slug === params.slug))
    notFound();
  const faqs = [
    {
      question: `Who is ${tool.name} best for?`,
      answer: `${tool.name} is best for ${tool.bestFor.join(", ")}. Confirm the current feature set and terms with the provider before making a decision.`,
    },
    {
      question: `Is ${tool.name} pricing confirmed here?`,
      answer: tool.pricing.confirmed
        ? `${tool.pricing.summary || formatPricingLabel(tool)} This amount is based on a checked provider source.`
        : "Current pricing is not confirmed in this guide. Check the official provider page for the latest plans and usage limits.",
    },
    {
      question: `What should I verify before using ${tool.name}?`,
      answer: `Check the current ${tool.name} feature scope, usage limits, account rules, cancellation terms and support channel. The right checks depend on whether you need ${tool.bestFor[0].toLowerCase()} or another workflow.`,
    },
    {
      question: `Can an alternative replace ${tool.name} for every workflow?`,
      answer: `Not necessarily. ${tool.name} is listed alongside ${tool.alternatives.join(" and ")}; compare the exact data, output or access requirement before treating any alternative as a full replacement.`,
    },
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.shortDescription,
    url: `${siteConfig.url}/tools/${tool.slug}`,
    applicationCategory: tool.categories.join(", "),
    offers:
      tool.pricing.confirmed && tool.pricing.startingPrice
        ? {
            "@type": "Offer",
            price: tool.pricing.startingPrice,
            currency: tool.pricing.currency || "USD",
          }
        : undefined,
  };
  return (
    <>
      <PageHero
        eyebrow={tool.categories.join(" · ")}
        title={`${tool.name}: Pricing, Features, Alternatives & Cheaper Options`}
        description={tool.fullDescription}
      >
        <p className="mt-4 text-sm text-slate-500">
          Last verified: {formatDate(tool.lastVerified)}
        </p>
      </PageHero>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="prose-content max-w-none">
          <Breadcrumbs
            items={[{ label: "Tools", href: "/tools" }, { label: tool.name }]}
          />
          <h2>Quick overview</h2>
          <p>
            {tool.shortDescription} This tool page covers the product decision
            itself. Group buy and alternative pages address separate search
            intents.
          </p>
          <h2>What is {tool.name}?</h2>
          <p>{tool.fullDescription}</p>
          <h2>Best for</h2>
          <ul>
            {tool.bestFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>Key features</h2>
          <ul>
            {tool.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>Pricing overview</h2>
          <div className="mt-4 rounded-xl border border-slate-300 bg-slate-50 p-5">
            <p className="text-lg font-black text-slate-950">
              {tool.pricing.summary || formatPricingLabel(tool)}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {tool.pricing.notes}
            </p>
            <p className="mt-3 text-xs font-semibold text-slate-500">
              Checked{" "}
              {formatDate(tool.pricing.lastChecked || tool.lastVerified)}
              {tool.pricing.sourceUrl && (
                <>
                  {" · "}
                  <a
                    href={tool.pricing.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-indigo-800 underline"
                  >
                    View pricing source ↗
                  </a>
                </>
              )}
            </p>
          </div>
          <h2>Pros</h2>
          <ul>
            {tool.pros.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>Cons</h2>
          <ul>
            {tool.cons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>Who should use {tool.name}?</h2>
          <p>
            Choose it when its core workflow matches your research or
            productivity job and the current provider terms fit your budget.
            Verify the details that matter to you rather than relying on a
            headline price.
          </p>
          <h2>Is {tool.name} worth the price?</h2>
          <p>
            That depends on frequency of use, value of the outputs and whether
            an alternative covers the same workflow. Compare the related guides
            before deciding.
          </p>
          <h2>Cheaper ways to access similar features</h2>
          <p>
            Review official pricing first. Then compare alternatives and, where
            relevant, a multi-tool option. Shared or third-party access can
            involve session limits, privacy concerns, usage caps, account
            restrictions and interruptions.
          </p>
          <AffiliateCTA
            pageType="tool_detail"
            pageSlug={`tools/${tool.slug}`}
            toolName={tool.spyboxIncluded ? tool.name : undefined}
          />
          <h2>Questions to verify before choosing</h2>
          <p>
            Start with the exact job you need {tool.name} to perform. Write down
            the markets, channels, export needs and collaboration requirements
            that matter to your workflow. A broad feature list is less useful
            than a clear answer to whether the provider supports your real
            research or productivity routine.
          </p>
          <p>
            For {tool.name}, compare that job with the provider's current
            coverage rather than an older feature summary.
          </p>
          <p>
            Check the provider page for current plan scope, usage limits,
            account rules, cancellation terms and support channels. These facts
            can change independently of the product name or an older review. If
            you are comparing shared access, also ask who controls the account,
            whether sessions can overlap, and what happens when access is
            interrupted.
          </p>
          <h2>A practical evaluation workflow</h2>
          <ol>
            <li>Define the decision or research task you need to complete.</li>
            <li>Test the official workflow against your market and volume.</li>
            <li>
              Record the limits, data coverage and export behavior you observe.
            </li>
            <li>Compare alternatives only after the baseline is documented.</li>
          </ol>
          <p>
            This process keeps a cheaper option in context. It also makes it
            easier to notice when a lower-cost access model trades away privacy,
            reliability, support or the specific feature that created the value
            in the first place. Recheck the provider before a recurring purchase
            because pricing, availability and terms are not permanent.
          </p>
          <p>
            Recheck {tool.name} itself before you rely on a recurring workflow,
            because its limits and provider terms can change.
          </p>
          <p>
            Keep the {tool.name} decision tied to the workflow and evidence you
            can verify today.
          </p>
          <FAQ items={faqs} />
          <Disclosure />
        </article>
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-black">Explore {tool.name}</h2>
          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-sm font-bold text-indigo-800"
          >
            Check Official Pricing ↗
          </a>
          <Link
            href={
              tool.slug === "minea"
                ? "/minea-group-buy"
                : tool.slug === "kalodata"
                  ? "/kalodata-group-buy"
                  : tool.slug === "pipiads"
                    ? "/pipiads-group-buy"
                    : tool.slug === "claude"
                      ? "/claude-group-buy"
                      : tool.slug === "spybox"
                        ? "/spybox-review"
                        : "/alternatives"
            }
            className="mt-4 block text-sm font-bold text-indigo-800"
          >
            Compare access options →
          </Link>
          <Link
            href={
              tool.slug === "minea"
                ? "/minea-alternative"
                : tool.slug === "spybox"
                  ? "/spybox-alternative"
                  : "/alternatives"
            }
            className="mt-4 block text-sm font-bold text-indigo-800"
          >
            Compare alternatives →
          </Link>
        </aside>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8">
        <h2 className="text-2xl font-black">Related pages</h2>
        <div className="mt-5">
          <RelatedPages
            links={
              tool.slug === "minea"
                ? [
                    { href: "/minea-group-buy", label: "Minea Group Buy" },
                    { href: "/minea-alternative", label: "Minea Alternatives" },
                    { href: "/tools/pipiads", label: "PiPiADS" },
                    { href: "/tools/kalodata", label: "Kalodata" },
                  ]
                : tool.slug === "spybox"
                  ? [
                      { href: "/spybox-review", label: "SpyBox Review" },
                      {
                        href: "/spybox-alternative",
                        label: "SpyBox Alternatives",
                      },
                      {
                        href: "/spybox-vs-flikover",
                        label: "SpyBox vs Flikover",
                      },
                    ]
                  : [
                      { href: "/deals", label: "Group Buy Guides" },
                      { href: "/alternatives", label: "Cheaper Alternatives" },
                    ]
            }
          />
        </div>
      </section>
      <JsonLd id="tool-schema" data={schema} />
      <JsonLd
        id="tool-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: tool.name, path: `/tools/${tool.slug}` },
        ])}
      />
      <JsonLd id="tool-faq" data={faqSchema(faqs)} />
    </>
  );
}
