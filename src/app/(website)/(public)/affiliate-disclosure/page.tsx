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
      lastReviewed="September 21, 2026"
    >
      <p>
        Some links on Group Buy Tools are affiliate links. If you click a
        tracked link and later purchase from the destination, the provider or
        network may pay us a commission. The price you see at the destination
        does not increase because of that commission.
      </p>
      <h2>Where commercial links appear</h2>
      <p>
        Commercial calls to action are labeled with wording such as “Open SpyBox
        Offer” or “Claim 10% off.” Links to official pricing and product sources
        are kept separate from sponsored destinations where possible. A source
        link is evidence for a claim; an affiliate link is a way to visit a
        commercial destination.
      </p>
      <h2>What commissions do not mean</h2>
      <ul>
        <li>A commission does not guarantee that a provider is official.</li>
        <li>
          It does not guarantee a price, feature, refund or account outcome.
        </li>
        <li>
          It does not replace the limitations, verification date or source note
          on a page.
        </li>
      </ul>
      <h2>How to make a decision</h2>
      <p>
        Read the workflow fit, access model and limitations first. Then compare
        the current provider terms and checkout details yourself. If a page
        contains an uncertainty, treat the provider&apos;s current terms as the
        final reference.
      </p>
      <h2>Questions about a link</h2>
      <p>
        For questions about a commercial relationship or a disclosure on a
        specific page, email{" "}
        <a
          href="mailto:hello@group-buy-tools.com"
          className="font-bold text-indigo-800 underline"
        >
          hello@group-buy-tools.com
        </a>
        .
      </p>
    </TrustPage>
  );
}
