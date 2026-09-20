import { TrustPage } from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";
export const metadata = constructMetadata({
  title: "Terms of Use | Group Buy Tools",
  description:
    "Terms of use for Group Buy Tools information and comparison guides.",
  canonicalUrl: `${siteConfig.url}/terms`,
});
export default function Page() {
  return (
    <TrustPage
      title="Terms of Use"
      description="Terms of use for Group Buy Tools information and comparison guides."
    >
      <p>
        Group Buy Tools provides general information for comparison and
        research. We do not directly sell shared software accounts, guarantee
        provider availability, or provide legal, financial or security advice.
      </p>
      <p>
        Prices, features and access terms may change. Verify details with the
        official or third-party provider before making a purchase. External
        links are governed by their destination&apos;s terms.
      </p>
    </TrustPage>
  );
}
