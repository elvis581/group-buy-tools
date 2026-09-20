"use client";

import { siteConfig } from "@/config/site";
import {
  categories,
  formatOfferType,
  getCategory,
  getCtaLabel,
  getPublishedTool,
  publishedCollections,
  publishedTools,
} from "@/data/student-tools";
import type {
  StudentTool,
  collections as allCollections,
} from "@/data/student-tools";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  CreditCard,
  ExternalLink,
  Globe2,
  GraduationCap,
  Layers,
  type LucideIcon,
  Menu,
  Palette,
  Pencil,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useMemo, useState } from "react";

export const analyticsEvents = [
  "tool_view",
  "search",
  "filter_used",
  "free_cta_click",
  "affiliate_click",
  "paid_upgrade_click",
  "alternative_click",
  "newsletter_signup",
  "report_outdated",
  "submit_tool_click",
] as const;

const searchStopWords = new Set([
  "a",
  "an",
  "and",
  "for",
  "in",
  "of",
  "on",
  "the",
  "to",
  "with",
]);

export function trackEvent(name: string, payload: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("freeforstudent:analytics", {
      detail: { name, ...payload },
    }),
  );
  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dataLayer)) dataLayer.push({ event: name, ...payload });
}

export function TrackedLink({
  tool,
  href,
  children,
  className,
  placement = "tool-card",
}: {
  tool: StudentTool;
  href: string;
  children: React.ReactNode;
  className?: string;
  placement?: string;
}) {
  return (
    <Link
      className={className}
      href={href}
      onClick={() =>
        trackEvent(tool.affiliateUrl ? "affiliate_click" : "free_cta_click", {
          tool: tool.slug,
          placement,
        })
      }
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const nav = [
    ["Featured", "/#featured"],
    ["100% Free", "/tools?offer=completely-free"],
    ["AI Tools", "/categories/ai-and-study"],
    ["Student Discounts", "/student-deals"],
  ];
  const categoryLinks = [
    ["All categories", "/categories"],
    ...categories.map((category) => [
      category.name,
      `/categories/${category.slug}`,
    ]),
    ["Collections", "/collections"],
    ["Open source", "/open-source"],
  ];
  function isActive(href: string) {
    const basePath = href.split("?")[0];
    return basePath === "/#featured"
      ? pathname === "/"
      : pathname.startsWith(basePath);
  }
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src={siteConfig.logoMark ?? siteConfig.logo}
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-lg object-contain"
          />
          <span className="font-bricolage text-lg font-black tracking-tight">
            FreeForStudent
          </span>
        </Link>
        <nav
          className="hidden items-center gap-0.5 xl:flex"
          aria-label="Main navigation"
        >
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setCategoriesOpen(false)}
              className={`rounded-md px-2.5 py-2 text-sm font-semibold transition-colors hover:bg-indigo-50 ${isActive(href) ? "text-indigo-700" : "text-slate-600"}`}
            >
              {label}
            </Link>
          ))}
          <div className="relative">
            <button
              type="button"
              aria-expanded={categoriesOpen}
              aria-haspopup="menu"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              onKeyDown={(event) => {
                if (event.key === "Escape") setCategoriesOpen(false);
              }}
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-sm font-semibold transition-colors hover:bg-indigo-50 ${pathname.startsWith("/categories") || pathname.startsWith("/collections") || pathname.startsWith("/open-source") ? "text-indigo-700" : "text-slate-600"}`}
            >
              Categories <ChevronDown className="size-3.5" />
            </button>
            {categoriesOpen && (
              <div
                className="absolute left-0 top-full z-50 mt-2 w-56 rounded-lg border border-border bg-white p-2 shadow-xl shadow-slate-900/10"
                role="menu"
              >
                {categoryLinks.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    role="menuitem"
                    onClick={() => setCategoriesOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <span
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600"
            title="Current market: United States"
          >
            <Globe2 className="size-4 text-indigo-500" aria-hidden="true" />
            US
          </span>
          <Link
            href="/tools"
            aria-label="Search tools"
            className="grid size-9 place-items-center rounded-md text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700"
          >
            <Search className="size-5" aria-hidden="true" />
          </Link>
        </div>
        <div className="flex items-center gap-2 xl:hidden">
          <Link
            href="/tools"
            aria-label="Search tools"
            className="grid size-10 place-items-center rounded-md text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <Search className="size-5" aria-hidden="true" />
          </Link>
          <button
            className="grid size-10 place-items-center rounded-md border border-border"
            type="button"
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="border-t border-border bg-white px-5 py-4 xl:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 font-semibold hover:bg-muted"
              >
                {label}
              </Link>
            ))}
            <div className="mt-3 border-t border-border pt-3">
              <p className="px-3 py-2 text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">
                Categories
              </p>
              {categoryLinks.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 font-semibold text-slate-700 hover:bg-indigo-50"
                >
                  {label}
                </Link>
              ))}
            </div>
            <Link
              href="/submit-a-tool"
              onClick={() => {
                setOpen(false);
                trackEvent("submit_tool_click");
              }}
              className="mt-2 rounded-md bg-slate-900 px-3 py-3 text-center font-bold text-white"
            >
              Suggest a tool
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-white">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={siteConfig.logoMark ?? siteConfig.logo}
              alt=""
              aria-hidden="true"
              width={36}
              height={36}
              className="size-9 shrink-0 rounded-lg object-contain"
            />
            <span className="font-bricolage font-black">FreeForStudent</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Free plans, credits, open-source software and student offers with
            clear limits and official sources.
          </p>
          <p className="mt-5 text-xs text-muted-foreground">
            Offers can change. Check the official source before relying on a
            current limit.
          </p>
        </div>
        <FooterColumn
          title="Explore"
          links={[
            ["All tools & student offers", "/tools"],
            ["AI & Study", "/categories/ai-and-study"],
            ["Writing & Research", "/categories/writing-and-research"],
            ["Open source", "/open-source"],
            ["Recently updated", "/recently-updated"],
          ]}
        />
        <FooterColumn
          title="Collections"
          links={publishedCollections.map((item) => [
            item.name,
            `/collections/${item.slug}`,
          ])}
        />
        <FooterColumn
          title="Trust"
          links={[
            ["How we verify", "/how-we-verify"],
            ["Privacy", "/privacy"],
            ["Cookies", "/cookies"],
            ["Terms", "/terms"],
          ]}
        />
      </div>
      <div className="border-t border-border py-5">
        <div className="shell flex flex-col justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} FreeForStudent</span>
          <Link href="/advertise" className="hover:text-orange-700">
            Partnerships and advertising
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h2 className="text-sm font-black">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-muted-foreground hover:text-orange-700"
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
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
    >
      <Link href="/" className="hover:text-orange-700">
        Home
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <span>/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-orange-700">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

function ToolLogo({ tool }: { tool: StudentTool }) {
  const [failed, setFailed] = useState(false);
  const hostname = new URL(tool.officialUrl).hostname.replace(/^www\./, "");

  if (failed) {
    return (
      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-slate-900 text-lg font-black text-white">
        {tool.name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=128`}
      alt=""
      aria-hidden="true"
      width={44}
      height={44}
      loading="lazy"
      onError={() => setFailed(true)}
      className="size-11 shrink-0 rounded-lg border border-border bg-white p-2 object-contain"
    />
  );
}

