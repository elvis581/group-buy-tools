import {
  Breadcrumbs,
  JsonLd,
  PageHero,
  ProviderCard,
} from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { publishedProviders } from "@/data/group-buy-directory";
import { breadcrumbSchema, itemListSchema } from "@/lib/group-buy";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Group Buy Providers: Reviews, Access Models & Terms",
  description:
    "Review published group-buy and third-party software providers by pricing, tool coverage, access model, support and verification notes.",
  canonicalUrl: `${siteConfig.url}/providers`,
  primaryKeyword: "group buy providers",
});

export default function ProvidersPage() {
  return (
    <>
      <PageHero
        eyebrow="Provider directory"
        title="Group Buy Providers and Access Platforms"
        description="Review provider-level pricing, public tool coverage, access rules, support and source notes before comparing an offer."
      />
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <Breadcrumbs items={[{ label: "Providers" }]} />
        <p className="max-w-3xl text-base leading-7 text-slate-600">
          A provider page answers a different question from a product page: who
          controls access, what is publicly listed, which terms are disclosed
          and what still needs confirmation. Published records below have at
          least one source; undisclosed details remain clearly labeled.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {publishedProviders.map((provider) => (
            <ProviderCard key={provider.slug} provider={provider} />
          ))}
        </div>
      </section>
      <JsonLd
        id="providers-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Providers", path: "/providers" },
        ])}
      />
      <JsonLd
        id="providers-list"
        data={itemListSchema(
          "Group Buy Providers",
          publishedProviders.map((provider) => ({
            name: provider.name,
            path: `/providers/${provider.slug}`,
          })),
        )}
      />
    </>
  );
}
