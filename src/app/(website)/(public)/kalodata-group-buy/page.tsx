import { Breadcrumbs, GuidePage, JsonLd } from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { guides, toolMap } from "@/data/group-buy-tools";
import { breadcrumbSchema, faqSchema } from "@/lib/group-buy";
import { constructMetadata } from "@/lib/metadata";
const guide = guides[1];
export const metadata = constructMetadata({
  title: "Kalodata Group Buy: Cheaper Access & Research (2026)",
  description: guide.description,
  canonicalUrl: `${siteConfig.url}/kalodata-group-buy`,
  primaryKeyword: "kalodata group buy",
});
export default function Page() {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-5 pt-10 sm:px-8">
        <Breadcrumbs
          items={[
            { label: "Group Buy Guides", href: "/deals" },
            { label: "Kalodata Group Buy" },
          ]}
        />
      </div>
      <GuidePage guide={guide} tool={toolMap.kalodata} />
      <JsonLd
        id="kalodata-group-buy-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Group Buy Guides", path: "/deals" },
          { name: "Kalodata Group Buy" },
        ])}
      />
      <JsonLd id="kalodata-group-buy-faq" data={faqSchema(guide.faq)} />
    </>
  );
}
