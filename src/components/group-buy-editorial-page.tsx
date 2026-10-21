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
import type { EditorialPage } from "@/data/group-buy-weekly-pages";
import { breadcrumbSchema, faqSchema, formatDate } from "@/lib/group-buy";
import Link from "next/link";

export function GroupBuyEditorialPage({ page }: { page: EditorialPage }) {
  return (
    <>
      <PageHero
        compact
        eyebrow={page.kind}
        title={page.title}
        description={page.description}
      />
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_270px]">
        <article className="prose-content min-w-0 max-w-none">
          <Breadcrumbs items={[page.parent, { label: page.title }]} />
          <h2>Quick answer</h2>
          <p>{page.verdict}</p>
          <p className="text-sm">
            Public sources checked{" "}
            <time dateTime={page.checkedAt}>{formatDate(page.checkedAt)}</time>.
            This is a public-information review; paid accounts, uptime and
            checkout were not tested.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {page.choices.map((choice) => (
              <section
                key={choice.title}
                className="rounded-xl border border-slate-300 bg-slate-50 p-5"
              >
                <h3 className="!mt-0">{choice.title}</h3>
                <p>{choice.text}</p>
              </section>
            ))}
          </div>
          <h2>{page.table.title}</h2>
          <ComparisonTable
            headers={page.table.headers}
            rows={page.table.rows}
            label={page.table.title}
          />
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {section.steps && (
                <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-slate-600">
                  {section.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}
              {section.links && (
                <ul>
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label} →</Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <section>
            <h2>{page.conclusion.title}</h2>
            <p>{page.conclusion.text}</p>
          </section>
          {page.sponsored && (
            <AffiliateCTA
              pageType={page.kind}
              pageSlug={page.path.slice(1)}
              evidenceCheckedAt={page.checkedAt}
            />
          )}
          <FAQ items={page.faq} />
          <section id="sources">
            <h2>Sources and limits of this review</h2>
            <ul>
              {page.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label} ↗
                  </a>
                  <span className="block text-sm">
                    Checked {formatDate(s.checkedAt)}. {s.finding}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <Disclosure />
        </article>
        <aside className="h-fit rounded-xl border border-slate-300 bg-white p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-black">Continue your comparison</h2>
          {page.related.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mt-4 block text-sm font-bold text-indigo-800"
            >
              {link.label} →
            </Link>
          ))}
        </aside>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8">
        <h2 className="mb-5 text-2xl font-black">Related guides</h2>
        <RelatedPages links={page.related} />
      </section>
      <JsonLd
        id="editorial-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: page.parent.label, path: page.parent.href },
          { name: page.title, path: page.path },
        ])}
      />
      <JsonLd id="editorial-faq" data={faqSchema(page.faq)} />
    </>
  );
}
