import { AffiliateCTA } from "@/components/group-buy-affiliate";
import { spyboxAffiliateUrl } from "@/config/site";
import type {
  Collection,
  Comparison,
  DirectoryCategory,
  Provider,
} from "@/data/group-buy-directory";
import {
  type Guide,
  type Tool,
  formatPricingLabel,
} from "@/data/group-buy-tools";
import { formatDate } from "@/lib/group-buy";
import Link from "next/link";

export function JsonLd({
  id,
  data,
}: {
  id: string;
  data: unknown;
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is serialized from trusted site-owned data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function GroupBuyHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="shell flex min-h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 font-bricolage text-lg font-black tracking-tight text-slate-950"
        >
          <span className="grid size-9 place-items-center rounded-lg bg-indigo-600 text-xs text-white">
            GB
          </span>
          <span>Group Buy Tools</span>
        </Link>
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Main navigation"
        >
          <Link
            href="/tools"
            className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
          >
            Tools
          </Link>
          <Link
            href="/deals"
            className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
          >
            Group Buy Guides
          </Link>
          <Link
            href="/alternatives"
            className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
          >
            Alternatives
          </Link>
          <Link
            href="/providers"
            className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
          >
            Providers
          </Link>
          <Link
            href="/compare"
            className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
          >
            Compare
          </Link>
        </nav>
        <a
          href={spyboxAffiliateUrl}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="button button-primary hidden sm:inline-flex"
        >
          Open SpyBox Offer <span aria-hidden="true">↗</span>
        </a>
        <details className="relative lg:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-md border border-border px-3 text-sm font-bold text-slate-700">
            Menu
          </summary>
          <nav
            className="absolute right-0 top-14 z-50 w-56 rounded-lg border border-border bg-white p-2 shadow-xl"
            aria-label="Mobile navigation"
          >
            <Link
              href="/tools"
              className="block rounded-md px-3 py-3 text-sm font-semibold hover:bg-indigo-50"
            >
              Tools
            </Link>
            <Link
              href="/deals"
              className="block rounded-md px-3 py-3 text-sm font-semibold hover:bg-indigo-50"
            >
              Group Buy Guides
            </Link>
            <Link
              href="/alternatives"
              className="block rounded-md px-3 py-3 text-sm font-semibold hover:bg-indigo-50"
            >
              Alternatives
            </Link>
            <Link
              href="/providers"
              className="block rounded-md px-3 py-3 text-sm font-semibold hover:bg-indigo-50"
            >
              Providers
            </Link>
            <Link
              href="/compare"
              className="block rounded-md px-3 py-3 text-sm font-semibold hover:bg-indigo-50"
            >
              Compare
            </Link>
            <a
              href={spyboxAffiliateUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="block rounded-md bg-indigo-50 px-3 py-3 text-sm font-bold text-indigo-800"
            >
              Open SpyBox Offer ↗
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function GroupBuyFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-white">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="flex items-center gap-3 font-black text-slate-950"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-indigo-600 text-xs text-white">
              GB
            </span>
            <span>Group Buy Tools</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Independent guides for comparing official pricing, third-party
            access, alternatives and software bundles.
          </p>
          <p className="mt-5 text-xs text-muted-foreground">
            Offers can change. Check the official source before relying on
            current terms.
          </p>
        </div>
        <FooterColumn
          title="Explore"
          links={[
            ["Tools", "/tools"],
            ["Group Buy Guides", "/deals"],
            ["Alternatives", "/alternatives"],
            ["Providers", "/providers"],
            ["Categories", "/categories"],
            ["Collections", "/collections"],
          ]}
        />
        <FooterColumn
          title="About"
          links={[
            ["About", "/about"],
            ["Editorial Policy", "/editorial-policy"],
            ["Affiliate Disclosure", "/affiliate-disclosure"],
          ]}
        />
        <FooterColumn
          title="Legal"
          links={[
            ["Privacy", "/privacy"],
            ["Terms", "/terms"],
          ]}
        />
      </div>
      <div className="border-t border-border py-5">
        <div className="shell flex flex-col justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <span>© 2026 Group Buy Tools</span>
          <span>Information only. Verify final terms with each provider.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h2 className="text-sm font-black text-slate-950">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-slate-600 hover:text-indigo-800"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Breadcrumbs({
  items,
}: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
      <Link href="/" className="hover:text-indigo-800">
        Home
      </Link>
      {items.map((item) => (
        <span key={item.label}>
          {" "}
          <span aria-hidden="true">/</span>{" "}
          {item.href ? (
            <Link href={item.href} className="hover:text-indigo-800">
              {item.label}
            </Link>
          ) : (
            item.label
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="border-b border-slate-200 bg-indigo-50">
      <div
        className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${compact ? "py-10 sm:py-14" : "py-14 sm:py-20"}`}
      >
        <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-800">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}

export function ToolCard({
  tool,
  link = true,
}: { tool: Tool; link?: boolean }) {
  const hasStandalonePage = link || tool.slug === "spybox";
  return (
    <article className="flex min-h-[250px] flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-indigo-100 text-xs font-black text-indigo-800">
          {tool.name.slice(0, 2).toUpperCase()}
        </span>
        <span className="rounded-full border border-slate-200 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-500">
          {tool.categories[0]}
        </span>
      </div>
      <h2 className="mt-5 text-xl font-black text-slate-950">
        {hasStandalonePage ? (
          <Link href={`/tools/${tool.slug}`} className="hover:text-indigo-800">
            {tool.name}
          </Link>
        ) : (
          tool.name
        )}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {tool.shortDescription}
      </p>
      <p className="mt-3 text-xs text-slate-600">
        <strong>Best for:</strong> {tool.bestFor.slice(0, 2).join(" · ")}
      </p>
      <p className="mt-3 text-sm font-black text-slate-950">
        {formatPricingLabel(tool)}
      </p>
      <div className="mt-auto pt-4">
        <p className="text-xs text-slate-500">
          Last verified: {formatDate(tool.lastVerified)}
        </p>
        {hasStandalonePage ? (
          <Link
            href={`/tools/${tool.slug}`}
            className="mt-2 inline-flex text-sm font-bold text-indigo-800"
          >
            {tool.slug === "spybox" ? "View SpyBox tool page" : "Explore tool"}{" "}
            <span className="ml-1" aria-hidden="true">
              →
            </span>
          </Link>
        ) : (
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-slate-500">
              Provider details require confirmation before purchase
            </span>
            {tool.affiliateUrl && (
              <a
                href={tool.affiliateUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="text-xs font-bold text-indigo-800"
              >
                Open SpyBox Offer ↗
              </a>
            )}
            <a
              href={tool.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-indigo-800"
            >
              Check provider ↗
            </a>
            {tool.slug === "flikover" && (
              <Link
                href="/providers/flikover"
                className="text-xs font-bold text-indigo-800"
              >
                Review provider →
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Link
      href={`/providers/${provider.slug}`}
      className="group rounded-xl border border-slate-300 bg-white p-5 transition hover:border-indigo-500"
    >
      <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
        Provider review
      </p>
      <h2 className="mt-3 text-xl font-black text-slate-950">
        {provider.name}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {provider.shortDescription}
      </p>
      <p className="mt-4 text-xs font-semibold text-slate-500">
        Last verified: {formatDate(provider.lastVerified)}
      </p>
      <span className="mt-4 inline-flex text-sm font-bold text-indigo-800">
        Read provider review{" "}
        <span className="ml-1" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
}

export function CategoryCard({ category }: { category: DirectoryCategory }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="rounded-xl border border-slate-300 bg-white p-5 transition hover:border-indigo-500"
    >
      <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
        Category directory
      </p>
      <h2 className="mt-3 text-xl font-black text-slate-950">
        {category.name}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {category.description}
      </p>
      <span className="mt-4 inline-flex text-sm font-bold text-indigo-800">
        Browse category{" "}
        <span className="ml-1" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
}

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="rounded-xl border border-slate-300 bg-white p-5 transition hover:border-indigo-500"
    >
      <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
        Collection
      </p>
      <h2 className="mt-3 text-xl font-black text-slate-950">
        {collection.name}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {collection.description}
      </p>
      <p className="mt-4 text-xs font-semibold text-slate-500">
        Updated: {formatDate(collection.lastUpdated)}
      </p>
    </Link>
  );
}

export function ComparisonCard({ comparison }: { comparison: Comparison }) {
  return (
    <Link
      href={`/compare/${comparison.slug}`}
      className="rounded-xl border border-slate-300 bg-white p-5 transition hover:border-indigo-500"
    >
      <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
        Comparison
      </p>
      <h2 className="mt-3 text-xl font-black text-slate-950">
        {comparison.title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {comparison.description}
      </p>
      <span className="mt-4 inline-flex text-sm font-bold text-indigo-800">
        Open comparison{" "}
        <span className="ml-1" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
}

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/${guide.slug}`}
      className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-500"
    >
      <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
        {guide.brand} · Group Buy
      </p>
      <h2 className="mt-3 text-lg font-black text-slate-950">{guide.title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{guide.why}</p>
      <span className="mt-4 inline-flex text-sm font-bold text-indigo-800">
        Read guide{" "}
        <span className="ml-1" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
}

export function FAQ({
  items,
}: { items: { question: string; answer: string }[] }) {
  return (
    <section className="mt-12">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
        FAQ
      </p>
      <h2 className="mt-3 text-2xl font-black text-slate-950">
        Frequently asked questions
      </h2>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <summary className="cursor-pointer font-bold text-slate-950">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Disclosure() {
  return (
    <p className="mt-10 border-l-4 border-amber-500 pl-4 text-sm leading-6 text-slate-600">
      We may earn a commission from some links on this page. This does not
      affect our comparisons.
    </p>
  );
}

export function RelatedPages({
  links,
}: { links: { label: string; href: string; description?: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className="rounded-xl border border-slate-200 bg-white p-5 hover:border-indigo-500"
        >
          <strong className="text-slate-950">
            {link.label} <span aria-hidden="true">→</span>
          </strong>
          {link.description && (
            <span className="mt-2 block text-sm leading-6 text-slate-600">
              {link.description}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}

export function ComparisonTable({
  rows,
  headers = [
    "Option",
    "Cost level",
    "Account type",
    "Reliability",
    "Privacy",
    "Best for",
  ],
}: { rows: string[][]; headers?: string[] }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead className="bg-indigo-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-xs font-black uppercase tracking-wide text-indigo-900"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.map((row, index) => (
            <tr key={`${row[0]}-${index}`}>
              {row.map((cell) => (
                <td key={cell} className="px-4 py-4 align-top text-slate-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TrustPage({
  title,
  description,
  children,
}: { title: string; description: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero
        eyebrow="Group Buy Tools"
        title={title}
        description={description}
      />
      <section className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-8">
        <article className="prose-content max-w-none">{children}</article>
      </section>
    </>
  );
}

export function GuidePage({ guide, tool }: { guide: Guide; tool: Tool }) {
  return (
    <>
      <PageHero
        eyebrow={`${guide.brand} · Group Buy Guide`}
        title={guide.title}
        description={guide.description}
        compact
      >
        <p className="mt-4 text-sm text-slate-500">
          Last verified: {formatDate(tool.lastVerified)}
        </p>
      </PageHero>
      <section className="mx-auto grid min-w-0 w-full max-w-7xl gap-10 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="prose-content guide-prose max-w-none">
          <h2>Quick answer</h2>
          <p>{guide.verdict}</p>
          <AffiliateCTA
            pageType="group_buy"
            pageSlug={guide.slug}
            toolName={guide.brand}
          />
          <h2>What this {guide.brand} group buy guide covers</h2>
          <p>
            This guide separates the official plan from third-party access so
            you can compare current terms, workflow fit and practical
            alternatives before paying.
          </p>
          <h2>Official pricing</h2>
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
          {tool.spyboxIncluded && (
            <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50 p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
                Current SpyBox listing
              </p>
              <p className="mt-2 text-base font-black text-slate-950">
                {tool.name} is listed in SpyBox's public tools directory.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Checked{" "}
                {formatDate(tool.spyboxLastChecked || tool.lastVerified)}. A
                public listing confirms that the tool is advertised, not a
                guaranteed access level, export right, uptime promise or
                independent account.
              </p>
              {tool.spyboxSourceUrl && (
                <a
                  href={tool.spyboxSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-sm font-bold text-indigo-800 underline"
                >
                  View SpyBox tool directory ↗
                </a>
              )}
            </div>
          )}
          <p>
            Record the provider page, plan scope and access terms you checked,
            then compare that dated note again before renewal. A lower price is
            useful only when the access model supports the work you need.
          </p>
          <h2>Why people search for “{guide.brand} group buy”</h2>
          <p>{guide.why}</p>
          <h2>How group buy access usually works</h2>
          <p>
            A third-party provider may give several users access to a shared or
            managed account, or bundle multiple software products. The exact
            account model, session rules, support and provider terms vary. Ask
            for those details before paying.
          </p>
          <h2>Potential risks and limitations</h2>
          <ul>
            <li>Shared access can create session limits or conflicts.</li>
            <li>Usage caps may differ from an official plan.</li>
            <li>Privacy expectations may be weaker on shared accounts.</li>
            <li>
              Accounts can be interrupted, restricted or changed by a provider.
            </li>
            <li>Provider terms may not match official product terms.</li>
          </ul>
          <h2>Official vs group buy vs alternatives</h2>
          <ComparisonTable
            rows={[
              [
                "Official subscription",
                tool.pricing.summary || formatPricingLabel(tool),
                "Owned account",
                "Clearest expectations",
                "Direct provider terms",
                "Frequent or sensitive work",
              ],
              [
                "Third-party group buy",
                "May be lower",
                "Shared or managed",
                "Varies",
                "Needs careful review",
                "Testing a workflow",
              ],
              [
                "Alternative tool",
                "Varies",
                "Usually owned",
                "Depends on provider",
                "Provider terms",
                "Different feature or budget fit",
              ],
            ]}
          />
          <h2>Cheaper alternatives</h2>
          <p>{guide.alternative}</p>
          <h2>Who should choose which option?</h2>
          <p>
            Choose an official subscription when you need dependable ownership,
            support or privacy. Consider an alternative when the workflow
            matters more than the brand. Treat third-party access as a separate
            risk and reliability decision.
          </p>
          <h2>Verdict</h2>
          <p>
            {guide.verdict} There is no universal safe or guaranteed option;
            verify current details yourself.
          </p>
          <FAQ items={guide.faq} />
          <Disclosure />
        </article>
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-black">Continue comparing</h2>
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
              guide.brand === "Minea" ? "/minea-alternative" : "/alternatives"
            }
            className="mt-4 block text-sm font-bold text-indigo-800"
          >
            Compare Alternatives →
          </Link>
          <Link
            href="/deals"
            className="mt-4 block text-sm font-bold text-indigo-800"
          >
            All Group Buy Guides →
          </Link>
        </aside>
      </section>
    </>
  );
}
