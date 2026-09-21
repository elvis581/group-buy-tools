"use client";

import { trackGroupBuyEvent } from "@/components/group-buy-analytics";
import type {
  Comparison,
  DirectoryCategory,
  Provider,
} from "@/data/group-buy-directory";
import type { Tool } from "@/data/group-buy-tools";
import Link from "next/link";
import { type FormEvent, useEffect, useMemo, useState } from "react";

export function GroupBuySearch({
  tools,
  providers = [],
  categories = [],
  comparisons = [],
  initialQuery = "",
}: {
  tools: Tool[];
  providers?: Provider[];
  categories?: DirectoryCategory[];
  comparisons?: Comparison[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  useEffect(() => setQuery(initialQuery), [initialQuery]);
  const results = useMemo(() => {
    const normalized = query.toLowerCase();
    return [
      ...tools
        .filter((tool) =>
          `${tool.name} ${tool.shortDescription} ${tool.categories.join(" ")} ${tool.bestFor.join(" ")}`
            .toLowerCase()
            .includes(normalized),
        )
        .map((tool) => ({
          name: tool.name,
          label: tool.categories[0],
          href:
            tool.slug === "flikover"
              ? "/spybox-alternative"
              : `/tools/${tool.slug}`,
          kind: "Tool",
        })),
      ...providers
        .filter((provider) =>
          `${provider.name} ${provider.shortDescription}`
            .toLowerCase()
            .includes(normalized),
        )
        .map((provider) => ({
          name: provider.name,
          label: "Provider",
          href: `/providers/${provider.slug}`,
          kind: "Provider",
        })),
      ...categories
        .filter((category) =>
          `${category.name} ${category.description}`
            .toLowerCase()
            .includes(normalized),
        )
        .map((category) => ({
          name: category.name,
          label: "Category",
          href: `/categories/${category.slug}`,
          kind: "Category",
        })),
      ...comparisons
        .filter((comparison) =>
          `${comparison.title} ${comparison.description}`
            .toLowerCase()
            .includes(normalized),
        )
        .map((comparison) => ({
          name: comparison.title,
          label: "Comparison",
          href: `/compare/${comparison.slug}`,
          kind: "Comparison",
        })),
    ];
  }, [categories, comparisons, providers, query, tools]);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const trimmedQuery = query.trim();
    trackGroupBuyEvent("tool_search_submit", { query: trimmedQuery });
  }
  return (
    <div className="relative mx-auto mt-8 min-w-0 w-full max-w-2xl">
      <label htmlFor="tool-search" className="sr-only">
        Search a tool
      </label>
      <form
        action="/tools"
        method="get"
        onSubmit={handleSubmit}
        className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-300 bg-white p-2 shadow-sm focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100"
      >
        <input
          id="tool-search"
          name="q"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            trackGroupBuyEvent("tool_search", { query: event.target.value });
          }}
          placeholder="Search Minea, Claude, PiPiADS..."
          className="block min-w-0 flex-1 bg-transparent px-3 py-2 text-base outline-none placeholder:text-slate-400"
        />
        <button type="submit" className="button button-primary shrink-0 px-4">
          Search tools
        </button>
      </form>
      {query && (
        <div className="mt-2 rounded-lg border border-slate-200 bg-white p-2 shadow-xl">
          {results.length ? (
            results.map((result) => (
              <Link
                key={`${result.kind}-${result.href}`}
                href={result.href}
                onClick={() =>
                  trackGroupBuyEvent("tool_card_click", {
                    tool_name: result.name,
                    source: "homepage_search",
                  })
                }
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-bold hover:bg-indigo-50"
              >
                <span>{result.name}</span>
                <span className="text-xs font-normal text-slate-500">
                  {result.label}
                </span>
              </Link>
            ))
          ) : (
            <p className="px-3 py-2 text-sm text-slate-500">
              No matching tool yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
