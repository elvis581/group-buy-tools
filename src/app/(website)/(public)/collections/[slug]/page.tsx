import {
  Breadcrumbs,
  FAQ,
  JsonLd,
  PageHero,
  ProviderCard,
  RelatedPages,
  ToolCard,
} from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import {
  collectionMap,
  providerMap,
  publishedCollections,
} from "@/data/group-buy-directory";
import { toolMap } from "@/data/group-buy-tools";
import {
  breadcrumbSchema,
  faqSchema,
  formatDate,
  itemListSchema,
} from "@/lib/group-buy";
import { constructMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return publishedCollections.map((collection) => ({ slug: collection.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }) {
  const collection = collectionMap[params.slug];
  if (!collection?.published) return {};
  return constructMetadata({
    title: `${collection.name} | Group Buy Tools`,
    description: collection.description,
    canonicalUrl: `${siteConfig.url}/collections/${collection.slug}`,
    primaryKeyword: collection.name,
  });
}

export default function CollectionPage({
  params,
}: { params: { slug: string } }) {
  const collection = collectionMap[params.slug];
  if (!collection?.published) notFound();
  const collectionTools = collection.toolSlugs
    .map((slug) => toolMap[slug])
    .filter(Boolean);
  const collectionProviders = collection.providerSlugs
    .map((slug) => providerMap[slug])
    .filter((provider) => provider?.published);
  const faqs = [
    {
      question: `How was the ${collection.name} collection selected?`,
      answer: collection.selectionNote,
    },
    {
      question: "Does recently checked mean guaranteed available?",
      answer:
        "No. A recent source check records when the directory reviewed a page. It does not guarantee access, uptime, support, pricing or eligibility at the time you purchase.",
    },
    {
      question: "Where should I verify the commercial details?",
      answer:
        "Open the linked product and provider pages, then confirm the official source, current offer, account rules, limits, cancellation and refund terms before relying on a recurring plan.",
    },
  ];
  return (
    <>
      <PageHero
        eyebrow="Collection"
        title={collection.name}
        description={collection.description}
      >
        <p className="mt-4 text-sm text-slate-500">
          Last updated: {formatDate(collection.lastUpdated)}
        </p>
      </PageHero>
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <Breadcrumbs
          items={[
            { label: "Collections", href: "/collections" },
            { label: collection.name },
          ]}
        />
        <p className="max-w-3xl text-base leading-7 text-slate-600">
          {collection.selectionNote}
        </p>
        <h2 className="mt-10 text-2xl font-black text-slate-950">
          Tools in this collection
        </h2>
        {collectionTools.length ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {collectionTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <p className="mt-5 text-sm text-slate-600">
            No product records are currently published.
          </p>
        )}
        <h2 className="mt-12 text-2xl font-black text-slate-950">
          Providers to review
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {collectionProviders.map((provider) => (
            <ProviderCard key={provider.slug} provider={provider} />
          ))}
        </div>
        <div className="mt-12">
          <FAQ items={faqs} />
        </div>
        <div className="mt-12">
          <RelatedPages
            links={[
              { href: "/categories", label: "Browse categories" },
              { href: "/compare", label: "Compare providers" },
              { href: "/tools", label: "All tools" },
            ]}
          />
        </div>
      </section>
      <JsonLd
        id="collection-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
          { name: collection.name, path: `/collections/${collection.slug}` },
        ])}
      />
      <JsonLd
        id="collection-list"
        data={itemListSchema(
          collection.name,
          collectionTools.map((tool) => ({
            name: tool.name,
            path: `/tools/${tool.slug}`,
          })),
        )}
      />
      <JsonLd id="collection-faq" data={faqSchema(faqs)} />
    </>
  );
}
