import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center gap-6 px-5 text-center">
      <p className="eyebrow">404</p>
      <h1 className="text-5xl font-black tracking-tight">Page not found</h1>
      <p className="text-lg text-muted-foreground">
        That guide is not available. Start with a tool or a group buy guide.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {[
          ["Home", "/"],
          ["Tools", "/tools"],
          ["Group Buy Guides", "/deals"],
          ["Minea", "/tools/minea"],
          ["Kalodata", "/tools/kalodata"],
          ["PiPiADS", "/tools/pipiads"],
          ["Claude", "/tools/claude"],
        ].map(([label, href], index) => (
          <Link
            key={href}
            href={href}
            className={
              index === 0 ? "button button-primary" : "button button-muted"
            }
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
