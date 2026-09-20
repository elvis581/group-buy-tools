import { Breadcrumbs, GuidePage, JsonLd } from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { guides, toolMap } from "@/data/group-buy-tools";
import { breadcrumbSchema, faqSchema } from "@/lib/group-buy";
import { constructMetadata } from "@/lib/metadata";
const guide = guides[3];
export const metadata = constructMetadata({
  title: "Claude Group Buy: Access, Risks & Alternatives (2026)",
  description:
    "Compare Claude group buy searches with official pricing, shared-access limits, privacy risks, AI alternatives and multi-tool options.",
  canonicalUrl: `${siteConfig.url}/claude-group-buy`,
  primaryKeyword: "claude group buy",
});
export default function Page() {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-5 pt-10 sm:px-8">
        <Breadcrumbs
          items={[
            { label: "Group Buy Guides", href: "/deals" },
            { label: "Claude Group Buy" },
          ]}
        />
      </div>
      <GuidePage guide={guide} tool={toolMap.claude} />
      <JsonLd
        id="claude-group-buy-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Group Buy Guides", path: "/deals" },
          { name: "Claude Group Buy" },
        ])}
      />
      <JsonLd id="claude-group-buy-faq" data={faqSchema(guide.faq)} />
    </>
  );
}
