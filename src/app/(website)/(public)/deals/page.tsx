import { AffiliateCTA } from "@/components/group-buy-affiliate";
import {
  Breadcrumbs,
  FAQ,
  GuideCard,
  JsonLd,
  PageHero,
} from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { guides } from "@/data/group-buy-tools";
import { breadcrumbSchema, faqSchema, itemListSchema } from "@/lib/group-buy";
import { constructMetadata } from "@/lib/metadata";
export const metadata = constructMetadata({
  title: "Group Buy Tools & Cheaper Software Access Guides",
  description:
    "Compare official subscriptions, third-party access models, cheaper alternatives and multi-tool bundles.",
  canonicalUrl: `${siteConfig.url}/deals`,
  primaryKeyword: "group buy tools",
});
const faqs = [
  {
    question: "Is a group buy an official discount?",
    answer:
      "Usually not. Group buy generally describes third-party or shared access, so check account ownership, provider terms and support before paying.",
  },
  {
    question: "What should I compare before choosing?",
    answer:
      "Compare official pricing, session limits, privacy expectations, usage caps, interruptions, refund terms and the exact workflow you need to support.",
  },
  {
    question:
      "Does a group buy include the same features as the official plan?",
    answer:
      "Do not assume that it does. A third-party access model can have a different library, session limit, support path or interruption policy, so verify the exact offer.",
  },
  {
    question: "When should I return to a group buy tools guide?",
    answer:
      "Recheck the guide before a recurring purchase, after a provider changes its terms, or when your workflow starts using more data, sessions or confidential research.",
  },
  {
    question: "What is the safest way to use these access guides?",
    answer:
      "Use the guide to frame the decision, then open the linked official provider pages and record the current account, pricing, cancellation and support terms before paying.",
  },
];
export default function DealsPage() {
  return (
    <>
      <PageHero
        eyebrow="Compare access models"
        title="Group Buy Tools & Cheaper Access Guides"
        description="Group buy does not automatically mean an official discount. These guides help you compare official subscriptions, shared-access models, alternatives and multi-tool bundles."
      />
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <Breadcrumbs items={[{ label: "Group Buy Guides" }]} />
        <AffiliateCTA pageType="guides_directory" pageSlug="deals" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide) => (
            <GuideCard guide={guide} key={guide.slug} />
          ))}
        </div>
        <article className="prose-content mt-14 max-w-3xl">
          <h2>What to compare before choosing</h2>
          <p>
            Look at account ownership, session limits, privacy considerations,
            usage caps, provider terms and the chance of service interruptions.
            A lower price is only useful when the access model supports the work
            you need to do.
          </p>
          <p>
            This group buy tools directory keeps the access model beside the
            official product so you can compare both before paying.
          </p>
          <h2>How these group buy tools guides are organized</h2>
          <p>
            Each group buy tools guide starts with the official product, then
            explains shared access, limitations and alternatives. That structure
            keeps a lower-cost option in context instead of treating every group
            buy tools listing as an official discount.
          </p>
          <p>
            Use the group buy tools index as a starting point, then confirm the
            provider terms that apply to your account.
          </p>
          <h2>How to use these guides</h2>
          <p>
            Start with the guide for the tool you already understand. Read the
            official pricing section first, then compare the account model and
            limitations described for third-party access. This order helps you
            distinguish a real group buy tools workflow fit from a headline
            promise about lower cost.
          </p>
          <p>
            Next, write down the tasks that cannot be interrupted, the data you
            cannot share, and the usage volume you expect. Those constraints
            determine whether an owned subscription, a focused alternative or a
            managed group buy tools bundle is practical. Recheck the linked
            provider before paying because offers, availability and support
            terms can change.
          </p>
          <p>
            The directory is a comparison starting point rather than a guarantee
            that any provider will meet a particular service level. Use the
            linked official pages to confirm the final group buy tools details
            that matter to your account.
          </p>
          <h2>Questions to answer before a group buy tools purchase</h2>
          <p>
            Note which group buy tools you need, who will use the account and
            whether the workflow contains confidential research. Then check
            access frequency, support response and cancellation steps. This
            short record makes the group buy tools decision easier to review
            when an offer or provider changes.
          </p>
          <FAQ items={faqs} />
        </article>
      </section>
      <JsonLd
        id="deals-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Group Buy Guides", path: "/deals" },
        ])}
      />
      <JsonLd
        id="deals-item-list"
        data={itemListSchema(
          "Group Buy Guides",
          guides.map((guide) => ({
            name: guide.title,
            path: `/${guide.slug}`,
          })),
        )}
      />
      <JsonLd id="deals-faq" data={faqSchema(faqs)} />
    </>
  );
}
