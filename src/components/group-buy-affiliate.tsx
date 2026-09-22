"use client";

import { trackGroupBuyEvent } from "@/components/group-buy-analytics";
import { spyboxAffiliateUrl } from "@/config/site";
import { spyboxDirectory, spyboxToolsUrl } from "@/data/group-buy-tools";
import { formatDate } from "@/lib/group-buy";

export function AffiliateCTA({
  pageType,
  pageSlug,
  toolName,
}: { pageType: string; pageSlug: string; toolName?: string }) {
  const destination = spyboxAffiliateUrl;
  const isSpyBoxPage = toolName === "SpyBox";
  return (
    <aside
      aria-label="Sponsored offer"
      className="my-10 flex flex-col justify-between gap-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-6 sm:flex-row sm:items-center"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
          Sponsored offer · Affiliate link
        </p>
        <h2 className="mt-2 text-xl font-black text-slate-950">
          {toolName
            ? isSpyBoxPage
              ? "Open the current SpyBox offer"
              : `Check ${toolName} availability on SpyBox`
            : "Access the best ecommerce and AI tools in one subscription"}
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
          {toolName
            ? isSpyBoxPage
              ? `Review the current SpyBox library and pricing before purchase. Offer checked ${formatDate(spyboxDirectory.lastChecked)}. `
              : `SpyBox lists ${toolName} in its public tools directory, checked ${formatDate(spyboxDirectory.lastChecked)}. Verify the current access terms before purchase. `
            : `SpyBox advertises $8,000+ in monthly savings compared with individual subscriptions. Savings vary by the tools and plans you would otherwise buy; provider claim checked ${formatDate(spyboxDirectory.lastChecked)}. `}
          Use promo code{" "}
          <code className="rounded border border-indigo-200 bg-white px-1.5 py-0.5 font-black text-indigo-900">
            DCWSCX
          </code>{" "}
          at checkout for 10% off.
        </p>
        <a
          href={spyboxToolsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex text-xs font-bold text-indigo-800 underline"
        >
          View current SpyBox tools ↗
        </a>
      </div>
      <a
        className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md bg-indigo-800 px-5 text-sm font-bold text-white hover:bg-indigo-900"
        href={destination}
        target="_blank"
        rel="sponsored noopener noreferrer"
        onClick={() =>
          trackGroupBuyEvent("affiliate_click", {
            tool_name: "SpyBox",
            page_type: pageType,
            page_slug: pageSlug,
            cta_type: "multi_tool_option",
            destination: "spybox",
          })
        }
      >
        {toolName
          ? isSpyBoxPage
            ? "Open SpyBox offer"
            : `Check ${toolName} availability`
          : "Claim 10% off"}{" "}
        <span className="ml-2" aria-hidden="true">
          ↗
        </span>
      </a>
    </aside>
  );
}
