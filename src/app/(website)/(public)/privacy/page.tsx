import { TrustPage } from "@/components/group-buy-site";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";
export const metadata = constructMetadata({
  title: "Privacy Policy | Group Buy Tools",
  description: "Privacy information for visitors to Group Buy Tools.",
  canonicalUrl: `${siteConfig.url}/privacy`,
});
export default function Page() {
  return (
    <TrustPage
      title="Privacy"
      description="Privacy information for visitors to Group Buy Tools."
    >
      <p>
        Group Buy Tools is an information website. We may use Google Analytics 4
        or Microsoft Clarity when their environment variables are configured.
        Those tools may process technical and usage information under their own
        policies.
      </p>
      <p>
        We do not ask visitors to create accounts or upload software
        credentials. Affiliate destinations are operated by third parties.
        Review their privacy notices before using them.
      </p>
    </TrustPage>
  );
}
