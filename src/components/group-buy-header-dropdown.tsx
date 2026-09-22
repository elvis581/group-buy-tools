"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type HeaderMenuItem = { label: string; href: string };

export function GroupBuyHeaderDropdown({
  label,
  items,
  mobile = false,
}: {
  label: string;
  items: HeaderMenuItem[];
  mobile?: boolean;
}) {
  const [open, setOpen] = useState(false);

  if (mobile) {
    return (
      <details className="group relative">
        <summary className="flex w-full cursor-pointer list-none items-center justify-between rounded-md px-3 py-3 marker:hidden [&::-webkit-details-marker]:hidden">
          {label}
          <ChevronDown
            className="size-4 shrink-0 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="mt-1 space-y-1 border-l border-indigo-100 pl-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </details>
    );
  }

  return (
    <div
      className="group relative h-16"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
        className="flex h-16 items-center gap-1 rounded-md px-3 text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        {label}
        <ChevronDown
          className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-[calc(100%-0.25rem)] z-50 min-w-56 rounded-lg border border-border bg-white p-2 shadow-xl"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className="block whitespace-nowrap rounded-md px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:bg-indigo-50 focus-visible:outline-none"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
