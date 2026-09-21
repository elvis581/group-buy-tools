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
  title: "Tool Comparisons: Group Buy Providers & Access Models",
  description:
    "Compare published group-buy providers and tool access models by pricing, library, limits, support and workflow fit.",
  canonicalUrl: `${siteConfig.url}/compare`,
  primaryKeyword: "group buy comparison",
});

export default function ComparePage() {
  return (
    <>
      <PageHero
        eyebrow="Comparison directory"
        title="Compare Providers and Tool Access Models"
        description="Head-to-head decision pages that keep pricing, public evidence, limits and workflow fit in the same frame."
      />
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <Breadcrumbs items={[{ label: "Compare" }]} />
        <p className="max-w-3xl text-base leading-7 text-slate-600">
          Comparisons are built from the same dimensions on both sides. They do
          not turn an unconfirmed feature or price into a claim, and they do not
          rank a provider without current evidence.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {publishedComparisons.map((comparison) => (
            <ComparisonCard key={comparison.slug} comparison={comparison} />
          ))}
        </div>
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
