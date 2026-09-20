"use client";

export function trackGroupBuyEvent(
  name: string,
  payload: Record<string, string> = {},
) {
  if (typeof window === "undefined") return;
  const event = { event: name, ...payload };
  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dataLayer)) dataLayer.push(event);
  window.dispatchEvent(
    new CustomEvent("group-buy:analytics", { detail: event }),
  );
}
