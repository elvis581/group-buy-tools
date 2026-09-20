import {
  Breadcrumbs,
  CategoryMark,
  CollectionCard,
  NewsletterBlock,
  StaticPageHeader,
  ToolGrid,
} from "@/components/student-site";
import { firstBatchPageCount } from "@/config/release";
import {
  categories as allCategories,
  tools as allTools,
  publishedTools,
} from "@/data/student-tools";
import type {
  StudentTool,
  collections as allCollections,
  publishedCollections,
} from "@/data/student-tools";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export function CategoryDirectoryPage({
  categories,
}: { categories: readonly (typeof allCategories)[number][] }) {
  return (
    <>
      <StaticPageHeader
        eyebrow="Browse by topic"
        title="Categories built around student work."
        description="Start with a category when you know the job you need to do, not the brand you want to use. These student tools are grouped around practical work."
      />
      <div className="content-shell py-12">
        <p className="mb-8 max-w-3xl text-sm leading-7 text-muted-foreground">
          Browse student tools by subject and compare the source, access path
          and limits before choosing a student tool.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group rounded-lg border border-slate-300 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md hover:shadow-slate-900/5"
            >
              <div className="mb-5 flex items-center justify-between">
                <CategoryMark category={category.slug} />
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-orange-600" />
              </div>
              <p className="eyebrow">
                {
                  publishedTools.filter(
                    (tool) => tool.category === category.slug,
                  ).length
                }{" "}
                {publishedTools.filter(
                  (tool) => tool.category === category.slug,
                ).length === 1
                  ? "tool"
                  : "tools"}
              </p>
              <h2 className="mt-2 text-2xl font-black">{category.name}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                {category.description}
              </p>
              <span className="mt-5 inline-flex items-center text-sm font-bold text-orange-700">
                Browse student tools <ArrowRight className="ml-1 size-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export function CategoryPage({
  category,
  items,
}: { category: (typeof allCategories)[number]; items: StudentTool[] }) {
  const related = allCategories
    .filter((item) => item.slug !== category.slug)
    .slice(0, 2);
  return (
    <>
      <StaticPageHeader
        eyebrow="Category"
        title={category.primaryKeyword}
        description={category.description}
      />
      <div className="content-shell py-12">
        <Breadcrumbs
          items={[
            { label: "Categories", href: "/categories" },
            { label: category.name },
          ]}
        />
        <p className="mt-8 max-w-3xl text-sm leading-7 text-muted-foreground">
          Compare the tools below by access requirements and limits. Each guide
          includes an official source and alternatives to help you choose an
          option for your assignment.
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_270px] lg:items-start">
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
              <p className="text-sm text-muted-foreground">
                {items.length} {items.length === 1 ? "tool" : "tools"} in this
                category
              </p>
              <Link href="/tools" className="text-sm font-bold text-orange-700">
                All tools <ArrowRight className="ml-1 inline size-4" />
              </Link>
            </div>
            <ToolGrid items={items} placement={`category-${category.slug}`} />
          </div>
          <aside className="rounded-lg border border-slate-300 bg-white p-5">
            <h2 className="font-black">Related categories</h2>
            <ul className="mt-4 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/categories/${item.slug}`}
                    className="text-sm font-bold text-orange-700 hover:text-orange-800"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <div className="mt-16">
          <NewsletterBlock />
        </div>
      </div>
    </>
  );
}

