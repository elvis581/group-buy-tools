import { TrustPage } from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";
export const metadata = constructMetadata({
  title: "Affiliate Disclosure | Group Buy Tools",
  description:
    "Read the Group Buy Tools affiliate disclosure and how commissions relate to our comparisons.",
  canonicalUrl: `${siteConfig.url}/affiliate-disclosure`,
});
export default function Page() {
  return (
    <TrustPage
      title="Affiliate Disclosure"
      description="How affiliate links work on Group Buy Tools."
    >
      <p>
        Some links on Group Buy Tools may be affiliate links. If you click a
        link and later purchase, we may earn a commission at no extra cost to
        you.
      </p>
      <p>
        Affiliate commissions do not automatically determine rankings or
        recommendations. We aim to explain limitations and verification gaps so
        readers can make their own decision.
      </p>
    </TrustPage>
  );
}
