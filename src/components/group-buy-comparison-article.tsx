import { AffiliateCTA } from "@/components/group-buy-affiliate";
import {
  Breadcrumbs,
  Disclosure,
  FAQ,
  JsonLd,
  PageHero,
  RelatedPages,
} from "@/components/group-buy-site";
import type { ComparisonArticle } from "@/data/group-buy-comparisons";
import { type Comparison, providerMap } from "@/data/group-buy-directory";
import { toolMap } from "@/data/group-buy-tools";
import { breadcrumbSchema, faqSchema, formatDate } from "@/lib/group-buy";
import Link from "next/link";

export function ComparisonArticlePage({
  comparison,
  article,
}: { comparison: Comparison; article: ComparisonArticle }) {
  const entities = article.sides.map((slug) =>
    article.kind === "provider" ? providerMap[slug] : toolMap[slug],
  );
  const profiles = entities.map((entity) => ({
    href: `/${article.kind === "provider" ? "providers" : "tools"}/${entity.slug}`,
    label: `${entity.name} ${article.kind === "provider" ? "provider profile" : "tool overview"}`,
  }));
  return (
    <>
      <PageHero
        compact
        eyebrow={
          article.kind === "provider"
            ? "Provider comparison"
            : "Research tool comparison"
        }
        title={comparison.title}
        description={article.lead}
      />
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="prose-content min-w-0 max-w-none">
          <Breadcrumbs
            items={[
              { label: "Compare", href: "/compare" },
              { label: comparison.title },
            ]}
          />
          <p className="text-sm text-slate-600">
            Sources checked{" "}
            <time dateTime={comparison.lastUpdated}>
              {formatDate(comparison.lastUpdated)}
            </time>
            . Based on public product and pricing information, without
            paid-account performance testing.
          </p>
          <h2>Which should you choose?</h2>
          <p>{comparison.verdict}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {entities.map((entity, index) => (
              <section
                key={entity.slug}
                className="rounded-xl border border-slate-300 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-black">
                  When to choose {entity.name}
                </h3>
                <p>{article.choices[index]}</p>
              </section>
            ))}
          </div>
          <p className="rounded-lg border border-amber-300 bg-amber-50 p-4">
            <strong>When neither fits: </strong>
            {article.neither}
          </p>
          <h2>{article.tableTitle}</h2>
          <section
            aria-label={`${comparison.title} comparison table; scroll horizontally on small screens`}
            // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users must be able to scroll this wide comparison table.
            tabIndex={0}
            className="overflow-x-auto rounded-xl border border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-700"
          >
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">{article.tableTitle}</caption>
              <thead className="bg-slate-100">
                <tr>
                  {[
                    "Decision factor",
                    ...entities.map((entity) => entity.name),
                  ].map((label) => (
                    <th key={label} scope="col" className="p-4 font-bold">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {article.rows.map(([factor, left, right]) => (
                  <tr key={factor} className="border-t border-slate-300">
                    <th scope="row" className="p-4 align-top font-bold">
                      {factor}
                    </th>
                    <td className="p-4 align-top">{left}</td>
                    <td className="p-4 align-top">{right}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <section>
            <h2>{article.exerciseTitle}</h2>
            <p>
              Use this evaluation checklist with an available demo or account
              before committing to a plan.
            </p>
            <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-slate-600">
              {article.exercise.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <h2>The decision</h2>
          <p>{article.conclusion}</p>
          <FAQ items={article.faq} />
          <section id="sources">
            <h2>Sources and verification limits</h2>
            <ul>
              {article.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.label} ↗
                  </a>
                  <span className="block text-sm text-slate-600">
                    Checked {formatDate(source.checkedAt)}. {source.finding}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          {article.sponsoredSpybox && (
            <AffiliateCTA
              pageType="comparison"
              pageSlug={`compare/${comparison.slug}`}
              evidenceCheckedAt={comparison.lastUpdated}
            />
          )}
          <Disclosure />
          <Link href="/affiliate-disclosure" className="text-sm underline">
            Read our affiliate disclosure
          </Link>
        </article>
        <aside className="h-fit rounded-xl border border-slate-300 bg-white p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-black">Explore the options</h2>
          {profiles.map((profile) => (
            <Link
              key={profile.href}
              href={profile.href}
              className="mt-4 block text-sm font-bold text-indigo-800"
            >
              {profile.label} →
            </Link>
          ))}
          <Link
            href="/compare"
            className="mt-6 block border-t border-slate-200 pt-4 text-sm font-bold text-indigo-800"
          >
            All comparisons →
          </Link>
        </aside>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8">
        <h2 className="mb-5 text-2xl font-black">Continue your research</h2>
        <RelatedPages links={article.related} />
      </section>
      <JsonLd
        id="comparison-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: comparison.title, path: `/compare/${comparison.slug}` },
        ])}
      />
      <JsonLd id="comparison-faq" data={faqSchema(article.faq)} />
    </>
  );
}
