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
    >
      <p>
        Group Buy Tools helps users compare official pricing, third-party access
        models, cheaper alternatives and software bundles.
      </p>
      <h2>What we do</h2>
      <p>
        We publish practical guides around group buy searches, tool alternatives
        and head-to-head decisions. The site is an independent information
        website and does not directly sell shared SaaS accounts.
      </p>
      <h2>How to use the guides</h2>
      <p>
        Use comparisons as a starting point, then verify final pricing,
        availability, privacy terms and support directly with the provider. Some
        links may be affiliate links.
      </p>
    </TrustPage>
  );
}
