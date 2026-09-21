import {
  Breadcrumbs,
  CategoryCard,
  JsonLd,
  PageHero,
} from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { publishedCategories } from "@/data/group-buy-directory";
import { breadcrumbSchema, itemListSchema } from "@/lib/group-buy";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Tool Categories: Ad Spy, Ecommerce Research, SEO & AI",
  description:
    "Browse Group Buy Tools by category, including ad spy, ecommerce research, SEO and AI workflows.",
  canonicalUrl: `${siteConfig.url}/categories`,
  primaryKeyword: "tool categories",
});

export default function CategoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Category directory"
        title="Browse Tools by Workflow Category"
        description="Start with the job you need to complete, then compare the product, provider and access model behind each listing."
      />
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <Breadcrumbs items={[{ label: "Categories" }]} />
        <div className="grid gap-4 sm:grid-cols-2">
          {publishedCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
      <JsonLd
        id="categories-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Categories", path: "/categories" },
        ])}
      />
      <JsonLd
        id="categories-list"
        data={itemListSchema(
          "Tool Categories",
          publishedCategories.map((category) => ({
            name: category.name,
            path: `/categories/${category.slug}`,
          })),
        )}
      />
    </>
  );
}
