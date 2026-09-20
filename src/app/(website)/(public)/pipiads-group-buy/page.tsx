import { Breadcrumbs, GuidePage, JsonLd } from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { guides, toolMap } from "@/data/group-buy-tools";
import { breadcrumbSchema, faqSchema } from "@/lib/group-buy";
import { constructMetadata } from "@/lib/metadata";
const guide = guides[2];
export const metadata = constructMetadata({
  title: "PiPiADS Group Buy: Access, Risks & Alternatives (2026)",
  description: guide.description,
  canonicalUrl: `${siteConfig.url}/pipiads-group-buy`,
  primaryKeyword: "pipiads group buy",
});
export default function Page() {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-5 pt-10 sm:px-8">
        <Breadcrumbs
          items={[
            { label: "Group Buy Guides", href: "/deals" },
            { label: "PiPiADS Group Buy" },
          ]}
        />
      </div>
      <GuidePage guide={guide} tool={toolMap.pipiads} />
      <JsonLd
        id="pipiads-group-buy-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Group Buy Guides", path: "/deals" },
          { name: "PiPiADS Group Buy" },
        ])}
      />
      <JsonLd id="pipiads-group-buy-faq" data={faqSchema(guide.faq)} />
    </>
  );
}
