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
      lastReviewed="September 21, 2026"
    >
      <p>
        By using Group Buy Tools, you agree to use the site for lawful research
        and comparison. Group Buy Tools provides general information; it does
        not directly sell shared software accounts or act as the provider of a
        product listed on the site.
      </p>
      <h2>Information and advice</h2>
      <p>
        Pages may contain errors, omissions or information that becomes outdated
        after publication. Nothing on the site is legal, financial, tax,
        security or professional advice. Verify pricing, features, eligibility,
        account ownership, privacy terms, cancellation rules and support with
        the relevant provider before making a purchase or relying on a workflow.
      </p>
      <h2>Third-party providers and links</h2>
      <p>
        A provider listing, official source link and affiliate destination are
        separate relationships. We do not control a provider&apos;s service,
        availability, account policies, refund decision, data handling or
        support response. External links are governed by the destination&apos;s
        own terms and privacy notice.
      </p>
      <h2>Acceptable use</h2>
      <p>
        Do not use the site to misrepresent an affiliation, interfere with its
        operation, scrape it in a way that causes harm, or use a listed tool in
        violation of that provider&apos;s terms. You remain responsible for your
        account choices, purchases, credentials and any information you submit
        to an external service.
      </p>
      <h2>Content and availability</h2>
      <p>
        Site content, links and layouts may change without notice. We may
        correct, remove or reorganize a page when a source or provider term
        changes. We do not promise uninterrupted availability or that every
        linked offer will remain open.
      </p>
      <h2>Questions</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a
          href="mailto:hello@group-buy-tools.com"
          className="font-bold text-indigo-800 underline"
        >
          hello@group-buy-tools.com
        </a>
        . If a destination provider has its own dispute or refund process,
        contact that provider directly.
      </p>
    </TrustPage>
  );
}
