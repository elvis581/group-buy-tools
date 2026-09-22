"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

export type HeaderMenuItem = { label: string; href: string };
export type HeaderMenu = { label: string; items: HeaderMenuItem[] };

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
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = `group-buy-menu-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    if (!open) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`group relative ${mobile ? "" : "h-16"}`}
      onMouseEnter={mobile ? undefined : () => setOpen(true)}
      onMouseLeave={mobile ? undefined : () => setOpen(false)}
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
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        className={`${mobile ? "flex w-full justify-between px-3 py-3" : "h-16 px-3"} flex items-center gap-1 rounded-md text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`}
      >
        {label}
        <ChevronDown
          className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div
          id={menuId}
          role={mobile ? undefined : "menu"}
          className={
            mobile
              ? "mt-1 space-y-1 border-l border-indigo-100 pl-3"
              : "absolute left-0 top-[calc(100%-0.25rem)] z-50 min-w-56 rounded-lg border border-border bg-white p-2 shadow-xl"
          }
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role={mobile ? undefined : "menuitem"}
              className={`${mobile ? "block rounded-md px-3 py-2.5 text-slate-600" : "whitespace-nowrap text-slate-700"} block rounded-md px-3 py-2.5 text-sm font-semibold hover:bg-indigo-50 hover:text-indigo-700 focus-visible:bg-indigo-50 focus-visible:outline-none`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function GroupBuyMobileMenu({
  menus,
  offerHref,
}: {
  menus: HeaderMenu[];
  offerHref: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = `group-buy-mobile-menu-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    if (!open) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        className="flex min-h-11 items-center rounded-md border border-border px-3 text-sm font-bold text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        Menu
      </button>
      {open && (
        <nav
          id={menuId}
          className="absolute right-0 top-14 z-50 w-56 rounded-lg border border-border bg-white p-2 shadow-xl"
          aria-label="Mobile navigation"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          {menus.map((menu) => (
            <GroupBuyHeaderDropdown
              key={menu.label}
              label={menu.label}
              items={menu.items}
              mobile
            />
          ))}
          <a
            href={offerHref}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="block rounded-md bg-indigo-50 px-3 py-3 text-sm font-bold text-indigo-800"
          >
            Open SpyBox Offer ↗
          </a>
        </nav>
      )}
    </div>
  );
}