const categoryVisuals: Record<
  string,
  { icon: LucideIcon; surface: string; foreground: string }
> = {
  "ai-and-study": {
    icon: Sparkles,
    surface: "border-violet-200 bg-violet-50",
    foreground: "text-violet-700",
  },
  "writing-and-research": {
    icon: Pencil,
    surface: "border-sky-200 bg-sky-50",
    foreground: "text-sky-700",
  },
  "design-and-creative": {
    icon: Palette,
    surface: "border-rose-200 bg-rose-50",
    foreground: "text-rose-700",
  },
  "coding-and-developer": {
    icon: Code2,
    surface: "border-emerald-200 bg-emerald-50",
    foreground: "text-emerald-700",
  },
};

export function CategoryMark({
  category,
  size = "md",
}: {
  category: string;
  size?: "sm" | "md";
}) {
  const visual = categoryVisuals[category] ?? {
    icon: BookOpen,
    surface: "border-border bg-muted",
    foreground: "text-slate-700",
  };
  const Icon = visual.icon;
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-lg border ${visual.surface} ${visual.foreground} ${size === "sm" ? "size-8" : "size-10"}`}
      aria-hidden="true"
    >
      <Icon className={size === "sm" ? "size-4" : "size-5"} />
    </span>
  );
}

export function ToolCard({
  tool,
  placement = "tool-card",
  internalOnly = false,
  compact = true,
}: {
  tool: StudentTool;
  placement?: string;
  internalOnly?: boolean;
  compact?: boolean;
}) {
  const category = getCategory(tool.category);
  const cardClassName =
    "group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-300 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:p-5";
  const cardContent = (
    <>
      <span
        className="absolute inset-x-0 top-0 h-0.5 bg-indigo-500 opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-4">
        <ToolLogo tool={tool} />
        <span className="tag">{formatOfferType(tool.offerType)}</span>
      </div>
      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {category?.name}
        </p>
        <h3 className="mt-1 text-xl font-black tracking-tight">
          {compact ? (
            tool.name
          ) : (
            <Link
              href={`/tools/${tool.slug}`}
              className="hover:text-indigo-700"
            >
              {tool.name}
            </Link>
          )}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          <span className="line-clamp-2 min-h-[3rem]">
            {tool.shortDescription}
          </span>
        </p>
      </div>
      {compact && (
        <div className="mt-auto flex items-center justify-between pt-5 text-xs font-bold text-indigo-700">
          <span>View details</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </div>
      )}
      {!compact && (
        <>
          <div className="mt-5 space-y-2 border-y border-border py-4 text-sm">
            <div className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-indigo-600" />
              <span>{tool.freePlanSummary}</span>
            </div>
            <div className="flex gap-2 text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0" />
              <span>
                {tool.studentVerificationRequired === "Yes"
                  ? "Student verification required"
                  : tool.studentVerificationRequired === "No"
                    ? "No student verification"
                    : tool.studentVerificationRequired}
              </span>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <span className="text-xs text-muted-foreground">
              Checked {tool.lastVerifiedAt}
            </span>
            {internalOnly ? (
              <Link
                href={`/tools/${tool.slug}`}
                className="inline-flex min-h-10 items-center gap-1 rounded-md bg-indigo-600 px-3 text-sm font-bold text-white hover:bg-indigo-700"
              >
                View details <ArrowRight className="size-3.5" />
              </Link>
            ) : (
              <TrackedLink
                tool={tool}
                href={`/go/${tool.slug}?source=${encodeURIComponent(placement)}`}
                placement={placement}
                className="inline-flex min-h-10 items-center gap-1 rounded-md bg-indigo-600 px-3 text-sm font-bold text-white hover:bg-indigo-700"
              >
                {getCtaLabel(tool)} <ExternalLink className="size-3.5" />
              </TrackedLink>
            )}
          </div>
        </>
      )}
    </>
  );

  return compact ? (
    <Link href={`/tools/${tool.slug}`} className={cardClassName}>
      {cardContent}
    </Link>
  ) : (
    <article className={cardClassName}>{cardContent}</article>
  );
}

export function ToolGrid({
  items,
  placement = "tool-grid",
  internalOnly = false,
  compact = true,
  columns = "default",
}: {
  items: StudentTool[];
  placement?: string;
  internalOnly?: boolean;
  compact?: boolean;
  columns?: "default" | "four";
}) {
  return (
    <div
      className={
        columns === "four"
          ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      }
    >
      {items.map((tool) => (
        <ToolCard
          key={tool.slug}
          tool={tool}
          placement={placement}
          internalOnly={internalOnly}
          compact={compact}
        />
      ))}
    </div>
  );
}

export function SearchBox({
  action = "/tools",
  initialValue = "",
}: { action?: string; initialValue?: string }) {
  const searchExamples = publishedTools
    .slice(0, 4)
    .map((tool) => tool.name)
    .join(", ");

  function submit(event: FormEvent<HTMLFormElement>) {
    const form = new FormData(event.currentTarget);
    const query = String(form.get("q") || "").trim();
    if (query) trackEvent("search", { query });
  }
  return (
    <form
      action={action}
      method="get"
      onSubmit={submit}
      className="flex w-full max-w-2xl items-center gap-2 rounded-lg border border-border bg-white p-2 shadow-sm ring-1 ring-white transition-shadow focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100"
    >
      <Search className="ml-3 size-5 text-muted-foreground" />
      <input
        name="q"
        defaultValue={initialValue}
        className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base outline-none placeholder:text-muted-foreground"
        placeholder={`Search ${searchExamples}...`}
        aria-label="Search tools"
      />
      <button className="button button-accent shrink-0" type="submit">
        Search
      </button>
    </form>
  );
}

export function ToolDirectory() {
  const params = useSearchParams();
  const query = params.get("q") || "";
  const category = params.get("category") || "";
  const offer = params.get("offer") || "";
  const card = params.get("card") || "";
  const verification = params.get("verification") || "";
  const platform = params.get("platform") || "";
  const filtered = useMemo(
    () =>
      publishedTools.filter((tool) => {
        const toolCategory = getCategory(tool.category);
        const haystack = [
          tool.name,
          tool.shortDescription,
          tool.tagline,
          tool.fullDescription,
          tool.accessGuide.pageTitle,
          tool.accessGuide.eligibility,
          tool.freePlanSummary,
          tool.freeLimit,
          tool.studentUseCases.join(" "),
          tool.claimSteps.join(" "),
          tool.freePlanLimitations.join(" "),
          tool.pros.join(" "),
          tool.cons.join(" "),
          tool.badges.join(" "),
          toolCategory?.name,
          toolCategory?.description,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        const normalizedQuery = query.trim().toLowerCase();
        const queryTerms = normalizedQuery
          .split(/\s+/)
          .filter((term) => term.length > 1 && !searchStopWords.has(term));
        const matchesTerm = (term: string) =>
          haystack.includes(term) ||
          (term.length >= 4 && haystack.includes(term.slice(0, -1)));
        const matchesQuery =
          !normalizedQuery ||
          haystack.includes(normalizedQuery) ||
          (queryTerms.length > 0 && queryTerms.every(matchesTerm));
        return (
          matchesQuery &&
          (!category || tool.category === category) &&
          (!offer ||
            tool.offerType === offer ||
            (offer === "completely-free" &&
              tool.offerType === "open-source")) &&
          (!card || tool.creditCardRequired.toLowerCase().startsWith(card)) &&
          (!verification ||
            tool.studentVerificationRequired
              .toLowerCase()
              .startsWith(verification)) &&
          (!platform ||
            tool.platforms.some((item) => {
              const aliases: Record<string, string[]> = {
                desktop: ["desktop", "windows", "macos", "linux"],
                mobile: ["mobile", "ios", "android"],
                browser: ["browser", "web"],
              };
              return (
                aliases[platform.toLowerCase()] ?? [platform.toLowerCase()]
              ).includes(item.toLowerCase());
            }))
        );
      }),
    [query, category, offer, card, verification, platform],
  );
  const activeCount = [
    query,
    category,
    offer,
    card,
    verification,
    platform,
  ].filter(Boolean).length;
  return (
    <div>
      <div className="flex flex-col gap-4">
        <SearchBox initialValue={query} />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <SelectFilter
            label="Category"
            name="category"
            value={category}
            options={categories.map((item) => [item.name, item.slug])}
          />
          <SelectFilter
            label="Offer type"
            name="offer"
            value={offer}
            options={[
              ["100% Free", "completely-free"],
              ["Free Plan", "free-plan"],
              ["Free Credits", "free-credits"],
              ["Open Source", "open-source"],
              ["Student Only", "student-only"],
              ["Education Offer", "education-discount"],
            ]}
          />
          <SelectFilter
            label="Platform"
            name="platform"
            value={platform}
            options={[
              ["Browser", "Browser"],
              ["Desktop app", "Desktop"],
              ["Mobile app", "Mobile"],
            ]}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <QuickFilter
            label="No credit card"
            name="card"
            value="no"
            current={card}
          />
          <QuickFilter
            label="Student verification"
            name="verification"
            value="yes"
            current={verification}
          />
          {activeCount > 0 && (
            <Link
              href="/tools"
              className="tag border-orange-300 text-orange-700"
            >
              Clear filters <X className="ml-1 size-3" />
            </Link>
          )}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between border-b border-border pb-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">{filtered.length}</strong> of{" "}
          {publishedTools.length} published tools
        </p>
        <span className="text-sm text-muted-foreground">
          All entries use official source links
        </span>
      </div>
      <div className="mt-6">
        {filtered.length ? (
          <ToolGrid items={filtered} placement="tools-directory" />
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-black">No matching tools</h2>
            <p className="mt-2 text-muted-foreground">
              Try a broader search or clear a filter.
            </p>
            <Link href="/tools" className="button button-muted mt-6">
              Show all tools
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function SelectFilter({
  label,
  name,
  value,
  options,
}: { label: string; name: string; value: string; options: string[][] }) {
  const params = useSearchParams();
  function href(nextValue: string) {
    const next = new URLSearchParams(params.toString());
    nextValue ? next.set(name, nextValue) : next.delete(name);
    return `/tools?${next.toString()}`;
  }
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => {
          window.location.href = href(event.target.value);
        }}
        className="h-11 w-full appearance-none rounded-md border border-border bg-white px-3 pr-9 text-sm font-semibold text-slate-700 outline-none focus:border-orange-500"
      >
        <option value="">{label}: all</option>
        {options.map(([optionLabel, optionValue]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-muted-foreground" />
    </label>
  );
}

function QuickFilter({
  label,
  name,
  value,
  current,
}: { label: string; name: string; value: string; current: string }) {
  const params = useSearchParams();
  const next = new URLSearchParams(params.toString());
  if (current) next.delete(name);
  else next.set(name, value);
  return (
    <Link
      href={`/tools?${next.toString()}`}
      onClick={() => trackEvent("filter_used", { filter: name })}
      className={`tag transition-colors ${current ? "border-orange-400 bg-orange-50 text-orange-700" : "hover:border-orange-300"}`}
    >
      {current && <Check className="mr-1 size-3" />}
      {label}
    </Link>
  );
}

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      setMessage(result.message);
      if (response.ok) {
        setEmail("");
        trackEvent("newsletter_signup");
      }
    } catch {
      setMessage("Newsletter service is not available right now.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        className="min-h-11 flex-1 rounded-md border border-border bg-white px-4 outline-none focus:border-orange-500"
      />
      <button disabled={busy} className="button button-accent" type="submit">
        {busy ? "Joining..." : "Join the newsletter"}
      </button>
      {message && (
        <p className="text-sm text-muted-foreground sm:basis-full">{message}</p>
      )}
    </form>
  );
}

export function NewsletterBlock() {
  return (
    <section className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-6 py-10 text-foreground sm:px-10">
      <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div>
          <p className="eyebrow">Weekly, useful updates</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            New free tools, credit changes and student deals.
          </h2>
        </div>
        <div>
          <p className="mb-4 text-sm leading-6 text-slate-300">
            Get updates on useful tools, free limits and student offers.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}

function FeaturedToolCard({ tool }: { tool: StudentTool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-300 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:p-5"
    >
      <span
        className="absolute inset-x-0 top-0 h-0.5 bg-indigo-500 transition-colors group-hover:bg-indigo-700"
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-3">
        <ToolLogo tool={tool} />
        <span className="tag border-indigo-100 bg-indigo-50 text-indigo-700">
          {formatOfferType(tool.offerType)}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-black tracking-tight">{tool.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
        {tool.tagline}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-3 text-sm font-bold text-indigo-700">
        <span>View details</span>
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export function HomePage() {
  const featured = publishedTools.slice(0, 5);
  const goalPaths = [
    {
      label: "Write an essay",
      slugs: ["grammarly", "quillbot", "overleaf"],
      href: "/categories/writing-and-research",
    },
    {
      label: "Research a topic",
      slugs: ["zotero"],
      href: "/tools/zotero",
    },
    {
      label: "Understand a concept",
      slugs: ["chatgpt", "google-gemini", "claude"],
      href: "/categories/ai-and-study",
    },
    {
      label: "Learn coding",
      slugs: ["visual-studio-code", "replit"],
      href: "/categories/coding-and-developer",
    },
    {
      label: "Design a project",
      slugs: ["figma", "blender", "photopea"],
      href: "/categories/design-and-creative",
    },
    {
      label: "Organize references",
      slugs: ["zotero"],
      href: "/tools/zotero",
    },
  ] as const;

  return (
    <div>
      <div className="content-shell py-3">
        <Link
          href="/recently-updated"
          className="flex min-h-9 items-center justify-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50/60 px-4 text-xs font-bold text-indigo-900 transition-colors hover:border-indigo-200 hover:bg-indigo-50"
        >
          <Sparkles className="size-3.5 text-indigo-500" aria-hidden="true" />
          New: verified student access paths for 2026
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
      <section className="border-b border-border bg-background">
        <div className="content-shell py-10 text-center sm:py-12">
          <p className="eyebrow inline-flex items-center gap-2">
            <Sparkles className="size-3.5" aria-hidden="true" />A cleaner
            student deals directory
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Student deals worth claiming.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Discover what is free for students: tools, software and student
            offers with clear limits and links to official sources.
          </p>
          <div className="mx-auto mt-7 max-w-2xl">
            <SearchBox />
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link
              href="#featured"
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-indigo-600 px-4 text-sm font-bold text-white shadow-sm shadow-indigo-600/20 hover:bg-indigo-700"
            >
              <Sparkles className="size-4" aria-hidden="true" /> Trending
            </Link>
            <Link
              href="/tools?offer=completely-free"
              className="tag px-4 py-2 hover:border-indigo-300 hover:text-indigo-700"
            >
              <Check className="size-4 text-emerald-600" aria-hidden="true" />
              100% Free
            </Link>
            <Link
              href="/categories/ai-and-study"
              className="tag px-4 py-2 hover:border-indigo-300 hover:text-indigo-700"
            >
              <Sparkles className="size-4 text-indigo-500" aria-hidden="true" />
              AI Tools
            </Link>
            <Link
              href="/tools"
              className="tag px-4 py-2 hover:border-indigo-300 hover:text-indigo-700"
            >
              <Layers className="size-4 text-slate-500" aria-hidden="true" />
              Software
            </Link>
            <Link
              href="/student-deals"
              className="tag px-4 py-2 hover:border-indigo-300 hover:text-indigo-700"
            >
              <GraduationCap
                className="size-4 text-orange-500"
                aria-hidden="true"
              />
              Student discounts
            </Link>
          </div>
        </div>
      </section>
      <div className="content-shell space-y-20 py-12 sm:py-16">
        <section id="featured" className="scroll-mt-24">
          <SectionHeading
            eyebrow="Featured deals"
            title="Worth a closer look"
            href="/tools"
            link="See all tools"
            icon={Sparkles}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {featured.map((tool) => (
              <FeaturedToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
        <section id="browse-deals" className="scroll-mt-24">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
            <div>
              <p className="eyebrow">Browse student deals</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Find a free path for the work ahead
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <Link
                href="/tools?offer=completely-free"
                className="inline-flex min-h-9 items-center gap-2 rounded-full border border-border bg-white px-3 text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-700"
              >
                100% free only
                <span className="grid h-5 w-8 place-items-center rounded-full bg-slate-200 p-0.5">
                  <span className="mr-auto size-4 rounded-full bg-white shadow-sm" />
                </span>
              </Link>
              <Link
                href="/recently-updated"
                className="inline-flex min-h-9 items-center gap-1 rounded-full border border-border bg-white px-3 text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-700"
              >
                Sort: Latest checks <ChevronDown className="size-3.5" />
              </Link>
            </div>
          </div>
          <p className="mb-6 max-w-3xl text-sm leading-7 text-muted-foreground">
            Compare free plans, student offers and open-source tools by access
            path and limits. Open a card to check eligibility and the official
            offer before signing up.
          </p>
          <ToolGrid
            items={publishedTools}
            placement="homepage-browse-deals"
            internalOnly
            compact
            columns="four"
          />
        </section>
        <section>
          <SectionHeading
            eyebrow="By goal"
            title="Find a tool for your next assignment"
            icon={BookOpen}
          />
          <p className="mb-7 max-w-3xl text-sm leading-7 text-muted-foreground">
            Start with the task you need to finish, from researching a topic to
            building your first app.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {goalPaths.map((goal, index) => (
              <Link
                key={goal.label}
                href={goal.href}
                className="group rounded-lg border border-slate-300 border-l-2 border-l-slate-300 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:border-l-orange-500 hover:shadow-md"
              >
                <span className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.18em] text-orange-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowRight className="size-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-orange-600" />
                </span>
                <span className="text-lg font-black">{goal.label}</span>
                <span className="mt-2 block text-sm text-muted-foreground">
                  {goal.slugs
                    .map((slug) => getPublishedTool(slug)?.name)
                    .filter(Boolean)
                    .join(" · ") || "Browse published tools"}
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <SectionHeading
            eyebrow="Browse the directory"
            title="Free for students by category"
            icon={Layers}
          />
          <p className="mb-7 max-w-3xl text-sm leading-7 text-muted-foreground">
            Browse by subject to compare tools for similar coursework.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group rounded-lg border border-slate-300 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md hover:shadow-slate-900/5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <CategoryMark category={category.slug} />
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-orange-600" />
                </div>
                <span className="text-lg font-black">{category.name}</span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                  {category.description}
                </span>
                <span className="mt-5 block text-sm font-bold text-orange-700">
                  {
                    publishedTools.filter(
                      (tool) => tool.category === category.slug,
                    ).length
                  }{" "}
                  {publishedTools.filter(
                    (tool) => tool.category === category.slug,
                  ).length === 1
                    ? "tool"
                    : "tools"}{" "}
                  <ArrowRight className="ml-1 inline size-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <SectionHeading
            eyebrow="Curated paths"
            title="Choose a shortlist for the decision ahead"
            href="/collections"
            link="See all collections"
            icon={Layers}
          />
          <p className="mb-7 max-w-3xl text-sm leading-7 text-muted-foreground">
            Start with a focused collection when you want fewer choices. Each
            shortlist explains why a tool appears, what limits matter and where
            to confirm the current offer.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {publishedCollections.map((item) => (
              <CollectionCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
        <section className="rounded-xl border border-slate-300 bg-white p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(220px,0.75fr)_minmax(0,1.75fr)] lg:items-start">
            <div>
              <p className="eyebrow">How we verify</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                Clear sources, clear limits.
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
                See how we check access requirements and track changes.
              </p>
            </div>
            <div className="grid gap-6 text-sm leading-6 text-muted-foreground sm:grid-cols-3 sm:gap-0">
              <p className="border-indigo-100 sm:border-l sm:pl-5 sm:pr-5">
                <strong className="mb-2 block text-lg font-black text-indigo-700">
                  01
                </strong>
                Check each provider's pricing, education and help pages.
              </p>
              <p className="border-indigo-100 sm:border-l sm:px-5">
                <strong className="mb-2 block text-lg font-black text-indigo-700">
                  02
                </strong>
                Record access requirements and the important limits.
              </p>
              <p className="border-indigo-100 sm:border-l sm:pl-5 sm:pr-2">
                <strong className="mb-2 block text-lg font-black text-indigo-700">
                  03
                </strong>
                Keep the review date visible and flag material changes affecting
                what is free for students.
              </p>
            </div>
          </div>
          <p className="mt-8 border-t border-border pt-6 text-sm leading-7 text-muted-foreground">
            Free for students can mean a general free plan, free credits,
            open-source software, a student offer, or another student benefit.
            Compare the task, limits and eligibility before choosing.
          </p>
        </section>
        <NewsletterBlock />
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  href,
  link,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  link?: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="section-label mb-7">
      <div className="flex items-start gap-3">
        {Icon && (
          <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-lg border border-orange-200 bg-orange-50 text-orange-700">
            <Icon className="size-4" aria-hidden="true" />
          </span>
        )}
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">{title}</h2>
        </div>
      </div>
      {href && link && (
        <Link
          href={href}
          className="shrink-0 text-sm font-bold text-orange-700 hover:text-orange-800"
        >
          {link} <ArrowRight className="ml-1 inline size-4" />
        </Link>
      )}
    </div>
  );
}

export function ToolPageHeader({ tool }: { tool: StudentTool }) {
  useEffect(() => {
    trackEvent("tool_view", { tool: tool.slug });
  }, [tool.slug]);

  return (
    <>
      <div>
        <div>
          <div className="mb-5 flex items-center gap-3">
            <ToolLogo tool={tool} />
            <Link
              href={`/categories/${tool.category}`}
              className="text-sm font-semibold text-slate-600 hover:text-indigo-700"
            >
              {getCategory(tool.category)?.name}
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag border-indigo-200 text-indigo-700">
              {formatOfferType(tool.offerType)}
            </span>
            {tool.badges.slice(0, 2).map((badge) => (
              <span key={badge} className="tag">
                {badge}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            {tool.accessGuide.pageTitle}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
            {tool.shortDescription}
          </p>
        </div>
      </div>
    </>
  );
}

export function ToolClaimCard({ tool }: { tool: StudentTool }) {
  return (
    <div className="rounded-lg border border-slate-300 bg-white p-5">
      <p className="text-sm font-bold text-indigo-700">Access at a glance</p>
      <p className="mt-2 text-xl font-black leading-7">
        {tool.freePlanSummary}
      </p>
      <TrackedLink
        tool={tool}
        href={`/go/${tool.slug}?source=detail-hero`}
        placement="detail-hero"
        className="button button-accent mt-5 w-full"
      >
        {getCtaLabel(tool)} <ExternalLink className="size-4" />
      </TrackedLink>
      <p className="mt-3 text-xs text-slate-600">
        Checked {tool.lastVerifiedAt}. Opens the official source.
      </p>
      <Link
        href="/tools"
        className="mt-4 block border-t border-slate-200 pt-4 text-center text-sm font-semibold text-slate-600 hover:text-indigo-700"
      >
        Browse all tools <ArrowRight className="ml-1 inline size-4" />
      </Link>
    </div>
  );
}

export function ToolRecommendations({ tool }: { tool: StudentTool }) {
  const related = publishedTools.filter(
    (item) => item.slug !== tool.slug && item.category === tool.category,
  );
  const alternatives = tool.alternativeToolSlugs
    .map(getPublishedTool)
    .filter(
      (item): item is StudentTool => Boolean(item) && item?.slug !== tool.slug,
    );
  const matches = Array.from(
    new Map(
      [...related, ...alternatives].map((item) => [item.slug, item]),
    ).values(),
  );
  const hasRelated = matches.length > 0;
  const items = (
    hasRelated
      ? matches
      : publishedTools.filter((item) => item.slug !== tool.slug)
  ).slice(0, 3);
  return (
    <section className="rounded-lg border border-slate-300 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-indigo-700">
        Worth exploring
      </p>
      <h2 className="mt-2 text-lg font-black">
        {hasRelated ? "Related tools" : "More student tools"}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {hasRelated
          ? "Compare related tools and alternatives for your coursework."
          : "Explore tools for other parts of your coursework, from research to writing."}
      </p>
      <div className="mt-4 divide-y divide-slate-200">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/tools/${item.slug}`}
            onClick={() => trackEvent("alternative_click", { tool: item.slug })}
            className="group flex items-start gap-3 py-4"
          >
            <ToolLogo tool={item} />
            <div className="min-w-0 flex-1">
              <span className="font-bold group-hover:text-indigo-700">
                {item.name}
              </span>
              <span className="mt-1 block text-xs font-semibold text-indigo-700">
                {formatOfferType(item.offerType)}
              </span>
              <span className="mt-1 block text-sm leading-6 text-slate-600">
                {item.shortDescription}
              </span>
            </div>
            <ArrowRight className="mt-1 size-4 shrink-0 text-slate-400 group-hover:text-indigo-700" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export function OfferTable({ tool }: { tool: StudentTool }) {
  const rows = [
    ["Free limit", tool.freeLimit],
    ["Paid plan / renewal", tool.paidPlanStartingPrice ?? "Not clearly stated"],
    ["Credit card", tool.creditCardRequired],
    ["Student verification", tool.studentVerificationRequired],
    ["Countries", tool.supportedCountries],
  ];
  if (tool.category === "design-and-creative") {
    rows.push(["Watermark", tool.watermark]);
  }
  if (!/^(Not applicable|Not clearly stated)$/i.test(tool.exportLimits)) {
    rows.push(["Export limits", tool.exportLimits]);
  }
  const unknown = rows
    .filter(([, value]) => value === "Not clearly stated")
    .map(([label]) => label.toLowerCase());
  const visibleRows = rows.filter(
    ([, value]) => !/^(Not applicable|Not clearly stated)$/i.test(value),
  );
  return (
    <section className="rounded-lg border border-slate-300 bg-white p-5">
      <h2 className="font-black">Before you sign up</h2>
      <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
        {visibleRows.map(([label, value]) => (
          <div key={label} className="border-t border-slate-200 pt-3">
            <dt className="text-xs font-bold text-muted-foreground">{label}</dt>
            <dd className="mt-1 text-sm leading-6">{value}</dd>
          </div>
        ))}
      </dl>
      {unknown.length > 0 && (
        <p className="mt-4 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-600">
          Not confirmed: {unknown.join(", ")}. Check these with the provider
          before signing up.
        </p>
      )}
    </section>
  );
}

