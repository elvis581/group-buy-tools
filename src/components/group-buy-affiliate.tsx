"use client";

import { trackGroupBuyEvent } from "@/components/group-buy-analytics";
import { spyboxAffiliateUrl } from "@/config/site";

export function AffiliateCTA({
  pageType,
  pageSlug,
}: { pageType: string; pageSlug: string }) {
  const destination = spyboxAffiliateUrl;
  return (
    <aside className="my-10 flex flex-col justify-between gap-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-6 sm:flex-row sm:items-center">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-800">
          36+ Premium Tools · Group buy offer
        </p>
        <h2 className="mt-2 text-xl font-black text-slate-950">
          Access the best ecommerce and AI tools in one subscription
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
          Save $8,000+ per month compared to individual subscriptions, according
          to SpyBox. Use promo code{" "}
          <code className="rounded border border-indigo-200 bg-white px-1.5 py-0.5 font-black text-indigo-900">
            DCWSCX
          </code>{" "}
          at checkout for 10% off.
        </p>
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
        Claim 10% off{" "}
        <span className="ml-2" aria-hidden="true">
          ↗
        </span>
      </a>
    </aside>
  );
}
