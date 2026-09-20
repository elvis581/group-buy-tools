"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight">
        Group Buy Tools could not load this page.
      </h1>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" className="button button-primary" onClick={reset}>
          Try again
        </button>
        <Link href="/" className="button button-muted">
          Back to home
        </Link>
      </div>
    </main>
  );
}