export function ToolArticle({ tool }: { tool: StudentTool }) {
  const alternatives = tool.alternativeToolSlugs
    .map(getPublishedTool)
    .filter((item): item is StudentTool => Boolean(item));
  const faq = [...tool.faq, ...tool.accessGuide.faq];
  return (
    <div className="prose-student min-w-0 rounded-lg border border-slate-300 bg-white p-5 sm:p-6 [&>h2:first-child]:mt-0">
      <h2>About {tool.name}</h2>
      <p>{tool.fullDescription}</p>
      <h2>
        Who can use the {tool.name} {tool.accessGuide.label}?
      </h2>
      <p>{tool.accessGuide.eligibility}</p>
      <h2>What is included?</h2>
      <p>{tool.accessGuide.included}</p>
      <h2>Limits to consider</h2>
      <ul>
        {tool.freePlanLimitations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2>How to get started</h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 leading-7 text-muted-foreground">
        {tool.accessGuide.claimSteps.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      <h2>Ways to use {tool.name} for coursework</h2>
      <ul>
        {tool.studentUseCases.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2>What happens after starting with {tool.name}?</h2>
      <p>{tool.accessGuide.afterAccess}</p>
      {alternatives.length > 0 && <h2>Free alternatives to {tool.name}</h2>}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {alternatives.map((item) => (
          <Link
            key={item.slug}
            href={`/tools/${item.slug}`}
            onClick={() => trackEvent("alternative_click", { tool: item.slug })}
            className="group rounded-lg border border-slate-300 bg-white p-4 transition-colors hover:border-indigo-300"
          >
            <span className="mb-3 flex items-center gap-3">
              <ToolLogo tool={item} />
              <span className="min-w-0 flex-1 font-bold group-hover:text-indigo-700">
                {item.name}
              </span>
              <ArrowRight
                className="size-4 shrink-0 text-slate-400 group-hover:text-indigo-700"
                aria-hidden="true"
              />
            </span>
            <span className="mt-1 block text-sm text-muted-foreground">
              {item.shortDescription}
            </span>
          </Link>
        ))}
      </div>
      <h2>Frequently asked questions</h2>
      {faq.map((item) => (
        <div key={item.question} className="mt-5 border-b border-border pb-5">
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  );
}

export function OfficialSources({ tool }: { tool: StudentTool }) {
  return (
    <section className="mt-12 rounded-lg border border-slate-300 bg-white p-6">
      <div className="flex items-center gap-2">
        <ShieldCheck className="size-5 text-orange-600" />
        <h2 className="text-xl font-black">Official sources for {tool.name}</h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Confirm the current offer, limits and eligibility with the provider
        before signing up.
      </p>
      <p className="mt-3 text-sm font-semibold text-slate-700">
        {tool.affiliateDisclosure}
      </p>
      <ul className="mt-5 space-y-3">
        {tool.officialSources.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-800"
            >
              {item.label} <ExternalLink className="size-3.5" />
            </a>
          </li>
        ))}
      </ul>
      <a
        href={`mailto:hello@freeforstudent.com?subject=Outdated%20offer%3A%20${encodeURIComponent(tool.name)}`}
        onClick={() => trackEvent("report_outdated", { tool: tool.slug })}
        className="mt-6 inline-block text-sm font-bold text-muted-foreground underline decoration-orange-400 underline-offset-4 hover:text-orange-700"
      >
        Report an outdated offer
      </a>
    </section>
  );
}

export function CollectionCard({
  item,
}: { item: (typeof allCollections)[number] }) {
  const collectionIcons: Record<string, LucideIcon> = {
    "best-free-ai-tools-for-students": Sparkles,
    "best-free-writing-tools-for-students": Pencil,
    "free-tools-without-credit-card": CreditCard,
  };
  const Icon = collectionIcons[item.slug] ?? Layers;
  return (
    <Link
      href={`/collections/${item.slug}`}
      className="group block rounded-lg border border-slate-300 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md hover:shadow-slate-900/5"
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="grid size-10 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-orange-600" />
      </div>
      <h3 className="text-lg font-black">{item.name}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {item.description}
      </p>
      <p className="mt-4 text-sm font-bold text-orange-700">
        {
          item.toolSlugs.filter((slug) =>
            publishedTools.some((tool) => tool.slug === slug),
          ).length
        }{" "}
        tools <ArrowRight className="ml-1 inline size-4" />
      </p>
    </Link>
  );
}

export function StaticPageHeader({
  eyebrow,
  title,
  description,
}: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="border-b border-border bg-background">
      <div className="content-shell py-10 sm:py-14">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
