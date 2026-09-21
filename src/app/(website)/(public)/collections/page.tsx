import {
  Breadcrumbs,
  CollectionCard,
  JsonLd,
  PageHero,
} from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { publishedCollections } from "@/data/group-buy-directory";
import { breadcrumbSchema, itemListSchema } from "@/lib/group-buy";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Tool Collections: Recently Verified & Workflow Shortlists",
  description:
    "Browse source-backed Group Buy Tools collections for ecommerce research, AI workflows and recently verified records.",
  canonicalUrl: `${siteConfig.url}/collections`,
  primaryKeyword: "tool collections",
});

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Collections and freshness"
        title="Curated Tool Collections and Recent Checks"
        description="Use workflow shortlists to reach relevant product and provider pages, then check the dated source before relying on an offer."
      />
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <Breadcrumbs items={[{ label: "Collections" }]} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {publishedCollections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </section>
      <JsonLd
        id="collections-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
        ])}
      />
      <JsonLd
        id="collections-list"
        data={itemListSchema(
          "Tool Collections",
          publishedCollections.map((collection) => ({
            name: collection.name,
            path: `/collections/${collection.slug}`,
          })),
        )}
      />
    </>
  );
}
