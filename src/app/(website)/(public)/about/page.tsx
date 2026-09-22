import { TrustPage } from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";
export const metadata = constructMetadata({
  title: "About Group Buy Tools",
  description:
    "Learn how Group Buy Tools compares official pricing, third-party access models, cheaper alternatives and software bundles.",
  canonicalUrl: `${siteConfig.url}/about`,
});
export default function Page() {
  return (
    <TrustPage
      title="About Group Buy Tools"
      description="Independent information for comparing software access, alternatives and tool bundles."
      lastReviewed="September 21, 2026"
    >
      <p>
        Group Buy Tools is an independent research and comparison site for
        people evaluating software access. We explain official plans,
        third-party access models, alternatives and multi-tool bundles so a
        reader can compare the trade-offs before paying.
      </p>
      <h2>What we publish</h2>
      <p>
        Our pages cover the workflow a product supports, the price information
        we could check, the account or access model described by a provider,
        relevant limitations and practical alternatives. A page may link to an
        official product source and to a third-party offer, but those are
        separate decisions with separate risks.
      </p>
      <h2>What we do not do</h2>
      <ul>
        <li>We do not sell, issue or administer shared software accounts.</li>
        <li>
          We do not guarantee a provider&apos;s access, refund or support.
        </li>
        <li>
          We do not treat a lower headline price as proof of equal features or
          reliability.
        </li>
      </ul>
      <h2>How to use the guides</h2>
      <p>
        Start with the workflow you need, read the limitations, then verify
        final pricing, availability, privacy terms, cancellation rules and
        support directly with the relevant provider. Dates on a page describe
        when a source was checked; they do not freeze a provider&apos;s current
        offer.
      </p>
      <h2>Corrections and contact</h2>
      <p>
        If a price, feature, route or provider term is outdated, email{" "}
        <a
          href="mailto:hello@group-buy-tools.com"
          className="font-bold text-indigo-800 underline"
        >
          hello@group-buy-tools.com
        </a>{" "}
        with the page URL and the source that supports the correction.
      </p>
    </TrustPage>
  );
}
