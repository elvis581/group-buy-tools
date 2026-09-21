import {
  Breadcrumbs,
  FAQ,
  JsonLd,
  PageHero,
  RelatedPages,
  ToolCard,
} from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { categoryMap, publishedCategories } from "@/data/group-buy-directory";
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
  return publishedCategories.map((category) => ({ slug: category.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }) {
  const category = categoryMap[params.slug];
  if (!category?.published) return {};
  return constructMetadata({
    title: `${category.name}: Tool Directory & Group Buy Comparisons`,
    description: category.description,
    canonicalUrl: `${siteConfig.url}/categories/${category.slug}`,
    primaryKeyword: category.name,
  });
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categoryMap[params.slug];
  if (!category?.published) notFound();
  const categoryTools = category.toolSlugs
    .map((slug) => toolMap[slug])
    .filter(Boolean);
  const faqs = [
    {
      question: `What is included in the ${category.name} directory?`,
      answer: categoryTools.length
        ? `This page currently links to ${categoryTools.map((tool) => tool.name).join(", ")}. Each product page keeps official pricing, access offers and verification notes separate.`
        : "No standalone product records are currently published in this category. The directory will expand when a product has a source that can be checked.",
    },
    {
      question: "Are category listings ranked?",
      answer:
        "No. The directory groups products by workflow and does not imply that the first listing is the best option or that every bundle includes every product.",
    },
    {
      question: "Should I compare the official plan with a group-buy offer?",
      answer:
        "Yes. Compare ownership, privacy, limits, support and cancellation terms separately before treating a lower price as a useful saving.",
    },
  ];
  return (
    <>
      <PageHero
        eyebrow="Category directory"
        title={category.name}
        description={category.description}
      >
        <p className="mt-4 text-sm text-slate-500">
          Updated: {formatDate(category.lastUpdated)}
        </p>
      </PageHero>
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <Breadcrumbs
          items={[
            { label: "Categories", href: "/categories" },
            { label: category.name },
          ]}
        />
        {categoryTools.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-300 bg-slate-50 p-6 text-sm leading-7 text-slate-600">
            There are no standalone product pages published for this category
            yet. Check the main tools directory for current product records and
            return when this category has a source-backed listing.
          </div>
        )}
        <div className="mt-14 border-t border-slate-200 pt-10">
          <FAQ items={faqs} />
        </div>
        <div className="mt-12">
          <RelatedPages
            links={[
              { href: "/tools", label: "All tools" },
              { href: "/providers", label: "Provider reviews" },
              {
                href: "/collections/recently-verified",
                label: "Recently verified",
              },
            ]}
          />
        </div>
      </section>
      <JsonLd
        id="category-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Categories", path: "/categories" },
          { name: category.name, path: `/categories/${category.slug}` },
        ])}
      />
      <JsonLd
        id="category-list"
        data={itemListSchema(
          category.name,
          categoryTools.map((tool) => ({
            name: tool.name,
            path: `/tools/${tool.slug}`,
          })),
        )}
      />
      <JsonLd id="category-faq" data={faqSchema(faqs)} />
    </>
  );
}
