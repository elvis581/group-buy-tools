import { TrustPage } from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";
export const metadata = constructMetadata({
  title: "Editorial Policy | Group Buy Tools",
  description:
    "How Group Buy Tools selects tools, checks pricing and makes software comparisons.",
  canonicalUrl: `${siteConfig.url}/editorial-policy`,
});
export default function Page() {
  return (
    <TrustPage
      title="Editorial Policy"
      description="How we select tools, check pricing and make comparisons."
    >
      <h2>Tool selection</h2>
      <p>
        We choose tools because they match a search intent or comparison
        question. A listing is not a guarantee of quality, availability or
        price.
      </p>
      <h2>Pricing checks</h2>
      <p>
        Pricing is checked against provider pages when possible. Data can
        change, so readers should verify final pricing and terms before
        purchase.
      </p>
      <h2>Comparisons</h2>
      <p>
        We compare workflow fit, access model, features and limitations.
        Affiliate commissions do not automatically determine rankings.
      </p>
      <h2>Updates</h2>
      <p>
        Each tool record includes a last verified date. Provider terms remain
        the final reference.
      </p>
    </TrustPage>
  );
}
