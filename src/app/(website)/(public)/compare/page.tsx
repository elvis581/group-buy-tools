import {
  Breadcrumbs,
  ComparisonCard,
  JsonLd,
  PageHero,
} from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { publishedComparisons } from "@/data/group-buy-directory";
import { breadcrumbSchema, itemListSchema } from "@/lib/group-buy";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Compare Research Tools & Group Buy Providers",
  description:
    "Compare ecommerce research tools and group-buy providers by workflow, price, billing period, access limits and source-backed evidence.",
  canonicalUrl: `${siteConfig.url}/compare`,
  primaryKeyword: "group buy comparison",
});

export default function ComparePage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Comparison directory"
        title="Compare Research Tools and Access Providers"
        description="Head-to-head decision pages that keep pricing, public evidence, limits and workflow fit in the same frame."
      />
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <Breadcrumbs items={[{ label: "Compare" }]} />
        <p className="max-w-3xl text-base leading-7 text-slate-600">
          Comparisons are built from the same dimensions on both sides. They do
          not turn an unconfirmed feature or price into a claim, and they do not
          rank a provider without current evidence.
        </p>
        {(["provider", "tool"] as const).map((kind) => (
          <section key={kind} className="mt-8">
            <h2 className="text-2xl font-black">
              {kind === "provider"
                ? "Provider comparisons"
                : "Tool comparisons"}
            </h2>
            <p className="mt-2 text-slate-600">
              {kind === "provider"
                ? "Compare what a bundle includes, how it renews and the rules for access."
                : "Choose the research product that fits your ad, store or creator workflow."}
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {publishedComparisons
                .filter((item) => (item.article?.kind ?? "provider") === kind)
                .map((comparison) => (
                  <ComparisonCard
                    key={comparison.slug}
                    comparison={comparison}
                  />
                ))}
            </div>
          </section>
        ))}
      </section>
      <JsonLd
        id="compare-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
        ])}
      />
      <JsonLd
        id="compare-list"
        data={itemListSchema(
          "Tool Comparisons",
          publishedComparisons.map((comparison) => ({
            name: comparison.title,
            path: `/compare/${comparison.slug}`,
          })),
        )}
      />
    </>
  );
}