export function CollectionDirectoryPage({
  collections,
}: { collections: typeof publishedCollections }) {
  return (
    <>
      <StaticPageHeader
        eyebrow="Curated paths"
        title="Collections for common student decisions."
        description="These tool collections compare a smaller set of tools around one question, with selection criteria and visible limits."
      />
      <div className="content-shell py-12">
        <p className="mb-8 max-w-3xl text-sm leading-7 text-muted-foreground">
          Open a collection when you want fewer choices and clearer criteria.
          These collections explain why each tool appears and where to confirm
          the current offer.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {collections.map((item) => (
            <CollectionCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export function CollectionPage({
  item,
  tools: items,
}: { item: (typeof allCollections)[number]; tools: StudentTool[] }) {
  const latestVerifiedAt = items.reduce(
    (latest, tool) =>
      tool.lastVerifiedAt > latest ? tool.lastVerifiedAt : latest,
    "",
  );
  const criteria = item.slug.includes("without-credit")
    ? [
        "Basic access does not require a card according to the current listing.",
        "The free path is visible before any paid upgrade.",
        `The ${item.primaryKeyword} provider terms remain the final authority.`,
      ]
    : item.slug.includes("student-email")
      ? [
          "Student or education verification is part of access.",
          "The offer has a clear student use case.",
          `The ${item.primaryKeyword} partner or license terms are shown conservatively.`,
        ]
      : [
          `Useful for a real ${item.primaryKeyword} workflow.`,
          "A free plan, free credits or open-source path is available.",
          "Current limits are described without invented quotas.",
        ];
  return (
    <>
      <div className="content-shell py-10 sm:py-14">
        <Breadcrumbs
          items={[
            { label: "Collections", href: "/collections" },
            { label: item.name },
          ]}
        />
        <div className="mt-8 max-w-4xl">
          <p className="eyebrow">Collection</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            {item.name}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {item.description} This is an editorial shortlist, not a ranking or
            endorsement.
          </p>
        </div>
        <section className="mt-10 rounded-lg border border-slate-300 bg-white p-6">
          <h2 className="text-xl font-black">How we selected these tools</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground md:grid-cols-3">
            {criteria.map((criterion) => (
              <li key={criterion} className="flex gap-2">
                <Check className="mt-1 size-4 shrink-0 text-orange-600" />
                {criterion}
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between border-b border-border pb-4">
            <div>
              <p className="eyebrow">At a glance</p>
              <h2 className="mt-2 text-2xl font-black">
                Compare {item.primaryKeyword} options
              </h2>
            </div>
            <span className="text-sm text-muted-foreground">
              Updated {latestVerifiedAt || "not yet reviewed"}
            </span>
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-300 bg-white">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 font-black">Tool</th>
                  <th className="px-4 py-3 font-black">Offer</th>
                  <th className="px-4 py-3 font-black">Free limit</th>
                  <th className="px-4 py-3 font-black">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((tool) => (
                  <tr key={tool.slug}>
                    <td className="px-4 py-4">
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="font-bold text-orange-700"
                      >
                        {tool.name}
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      {tool.offerType.replaceAll("-", " ")}
                    </td>
                    <td className="max-w-xs px-4 py-4 text-muted-foreground">
                      {tool.freeLimit}
                    </td>
                    <td className="px-4 py-4">
                      {tool.studentVerificationRequired}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="mt-12">
          <ToolGrid items={items} placement={`collection-${item.slug}`} />
        </section>
        <section className="prose-student mt-12 max-w-3xl">
          <h2>Before you choose</h2>
          <p>
            Open each tool detail page for limitations, official sources,
            alternatives and the date of the last source review.
          </p>
          <h2>Frequently asked questions</h2>
          <h3>Are these tools guaranteed to stay free?</h3>
          <p>
            No. Providers can change plans, limits and eligibility. The official
            sources on each tool's detail page are the final reference.
          </p>
          <h3>
            Does being listed mean FreeForStudent recommends a paid upgrade?
          </h3>
          <p>
            No. We show a free path first and only mention paid options when
            they are relevant to the workflow.
          </p>
        </section>
        <div className="mt-14">
          <NewsletterBlock />
        </div>
      </div>
    </>
  );
}

export function TrustPage({
  kind,
}: {
  kind: "verify" | "advertise" | "submit";
}) {
  const content = {
    verify: {
      eyebrow: "Trust",
      title: "How we verify free plans and student offers.",
      description:
        "We make the useful limits visible and keep unknown facts marked instead of filling gaps with guesses.",
    },
    advertise: {
      eyebrow: "Partnerships",
      title: "Work with FreeForStudent",
      description:
        "We can discuss clearly labeled partnerships that preserve the directory's editorial independence. We do not publish traffic or audience claims we cannot prove.",
    },
    submit: {
      eyebrow: "Directory input",
      title: "Suggest a tool",
      description: `Tell us about a free plan, open-source project or student offer that belongs in this directory. The catalog contains ${allTools.length} tool records, while publication is staged across a first batch of ${firstBatchPageCount} indexable pages.`,
    },
  }[kind];
  return (
    <>
      <StaticPageHeader {...content} />
      <div className="content-shell py-12">
        <div className="prose-student max-w-3xl">
          {kind === "verify" && (
            <>
              <h2>Our review checklist</h2>
              <ul>
                <li>
                  Open the provider's official product, pricing, education or
                  help page.
                </li>
                <li>
                  Record the free path, relevant limits and whether verification
                  is required.
                </li>
                <li>
                  Separate a standard free plan from a student-only benefit.
                </li>
                <li>Mark unclear or changing facts as “Not clearly stated”.</li>
                <li>Keep the source URL and review date on the tool page.</li>
              </ul>
              <h2>What we do not claim</h2>
              <p>
                We do not claim private testing, guaranteed savings, official
                partnerships or a fixed quota when the provider does not publish
                one clearly.
              </p>
              <h2>What FreeForStudent does</h2>
              <p>
                FreeForStudent is a source-led directory for students comparing
                free plans, free credits, open-source software and student-only
                access. The catalog contains {allTools.length} tool records. The
                first batch publishes {firstBatchPageCount} indexable pages: the
                homepage, tools directory, four category pages, three
                collections and {publishedTools.length} product detail pages.
              </p>
              <h2>Editorial standard</h2>
              <p>
                Listings are selected for a clear access path, useful limits, a
                relevant student workflow and a current official source. Free
                access is shown before any paid path. Commercial relationships
                cannot change a tool's status, limitation notes or inclusion
                criteria. Report an outdated listing through the contact address
                shown on the site so material changes can be recorded.
              </p>
            </>
          )}
          {kind === "advertise" && (
            <>
              <h2>Suitable partnerships</h2>
              <p>
                We consider clearly labeled sponsorships, verified product
                updates and relevant student resources. We do not sell fake
                reviews, hidden placements or unsupported audience numbers.
              </p>
              <h2>Contact</h2>
              <p>
                Send a short proposal to{" "}
                <a
                  className="font-bold text-orange-700"
                  href="mailto:hello@freeforstudent.com"
                >
                  hello@freeforstudent.com
                </a>
                . A reply is not a promise of inclusion.
              </p>
            </>
          )}
          {kind === "submit" && (
            <>
              <h2>What to include</h2>
              <ul>
                <li>The official product or education URL.</li>
                <li>The free plan or student eligibility details.</li>
                <li>
                  Any important limits, verification steps or country
                  restrictions.
                </li>
                <li>Why it helps students complete a real task.</li>
              </ul>
              <p>
                We are not accepting automated submissions or promising a
                listing. Send suggestions to{" "}
                <a
                  className="font-bold text-orange-700"
                  href="mailto:hello@freeforstudent.com"
                >
                  hello@freeforstudent.com
                </a>
                .
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export function LegalPage({ kind }: { kind: "privacy" | "terms" | "cookies" }) {
  const title =
    kind === "privacy"
      ? "Privacy policy"
      : kind === "terms"
        ? "Terms of use"
        : "Cookie policy";
  return (
    <>
      <StaticPageHeader
        eyebrow="Legal"
        title={title}
        description="A concise first-phase policy page for the FreeForStudent directory."
      />
      <div className="content-shell py-12">
        <div className="prose-student max-w-3xl">
          <p>Last updated: August 31, 2026</p>
          <h2>Scope</h2>
          <p>
            FreeForStudent is an informational directory. Provider pages linked
            from this site have their own terms, privacy policies and account
            requirements.
          </p>
          {kind === "privacy" && (
            <>
              <h2>Information we receive</h2>
              <p>
                At launch, pages can be browsed without an account. If the
                newsletter is configured, an email address is used only for the
                newsletter provider and subscription purpose described at
                sign-up.
              </p>
              <h2>Analytics</h2>
              <p>
                No third-party analytics script is loaded by default. A future
                analytics provider must be configured explicitly and disclosed
                here.
              </p>
            </>
          )}
          {kind === "cookies" && (
            <>
              <h2>Cookies</h2>
              <p>
                The first-phase site does not require advertising cookies.
                Provider sites may set their own cookies after you leave through
                an official link.
              </p>
            </>
          )}
          {kind === "terms" && (
            <>
              <h2>Using the directory</h2>
              <p>
                Offer details can change. Check the official source before
                creating an account, submitting payment or relying on an
                eligibility claim.
              </p>
              <h2>No guarantee</h2>
              <p>
                Listings are provided for informational purposes and are not a
                guarantee of availability, price, eligibility or fitness for a
                particular assignment.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
