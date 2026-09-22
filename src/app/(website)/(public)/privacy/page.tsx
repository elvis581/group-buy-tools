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
      lastReviewed="September 21, 2026"
    >
      <p>
        This policy describes the information that may be processed when you
        visit Group Buy Tools, an information website for software access and
        tool comparisons. It applies to pages served from this site and does not
        control the practices of linked providers.
      </p>
      <h2>Information you provide</h2>
      <p>
        The public site does not ask you to create an account or upload software
        credentials. If a newsletter signup is enabled, the email address you
        submit is sent to the configured email service to manage that
        subscription. Do not submit passwords, API keys or confidential provider
        data through a contact or signup form.
      </p>
      <h2>Analytics and technical information</h2>
      <p>
        Google Analytics 4 or Microsoft Clarity may be loaded only when the
        corresponding site configuration is present. Those services can process
        technical, device and usage information under their own privacy
        policies. The hosting environment may also process information needed to
        deliver, secure and troubleshoot the site.
      </p>
      <h2>How information is used</h2>
      <ul>
        <li>To deliver pages, links and search results.</li>
        <li>To understand aggregate site usage when analytics is enabled.</li>
        <li>To respond to messages or manage an enabled newsletter signup.</li>
        <li>To protect the service from abuse and technical failures.</li>
      </ul>
      <h2>Third-party destinations</h2>
      <p>
        Official product pages, affiliate destinations, analytics services and
        email providers operate under their own terms and privacy notices. Once
        you leave this site, review the destination&apos;s policy before
        entering payment details, account credentials or other personal
        information.
      </p>
      <h2>Your questions and updates</h2>
      <p>
        We do not use this page to promise a fixed retention period for data
        handled by hosting, analytics or email providers. For a privacy question
        about this site, email{" "}
        <a
          href="mailto:hello@group-buy-tools.com"
          className="font-bold text-indigo-800 underline"
        >
          hello@group-buy-tools.com
        </a>
        . We may update this page when the site&apos;s data practices change.
      </p>
    </TrustPage>
  );
}
