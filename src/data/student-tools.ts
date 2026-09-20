import { firstBatch } from "@/config/release";

export type OfferType =
  | "completely-free"
  | "free-plan"
  | "free-credits"
  | "free-trial"
  | "open-source"
  | "student-only"
  | "education-discount"
  | "paid";

export type ToolStatus =
  | "active"
  | "changed"
  | "expiring-soon"
  | "expired"
  | "temporarily-unavailable"
  | "country-restricted"
  | "verification-required";

export type ToolFaq = { question: string; answer: string };
export type OfficialSource = { label: string; url: string };
export type AccessGuide = {
  pageTitle: string;
  label: string;
  eligibility: string;
  claimSteps: string[];
  included: string;
  afterAccess: string;
  faq: ToolFaq[];
};
export type StudentTool = {
  id: string;
  slug: string;
  name: string;
  primaryKeyword: string;
  accessGuide: AccessGuide;
  secondaryKeywords?: string[];
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  offerType: OfferType;
  badges: string[];
  officialUrl: string;
  ctaUrl?: string;
  affiliateUrl?: string;
  affiliateDisclosure: string;
  supportedCountries: string;
  platforms: string[];
  freePlanSummary: string;
  freeLimit: string;
  resetFrequency: string;
  creditCardRequired: string;
  studentVerificationRequired: string;
  watermark: string;
  exportLimits: string;
  commercialUse: string;
  paidPlanStartingPrice: string | null;
  studentUseCases: string[];
  claimSteps: string[];
  freePlanLimitations: string[];
  pros: string[];
  cons: string[];
  alternativeToolSlugs: string[];
  faq: ToolFaq[];
  officialSources: OfficialSource[];
  lastVerifiedAt: string;
  nextCheckAt: string;
  expiresAt: string | null;
  status: ToolStatus;
  changelog: string[];
};

const checked = "2026-08-31";

export const categories = [
  {
    slug: "ai-and-study",
    name: "AI & Study",
    primaryKeyword: "AI tools for students",
    description: "Research, explain, summarize and organize coursework.",
  },
  {
    slug: "writing-and-research",
    name: "Writing & Research",
    primaryKeyword: "writing tools for students",
    description: "Draft, edit, cite and collaborate on academic work.",
  },
  {
    slug: "design-and-creative",
    name: "Design & Creative",
    primaryKeyword: "design tools for students",
    description: "Create visuals, prototypes, media and 3D projects.",
  },
  {
    slug: "coding-and-developer",
    name: "Coding & Developer",
    primaryKeyword: "coding tools for students",
    description: "Build, learn and ship software with student-friendly tools.",
  },
] as const;

const source = (label: string, url: string): OfficialSource => ({ label, url });

const accessGuides: Record<string, AccessGuide> = {
  chatgpt: {
    pageTitle: "ChatGPT Free for Students: Free Plan and 4-Month Plus Offer",
    label: "student discount",
    eligibility:
      "The offer is for eligible students at degree-granting colleges and universities in the United States. OpenAI requires SheerID verification, a valid payment method and a claim by October 31, 2026; confirm the live offer page before starting.",
    claimSteps: [
      "Open the official ChatGPT student offer page.",
      "Confirm that you attend an eligible U.S. college or university and claim by October 31, 2026.",
      "Complete the SheerID student verification flow.",
      "Add a valid payment method and review the renewal terms before accepting.",
    ],
    included:
      "Eligible U.S. college and university students can receive four free monthly billing cycles of ChatGPT Plus through the current official promotion. This ChatGPT student discount is time-sensitive, and Plus features, account requirements and exclusions remain subject to OpenAI's terms.",
    afterAccess:
      "After the four free monthly billing cycles, Plus renews at $20 per month unless you cancel, according to OpenAI's current offer terms. Review the renewal terms before the promotion ends. The standard Free plan remains a separate option with its own changing limits.",
    faq: [],
  },
  "google-gemini": {
    pageTitle: "Google Gemini Free for Students: Features, Limits and Access",
    label: "free plan",
    eligibility:
      "Standard Google Gemini access does not generally require student verification. A Google account, supported country and compatible feature availability may still be required, so check the live product and plan pages for your region.",
    claimSteps: [
      "Open Google Gemini from the official product page.",
      "Sign in with a Google account if the service asks you to.",
      "Check which models and features are available on the free experience.",
      "Use the current limits as a starting point rather than a guaranteed quota.",
    ],
    included:
      "The Google Gemini free plan provides access to the available assistant experience for questions, explanations and drafting. The exact model mix, integrations and usage limits can vary by account and region.",
    afterAccess:
      "When the free experience no longer covers a real workflow, compare the current Google AI plan options before upgrading. Do not assume a student email unlocks paid features or that a free quota stays fixed.",
    faq: [
      {
        question: "What can students use the Google Gemini free plan for?",
        answer:
          "It can be a starting point for explanations, brainstorming and study planning. Verify important facts with course materials and check the product page for the features enabled on your account.",
      },
      {
        question: "Are Google Gemini free plan limits the same everywhere?",
        answer:
          "No. Google can vary features and access by region, account and model. Treat the limits shown in your account and official plan documentation as the current source.",
      },
    ],
  },
  claude: {
    pageTitle: "Claude Free for Students: Access, Limits and Best Uses",
    label: "free plan",
    eligibility:
      "The standard Claude free plan is available only in regions and account setups supported by Anthropic. It is not a student-only license, so a student email is not the basis for access.",
    claimSteps: [
      "Open Claude from Anthropic's official product page.",
      "Create or sign in to an account if required in your region.",
      "Select the free experience shown in your account.",
      "Test the message and model limits before using it for a deadline-sensitive project.",
    ],
    included:
      "The Claude free plan is useful for occasional explanations, outlining and draft review. The available model, message access and fair-use limits are controlled by Anthropic's current product rules.",
    afterAccess:
      "If free usage becomes the bottleneck, review the current Claude pricing and usage terms. Keep a local copy of important work because account access and limits can change.",
    faq: [
      {
        question: "Does the Claude free plan need a student email?",
        answer:
          "No student verification is normally the basis of the standard free plan. Availability still depends on Anthropic's supported regions and current account requirements.",
      },
      {
        question: "Is Claude's free plan suitable for a complete assignment?",
        answer:
          "It can help with explanations and early drafting, but it is not a source of record. Follow course AI rules and verify every factual or cited claim yourself.",
      },
    ],
  },
  perplexity: {
    pageTitle: "Perplexity Free for Students: Research Access and Limits",
    label: "free plan",
    eligibility:
      "The standard Perplexity free experience is not a student-only offer. Students generally need a supported account and region, while particular models, searches and features may depend on the current plan.",
    claimSteps: [
      "Open Perplexity from the official product page.",
      "Sign in if the current service asks for an account.",
      "Run a focused research question instead of treating the answer as a final citation.",
      "Open the linked sources and record the primary material you actually use.",
    ],
    included:
      "The Perplexity free plan offers a search-style research starting point with AI answers and visible source links. It does not guarantee that every model, citation or answer is complete or correct.",
    afterAccess:
      "If your research workflow reaches a free-plan limit, check the current Pro details and compare them with your library resources. Keep source verification separate from any plan decision.",
    faq: [
      {
        question: "Can students cite Perplexity answers directly?",
        answer:
          "Use the linked primary or authoritative sources instead. Perplexity can help discover material, but your institution's citation rules and the original source control the final reference.",
      },
      {
        question: "Does the Perplexity free plan include every model?",
        answer:
          "No guarantee should be assumed. Model access and search limits can vary by plan, account and time; check the official plan information before relying on a feature.",
      },
    ],
  },
  notebooklm: {
    pageTitle: "NotebookLM Free for Students: Study Guide and Limits",
    label: "free plan",
    eligibility:
      "NotebookLM access depends on Google's supported accounts, regions and current product availability. It is a source-based workspace, not a student verification program, so students should confirm access with the live product page.",
    claimSteps: [
      "Open NotebookLM from Google's official product page.",
      "Sign in with a Google account if prompted.",
      "Create a notebook for one course or research question.",
      "Add sources you are allowed to use and compare every generated answer with them.",
    ],
    included:
      "The NotebookLM free plan is designed to help organize and question the sources you provide. It can support summaries, study questions and source comparison, but the uploaded material remains the authority.",
    afterAccess:
      "Before a large course project, review the current notebook, source and query limits and keep the original documents separately. A plan change should solve a known limit, not replace reading or source checking.",
    faq: [
      {
        question: "Does the NotebookLM free plan work without my own sources?",
        answer:
          "Its strongest use case is working from sources you add. Without reliable source material, the output is less useful for coursework and should not be treated as an independent authority.",
      },
      {
        question: "Does NotebookLM verify that a student owns a source?",
        answer:
          "Students remain responsible for permission, privacy and course rules when adding material. Review Google's current product terms before uploading sensitive or restricted documents.",
      },
    ],
  },
  grammarly: {
    pageTitle: "Grammarly Free for Students: Writing Features and Limits",
    label: "free plan",
    eligibility:
      "The standard Grammarly free plan is a general product rather than a student-only benefit. Students can start with the supported account or editor, but feature availability may vary by surface and region.",
    claimSteps: [
      "Open Grammarly's official product page.",
      "Create an account or use a supported editor integration.",
      "Check which suggestions are included before pasting in a full assignment.",
      "Review every suggestion against your intended meaning and course rules.",
    ],
    included:
      "The Grammarly free plan provides basic writing feedback for everyday drafts and early revisions. Advanced rewriting, tone and other capabilities may be separated into paid plans or product surfaces.",
    afterAccess:
      "If a paid prompt appears, decide whether the specific feature solves a genuine editing problem. Keep authorship, disclosure and institutional AI policy decisions separate from Grammarly's product access.",
    faq: [
      {
        question: "Is Grammarly's free plan an academic writing checker?",
        answer:
          "It is a writing aid, not an academic authority or plagiarism decision. Check your institution's policy and use your own judgment about grammar, citations and authorship.",
      },
      {
        question: "Does the Grammarly free plan include every writing feature?",
        answer:
          "No. The free experience focuses on the features Grammarly currently includes in its free plan; review the official plans page for the current boundary.",
      },
    ],
  },
  quillbot: {
    pageTitle: "QuillBot Free for Students: Paraphrasing Limits and Safe Use",
    label: "free plan",
    eligibility:
      "QuillBot's standard free experience is not based on student verification. Access, supported tools and limits depend on the current product and account experience shown in your region.",
    claimSteps: [
      "Open QuillBot's official product page.",
      "Choose one tool, such as grammar, summarizing or paraphrasing.",
      "Compare the result with your original text and preserve the source.",
      "Check the current free limit before planning a large document workflow.",
    ],
    included:
      "The QuillBot free plan can provide a limited starting point for wording alternatives, summaries and grammar review. It does not turn generated wording into original authorship or remove the need for attribution.",
    afterAccess:
      "When a tool limit blocks your workflow, review the current plans and your institution's academic-integrity rules. Never use a paid upgrade as a reason to submit paraphrased material without proper credit.",
    faq: [
      {
        question: "Can the QuillBot free plan paraphrase a whole paper?",
        answer:
          "Do not assume unlimited document access. Limits vary by tool and plan, and a paper should be revised for meaning and integrity by its author rather than passed through automatically.",
      },
      {
        question: "Does QuillBot free plan output need citation?",
        answer:
          "The tool does not replace attribution to the original ideas or sources. Keep the source, follow course rules and disclose assistance when your institution requires it.",
      },
    ],
  },
  zotero: {
    pageTitle: "Zotero Free for Students: Software, Citations and Storage",
    label: "free software",
    eligibility:
      "Zotero's desktop application is available without student verification. Students can use the local library workflow without treating cloud storage or syncing as unlimited free capacity.",
    claimSteps: [
      "Download Zotero from the official website.",
      "Install the browser connector if it fits your research workflow.",
      "Create collections and save sources with enough bibliographic detail to verify later.",
      "Create an account only when you need syncing or online storage.",
    ],
    included:
      "Zotero free software provides a local reference library, collection tools and citation workflows. Online file storage and syncing are separate from the free desktop application and have their own limits.",
    afterAccess:
      "Before migrating a large library, check the current storage quota and keep a backup or export. Review generated citations against the style guide required by your department.",
    faq: [
      {
        question: "Does Zotero free software include unlimited cloud storage?",
        answer:
          "No. The desktop application is free, while online storage has a quota and separate paid options. Check Zotero's current storage page for the exact boundary.",
      },
      {
        question: "Does Zotero automatically make citations correct?",
        answer:
          "No. Metadata, editions, page numbers and style output still need review against the source and your institution's citation requirements.",
      },
    ],
  },
  mendeley: {
    pageTitle:
      "Mendeley Free for Students: Reference Manager Access and Limits",
    label: "free plan",
    eligibility:
      "The standard Mendeley Reference Manager is not generally a student-verification offer. Account, download and regional requirements should be checked on the current official product pages.",
    claimSteps: [
      "Open Mendeley's official product page.",
      "Download the current Reference Manager when a local app is needed.",
      "Create a test library and review the sync behavior before importing everything.",
      "Check storage and collaboration limits before using it as your only archive.",
    ],
    included:
      "The Mendeley free plan provides a starting reference-management workflow for organizing papers, PDFs and bibliographic records. Cloud storage, syncing and collaboration are subject to the current account plan.",
    afterAccess:
      "If the library approaches a storage or collaboration limit, export or back up the records before changing plans. Check metadata manually because imported references can contain errors.",
    faq: [
      {
        question: "Does the Mendeley free plan require a university email?",
        answer:
          "The standard reference manager is not generally based on student verification, but current account requirements can change. Use the official site as the final authority.",
      },
      {
        question: "Is Mendeley free plan storage unlimited?",
        answer:
          "Do not assume that it is. Storage and collaboration limits belong to the current plan and should be checked before moving a large PDF library.",
      },
    ],
  },
  overleaf: {
    pageTitle:
      "Overleaf Free for Students: LaTeX Access and Collaboration Limits",
    label: "free plan",
    eligibility:
      "The standard Overleaf free plan is available through an account and is not normally based on student verification. Institution-linked features or discounts are separate from the general free starting plan.",
    claimSteps: [
      "Open Overleaf's official product page.",
      "Create an account and start a small test project.",
      "Choose a blank project or an official template and compile it.",
      "Check collaborator, history and project limits before inviting a full team.",
    ],
    included:
      "The Overleaf free plan lets students start browser-based LaTeX projects and use the core writing workflow. Project size, collaboration, history and other capabilities depend on the current plan boundary.",
    afterAccess:
      "When a team or project reaches a limit, review the current free and premium terms and keep a downloadable copy of the source files. A paid plan is optional and should solve a specific collaboration need.",
    faq: [
      {
        question: "Can students start a paper on the Overleaf free plan?",
        answer:
          "Yes, the free plan is a reasonable starting point for a LaTeX project. Check current project and collaboration limits before making it the only location for a deadline-sensitive paper.",
      },
      {
        question: "Does Overleaf free plan mean unlimited collaboration?",
        answer:
          "No. Collaboration and history features have plan-specific limits. Review the current official plan documentation before inviting a large group.",
      },
    ],
  },
  canva: {
    pageTitle:
      "Canva Free for Students: Templates, Assets and Education Access",
    label: "free plan",
    eligibility:
      "The standard Canva free plan does not require student verification. Canva for Education and paid Pro access are separate programs with their own eligibility and account rules.",
    claimSteps: [
      "Open Canva's official product page.",
      "Create or sign in to an account.",
      "Filter for free templates and assets while building the design.",
      "Check the license and export conditions for every important element.",
    ],
    included:
      "The Canva free plan provides a low-friction way to make presentations, posters and project graphics with the free templates and assets currently identified by Canva. Pro assets and education access are not automatically included.",
    afterAccess:
      "If a design depends on a paid element, replace it with a free asset or review the current plan and license terms. Keep the source design and confirm that the final use fits your assignment or publication context.",
    faq: [
      {
        question: "Does every Canva template cost money?",
        answer:
          "No, but free and paid content are mixed. Check the asset labels in the current editor rather than assuming a template or element is included in the free plan.",
      },
      {
        question: "Is Canva for Education the same as the Canva free plan?",
        answer:
          "No. Education access has separate eligibility and institutional rules. The standard free plan should not be presented as automatic Pro access for every student.",
      },
    ],
  },
  figma: {
    pageTitle: "Figma Free for Students: Education Eligibility and Access",
    label: "education plan",
    eligibility:
      "Figma's Starter plan can be used without student verification, while Figma for Education has separate eligibility rules for qualifying students and educators. Confirm the current institution and account requirements before relying on education access.",
    claimSteps: [
      "Open Figma's official product or education page.",
      "Choose the Starter workflow or review the education application path.",
      "Create a small file and test sharing, version history and prototype access.",
      "Use the plan that matches your eligibility and the current project needs.",
    ],
    included:
      "The Figma education plan can provide eligible students with education access under Figma's current terms; the Starter plan is a separate free starting point. File, collaboration and team features depend on the plan attached to the account.",
    afterAccess:
      "Before a group project grows, check the current education renewal and team rules. If you are not eligible, use the Starter plan or another tool rather than claiming education access without confirmation.",
    faq: [
      {
        question: "Can any student claim the Figma education plan?",
        answer:
          "Not automatically. Eligibility and verification are controlled by Figma's current education rules. Students can still begin with the separate Starter plan when available.",
      },
      {
        question:
          "What is the difference between Figma Starter and education access?",
        answer:
          "Starter is the general free plan, while education access has separate student or educator eligibility. Compare the current pricing and education pages before choosing a long-term team workflow.",
      },
    ],
  },
  "adobe-express": {
    pageTitle: "Adobe Express Free for Students: Features and Education Access",
    label: "free plan",
    eligibility:
      "Adobe Express has a standard free starting plan that is separate from Adobe education pricing and premium access. Students should use the current account and region experience to confirm which features are enabled.",
    claimSteps: [
      "Open Adobe Express from Adobe's official product page.",
      "Sign in or create an Adobe account if prompted.",
      "Choose free templates and inspect asset labels before editing.",
      "Review the export and license terms for the intended school or public use.",
    ],
    included:
      "The Adobe Express free plan supports basic template-based graphics, presentations and documents. Premium templates, assets and some generative capabilities can remain outside the free plan.",
    afterAccess:
      "If a project depends on premium content, check the current plans and education terms before upgrading. Preserve an editable copy and avoid assuming a school assignment grants commercial rights to every asset.",
    faq: [
      {
        question: "Does Adobe Express free plan include premium assets?",
        answer:
          "No assumption is safe. Adobe labels free and premium content in the current experience; check the asset and plan terms before using it in a final project.",
      },
      {
        question: "Is Adobe education access automatic for students?",
        answer:
          "No. Education offers and discounts have their own eligibility rules and should not be conflated with the standard Adobe Express free plan.",
      },
    ],
  },
  photopea: {
    pageTitle: "Photopea Free for Students: Editor Guide and Limits",
    label: "free editor",
    eligibility:
      "Photopea's basic browser editor can be opened without a student account in the normal workflow. Service behavior, browser support and any optional account or ad-related features should be checked on the live product page.",
    claimSteps: [
      "Open Photopea in a supported browser.",
      "Open a source file or create a new document.",
      "Make a small edit first and confirm that layers and formats behave as expected.",
      "Export the result and keep the original file locally.",
    ],
    included:
      "The Photopea free editor is a browser-based starting point for raster editing and common design-file work. It avoids a desktop subscription, but performance and supported behavior still depend on the browser, device and current service.",
    afterAccess:
      "For large or important work, keep local backups and confirm the exported file in the destination application. Review third-party asset licenses separately from Photopea's editor access.",
    faq: [
      {
        question: "Does Photopea free editor require installation?",
        answer:
          "The core workflow runs in a browser, so students can start without installing a large desktop editor. Browser performance and service behavior can still affect large files.",
      },
      {
        question: "Can Photopea make third-party images free to use?",
        answer:
          "No. Editing access does not change copyright or asset licenses. Check the rights for every image, font and design element used in the final work.",
      },
    ],
  },
  blender: {
    pageTitle: "Blender Free for Students: 3D Features, License and Setup",
    label: "free software",
    eligibility:
      "Blender is free and open source for everyone, so student verification is not required for download. The application license and any third-party models, textures or fonts used in a project should be considered separately.",
    claimSteps: [
      "Download Blender from the official website.",
      "Install the version for your operating system.",
      "Start with a small modeling or animation exercise.",
      "Read the official manual and check the license of any external asset you import.",
    ],
    included:
      "Blender free software provides a full local 3D creation application for modeling, animation, rendering and related work. There is no student subscription gate, but your device, render time and project assets affect the practical workflow.",
    afterAccess:
      "Keep project files and asset licenses organized as the work grows. Blender itself does not require a paid plan, while hardware upgrades, render services and third-party assets can introduce separate costs or terms.",
    faq: [
      {
        question: "Is Blender free software for commercial student work?",
        answer:
          "Blender is free and open source, but commercial use of a project also involves the licenses of imported assets, fonts and plugins. Review the official license and each asset's terms.",
      },
      {
        question: "Does Blender free software need a student email?",
        answer:
          "No. Student verification is not required to download the software. Students should still use the official download and read the current license information.",
      },
    ],
  },
  "github-student-developer-pack": {
    pageTitle:
      "GitHub Free for Students: Student Developer Pack and Eligibility",
    label: "student developer pack",
    eligibility:
      "The GitHub Student Developer Pack is intended for students who meet GitHub Education's current eligibility and verification rules. Institution evidence, age or region requirements and the available partner benefits must be confirmed on the live pack page.",
    claimSteps: [
      "Open GitHub Education and review the current student requirements.",
      "Sign in with a GitHub account and submit the requested student evidence.",
      "Wait for the education decision before relying on a partner benefit.",
      "Open each partner's terms and claim only the benefits currently shown in your account.",
    ],
    included:
      "The GitHub Student Developer Pack is a bundle of current partner benefits, not one permanent software subscription. It can help students assemble a coding, deployment and learning environment, but each partner controls its own offer.",
    afterAccess:
      "Track benefit expiry dates and partner terms inside GitHub Education. When a benefit ends, review the partner's free tier or another tool instead of presenting an old pack benefit as guaranteed access.",
    faq: [
      {
        question:
          "Does the GitHub Student Developer Pack include every partner forever?",
        answer:
          "No. Partners, terms, regions and benefit periods can change. Confirm the current item in GitHub Education before planning a project around it.",
      },
      {
        question:
          "What evidence is needed for the GitHub Student Developer Pack?",
        answer:
          "GitHub Education decides what evidence is acceptable under its current rules. Follow the live application flow rather than assuming a student email alone guarantees approval.",
      },
      {
        question: "Is GitHub free for students?",
        answer:
          "GitHub free for students access usually means applying for the Student Developer Pack, where eligibility and partner benefits are reviewed under GitHub Education's current rules.",
      },
    ],
  },
  jetbrains: {
    pageTitle: "JetBrains Free for Students: Student License and Eligibility",
    label: "student license",
    eligibility:
      "JetBrains educational access is for eligible students and teachers who can meet the current education verification rules. Approval, duration, supported institutions and permitted use are controlled by JetBrains rather than guaranteed by this listing.",
    claimSteps: [
      "Open JetBrains Education from the official website.",
      "Choose the student application and read the current eligibility terms.",
      "Complete the requested verification using an accepted method.",
      "Install the tools covered by the approved educational license and note its renewal date.",
    ],
    included:
      "The JetBrains student license can provide eligible students with educational access to JetBrains developer tools for the period and use covered by the approved license. It is not a universal commercial license or an unverified free plan.",
    afterAccess:
      "Renew through JetBrains Education while you remain eligible and review the permitted-use terms before using the tools for paid work. A commercial project may require a separate commercial license.",
    faq: [
      {
        question:
          "Does the JetBrains student license cover every JetBrains product?",
        answer:
          "Coverage follows the license and education terms shown by JetBrains. Check the current application and product details instead of assuming every product or use case is included.",
      },
      {
        question:
          "Can a student use a JetBrains student license for paid work?",
        answer:
          "Do not assume so. Educational licenses have permitted-use rules; read JetBrains' current terms and obtain a commercial license when the project requires one.",
      },
    ],
  },
  "visual-studio-code": {
    pageTitle: "Visual Studio Code Free for Students: Extensions and Setup",
    label: "free editor",
    eligibility:
      "Visual Studio Code can be downloaded without student verification. The editor is separate from extensions, hosted services and AI products that may have their own accounts, prices or licenses.",
    claimSteps: [
      "Download Visual Studio Code from Microsoft's official site.",
      "Install it for your operating system and open a small project.",
      "Add extensions only after checking their publisher, permissions and terms.",
      "Keep source files in a versioned folder or repository you control.",
    ],
    included:
      "The Visual Studio Code free editor provides a local workspace for many programming languages and file types. This Visual Studio Code free editor listing treats extensions and connected services separately because they are not automatically covered by the editor license.",
    afterAccess:
      "When a workflow asks for a hosted, AI or commercial extension, evaluate that service separately. The local editor can remain useful even when an extension's free quota or account access changes.",
    faq: [
      {
        question:
          "Does Visual Studio Code free editor include paid AI services?",
        answer:
          "No. The editor and its extensions or connected services have separate terms. Check the publisher and account requirements for any AI or cloud feature you add.",
      },
      {
        question:
          "Can students use Visual Studio Code without a Microsoft account?",
        answer:
          "The editor can be downloaded and used locally without student verification. Some extensions, sync features or connected services can ask for their own account.",
      },
    ],
  },
  replit: {
    pageTitle: "Replit Free for Students: Workspace and Compute Limits",
    label: "free plan",
    eligibility:
      "The standard Replit free plan is not a student-only program. Students need a supported account and should confirm current regional access, workspace limits and product terms before starting a deadline-sensitive project.",
    claimSteps: [
      "Open Replit from the official product page.",
      "Create an account and start a small project.",
      "Run the project and inspect the current compute, storage and sharing limits.",
      "Export or keep a copy of important code outside the workspace.",
    ],
    included:
      "The Replit free plan gives students a low-setup browser workspace for learning, prototypes and small demos. Compute, storage, collaboration and running behavior remain subject to the current plan limits.",
    afterAccess:
      "If a project needs more resources or a different use policy, review the current paid plans and keep a portable copy of the code. Do not present a free workspace as guaranteed always-on or production capacity.",
    faq: [
      {
        question: "Is the Replit free plan enough for a class demo?",
        answer:
          "It can be a practical starting point for a small demo, but test the current resource and sharing limits early. Keep the code available outside Replit before the presentation.",
      },
      {
        question: "Does Replit free plan provide unlimited hosting?",
        answer:
          "No. Compute, deployment and availability depend on the current plan and usage rules. Check the official pricing page before treating it as hosting for a continuing service.",
      },
    ],
  },
  vercel: {
    pageTitle: "Vercel Free for Students: Hobby Access and Usage Rules",
    label: "free plan",
    eligibility:
      "The Vercel Hobby plan is positioned for personal, non-commercial projects. Students can use it for learning and prototypes when their project fits the current terms, but a student identity alone does not change the plan's usage policy.",
    claimSteps: [
      "Open Vercel's official product and pricing pages.",
      "Create an account and connect a project you control.",
      "Review the current Hobby limits before using the project publicly.",
      "Track usage and commercial requirements as the project grows.",
    ],
    included:
      "The Vercel free plan provides the Hobby starting point for personal web projects, with a workflow built around connected source code and previews. Usage, bandwidth, functions and account terms define what fits inside the plan.",
    afterAccess:
      "When traffic, usage or commercial activity exceeds the Hobby boundary, review Vercel's current plan terms and alternatives before continuing. Treat the plan decision separately from any domain or deployment setup decision.",
    faq: [
      {
        question:
          "Is Vercel's free plan automatically available because I am a student?",
        answer:
          "The Hobby plan is a general personal, non-commercial plan, not a student verification offer. Your project still has to fit Vercel's current terms.",
      },
      {
        question: "Can a student use the Vercel free plan for a business site?",
        answer:
          "Do not assume that is allowed. Review the current Hobby terms and move to an appropriate plan or provider when the project has commercial use or higher operational needs.",
      },
      {
        question: "Is Vercel free for students?",
        answer:
          "Vercel free for students access refers to the Hobby plan when a student's personal project fits its current non-commercial terms; student status alone does not create a separate plan.",
      },
    ],
  },
};

export const tools: StudentTool[] = (
  [
    {
      id: "tool-chatgpt",
      slug: "chatgpt",
      name: "ChatGPT",
      primaryKeyword: "ChatGPT free for students",
      accessGuide: accessGuides.chatgpt,
      secondaryKeywords: [
        "chatgpt free for students",
        "chatgpt plus student discount",
        "chatgpt student plan",
        "chatgpt student offer",
        "chatgpt 4 months free",
        "is chatgpt plus free for students",
        "how to get chatgpt student discount",
        "chatgpt student discount eligibility",
        "chatgpt free plan",
        "chatgpt free plan limits",
        "chatgpt plus price for students",
        "chatgpt student verification",
        "chatgpt sheerid verification",
      ],
      tagline: "AI help for studying, writing and brainstorming.",
      shortDescription:
        "Ask questions, explain difficult topics and develop first drafts.",
      fullDescription:
        "ChatGPT is a general-purpose AI assistant that can help students explore ideas, understand concepts and turn a rough question into a workable starting point. Eligible students can claim the four-month Plus promotion after completing the official verification and payment steps.",
      category: "ai-and-study",
      offerType: "student-only",
      badges: ["Student Offer", "Verification Required", "Browser Based"],
      officialUrl: "https://chatgpt.com/",
      ctaUrl: "https://chatgpt.com/students/2026/",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official student offer page.",
      supportedCountries:
        "Current student promotion: eligible students at degree-granting colleges and universities in the United States.",
      platforms: ["Browser", "iOS", "Android", "Desktop"],
      freePlanSummary:
        "Eligible U.S. students can claim four free monthly billing cycles of ChatGPT Plus under the current offer.",
      freeLimit:
        "Four free monthly billing cycles of Plus; standard ChatGPT Free limits remain separate.",
      resetFrequency: "Four monthly billing cycles during the promotion",
      creditCardRequired:
        "Yes; a valid payment method is required for the promotion",
      studentVerificationRequired:
        "Yes; SheerID verification for eligible U.S. college and university students",
      watermark: "Not applicable",
      exportLimits: "Not clearly stated",
      commercialUse: "Check OpenAI terms for your use case.",
      paidPlanStartingPrice:
        "$20/month after the four free billing cycles unless canceled",
      studentUseCases: [
        "Explain a lecture topic",
        "Outline an essay",
        "Generate practice questions",
      ],
      claimSteps: [
        "Open the official student offer page.",
        "Confirm that you attend an eligible U.S. college or university and claim by October 31, 2026.",
        "Complete the SheerID student verification flow.",
        "Add a valid payment method and review the renewal terms before accepting.",
      ],
      freePlanLimitations: [
        "The student offer is limited to eligible students and the official promotion period.",
        "The promotion is limited to eligible students at degree-granting colleges and universities in the United States and must be claimed by October 31, 2026.",
        "After four free monthly billing cycles, the current terms state that Plus renews at $20 per month unless canceled.",
      ],
      pros: [
        "Broad study use cases",
        "Easy to access",
        "Useful for first drafts",
      ],
      cons: ["Answers require fact-checking", "Free limits are dynamic"],
      alternativeToolSlugs: [
        "google-gemini",
        "claude",
        "perplexity",
        "notebooklm",
      ],
      faq: [
        {
          question: "How long is the ChatGPT student discount?",
          answer:
            "The current official offer provides four free monthly billing cycles of ChatGPT Plus for eligible U.S. college and university students who complete SheerID verification and claim by October 31, 2026. Check the live claim page for the current terms.",
        },
        {
          question: "Does ChatGPT student verification use SheerID?",
          answer:
            "Yes. OpenAI's current student offer uses SheerID to verify eligible U.S. college and university students. Follow the live provider flow because offer requirements can change.",
        },
        {
          question:
            "Are ChatGPT Free plan limits separate from the student offer?",
          answer:
            "Yes. The standard ChatGPT Free experience has its own changing limits. The four-month Plus promotion is a separate offer for eligible students under the current terms.",
        },
        {
          question: "Is ChatGPT free for students?",
          answer:
            "Eligible U.S. college and university students can currently claim four free monthly billing cycles of ChatGPT Plus after SheerID verification and a valid payment method. After that, the current terms state $20 per month unless canceled; the standard Free plan is separate.",
        },
      ],
      officialSources: [
        source("Official product", "https://chatgpt.com/"),
        source("Official pricing", "https://openai.com/chatgpt/pricing/"),
        source(
          "Student offer details",
          "https://help.openai.com/en/articles/20001493-chatgpt-back-to-school-offer-for-students",
        ),
        source("Claim page", "https://chatgpt.com/students/2026/"),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-10-30",
      expiresAt: null,
      status: "active",
      changelog: [
        "2026-08-31: Reviewed the official product, pricing, student offer and claim links; offer terms remain time-sensitive.",
      ],
    },
    {
      id: "tool-gemini",
      slug: "google-gemini",
      name: "Google Gemini",
      primaryKeyword: "Google Gemini free for students",
      accessGuide: accessGuides["google-gemini"],
      tagline: "Google's AI assistant for questions and study work.",
      shortDescription:
        "Use an AI assistant to explore topics, summarize and draft ideas.",
      fullDescription:
        "Google Gemini helps students ask questions, work through ideas and connect study tasks with Google's ecosystem. Access, model limits and plan features depend on the account and region, so this listing avoids presenting a changing quota as permanent.",
      category: "ai-and-study",
      offerType: "free-plan",
      badges: ["No Student Email Required", "Browser Based", "Mobile App"],
      officialUrl: "https://gemini.google.com/",
      ctaUrl: "https://one.google.com/offer/studentoffer8",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official Google student offer page.",
      supportedCountries: "Availability and features vary by country.",
      platforms: ["Browser", "Android", "iOS"],
      freePlanSummary:
        "Gemini has a free experience with account and usage limits.",
      freeLimit: "Limits vary by model and account.",
      resetFrequency: "Not clearly stated",
      creditCardRequired: "Not clearly stated",
      studentVerificationRequired: "No for standard access",
      watermark: "Not applicable",
      exportLimits: "Not clearly stated",
      commercialUse: "Check Google's current terms.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Break down a reading",
        "Brainstorm a project",
        "Create a revision checklist",
      ],
      claimSteps: [
        "Open Gemini.",
        "Sign in with a Google account if prompted.",
        "Use the available free experience.",
      ],
      freePlanLimitations: [
        "Feature availability varies by region.",
        "Usage limits are subject to change.",
      ],
      pros: [
        "Works with Google's account ecosystem",
        "Fast general-purpose answers",
      ],
      cons: ["Regional availability matters", "AI output needs checking"],
      alternativeToolSlugs: ["chatgpt", "claude", "perplexity", "notebooklm"],
      faq: [
        {
          question: "Does Gemini require a student email?",
          answer:
            "Standard access does not generally require a student email, but eligibility and features can vary by region and account.",
        },
        {
          question: "Is Google Gemini free for students?",
          answer:
            "Google Gemini free for students access is generally based on the standard product experience rather than student verification. Account, region and feature availability still apply.",
        },
      ],
      officialSources: [
        source("Official product", "https://gemini.google.com/"),
        source("Google AI plans", "https://one.google.com/explore-plan/gemini"),
        source(
          "Google student offer",
          "https://one.google.com/offer/studentoffer8",
        ),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-10-30",
      expiresAt: null,
      status: "active",
      changelog: [
        "2026-08-31: Reviewed official product and plan links; limits remain dynamic.",
      ],
    },
    {
      id: "tool-claude",
      slug: "claude",
      name: "Claude",
      primaryKeyword: "Claude free for students",
      accessGuide: accessGuides.claude,
      tagline: "A focused AI assistant for clear explanations and drafts.",
      shortDescription:
        "Work through complex questions, writing and structured ideas.",
      fullDescription:
        "Claude is an AI assistant that can support reading, explanation and drafting tasks. Its free plan is practical for occasional coursework, while message access and model availability are controlled by current usage limits.",
      category: "ai-and-study",
      offerType: "free-plan",
      badges: ["No Student Email Required", "Browser Based"],
      officialUrl: "https://claude.ai/",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official site.",
      supportedCountries: "Supported regions are listed by Anthropic.",
      platforms: ["Browser", "iOS", "Android"],
      freePlanSummary: "A free Claude plan is available with usage limits.",
      freeLimit: "Usage is limited and can vary with demand.",
      resetFrequency: "Not clearly stated",
      creditCardRequired: "Not clearly stated",
      studentVerificationRequired: "No for the standard free plan",
      watermark: "Not applicable",
      exportLimits: "Not clearly stated",
      commercialUse: "Check Anthropic's current terms.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Understand a difficult concept",
        "Improve a study outline",
        "Review a draft for clarity",
      ],
      claimSteps: [
        "Open Claude.",
        "Create an account if required.",
        "Use the free plan shown for your region.",
      ],
      freePlanLimitations: [
        "Free usage is limited.",
        "Access can be affected by demand.",
      ],
      pros: ["Strong long-form explanations", "Clean writing workflow"],
      cons: ["Usage caps are dynamic", "Not a source of record"],
      alternativeToolSlugs: [
        "chatgpt",
        "google-gemini",
        "perplexity",
        "notebooklm",
      ],
      faq: [
        {
          question: "Can students use Claude for free?",
          answer:
            "Anthropic provides a free plan in supported regions. Check the current official pricing page for availability and limits.",
        },
      ],
      officialSources: [
        source("Official product", "https://claude.ai/"),
        source("Official pricing", "https://www.anthropic.com/pricing"),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-10-30",
      expiresAt: null,
      status: "active",
      changelog: ["2026-08-31: Reviewed official product and pricing links."],
    },
    {
      id: "tool-perplexity",
      slug: "perplexity",
      name: "Perplexity",
      primaryKeyword: "Perplexity free for students",
      accessGuide: accessGuides.perplexity,
      tagline: "Search-style answers with source links for research.",
      shortDescription:
        "Start research questions with concise answers and cited web sources.",
      fullDescription:
        "Perplexity combines a search interface with AI-generated answers and links to sources. It can help a student find a research direction quickly, but every citation should be opened and checked before it is used in academic work.",
      category: "ai-and-study",
      offerType: "free-plan",
      badges: ["No Student Email Required", "Browser Based", "Mobile App"],
      officialUrl: "https://www.perplexity.ai/",
      ctaUrl: "https://www.perplexity.ai/education",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official Perplexity Education page.",
      supportedCountries: "Availability varies by region.",
      platforms: ["Browser", "iOS", "Android"],
      freePlanSummary:
        "A free search experience is available with plan-specific limits.",
      freeLimit: "Search and model access limits vary by plan.",
      resetFrequency: "Not clearly stated",
      creditCardRequired: "Not clearly stated",
      studentVerificationRequired: "No for standard access",
      watermark: "Not applicable",
      exportLimits: "Not clearly stated",
      commercialUse: "Check the current Perplexity terms.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Find starting sources",
        "Compare explanations",
        "Build a research question list",
      ],
      claimSteps: [
        "Open Perplexity.",
        "Sign in if prompted.",
        "Run a question and open the cited sources.",
      ],
      freePlanLimitations: [
        "AI answers can contain errors.",
        "Free access does not guarantee every model or feature.",
      ],
      pros: ["Source links are visible", "Fast research starting point"],
      cons: ["Citations still need verification", "Limits can change"],
      alternativeToolSlugs: [
        "chatgpt",
        "google-gemini",
        "claude",
        "notebooklm",
      ],
      faq: [
        {
          question: "Is Perplexity a replacement for library research?",
          answer:
            "No. It is a research starting point. Open the linked sources and follow your institution's citation rules.",
        },
      ],
      officialSources: [
        source("Official product", "https://www.perplexity.ai/"),
        source("Official plan information", "https://www.perplexity.ai/pro"),
        source("Perplexity Education", "https://www.perplexity.ai/education"),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-10-30",
      expiresAt: null,
      status: "active",
      changelog: ["2026-08-31: Reviewed official product and plan links."],
    },
    {
      id: "tool-notebooklm",
      slug: "notebooklm",
      name: "NotebookLM",
      primaryKeyword: "NotebookLM free for students",
      accessGuide: accessGuides.notebooklm,
      tagline: "Study notes and questions grounded in your sources.",
      shortDescription:
        "Upload sources, summarize them and ask questions about your notes.",
      fullDescription:
        "NotebookLM is designed for working with a set of sources rather than asking a general chatbot to remember everything. It can help students turn readings into summaries, questions and study guides, while the original documents remain the authority.",
      category: "ai-and-study",
      offerType: "free-credits",
      badges: ["No Student Email Required", "Browser Based"],
      officialUrl: "https://notebooklm.google.com/",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official site.",
      supportedCountries: "Availability varies by country and account.",
      platforms: ["Browser"],
      freePlanSummary: "NotebookLM offers a free experience with usage limits.",
      freeLimit: "Notebook, source and query limits vary by current plan.",
      resetFrequency: "Not clearly stated",
      creditCardRequired: "Not clearly stated",
      studentVerificationRequired: "No for standard access",
      watermark: "Not applicable",
      exportLimits: "Not clearly stated",
      commercialUse: "Check Google's current terms.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Summarize lecture readings",
        "Create quiz questions",
        "Compare class sources",
      ],
      claimSteps: [
        "Open NotebookLM.",
        "Sign in with a Google account if prompted.",
        "Create a notebook and add your own sources.",
      ],
      freePlanLimitations: [
        "You need source material to get useful results.",
        "Limits and supported formats can change.",
      ],
      pros: ["Source-grounded workflow", "Useful for revision"],
      cons: [
        "Requires careful source selection",
        "Account and region access vary",
      ],
      alternativeToolSlugs: [
        "chatgpt",
        "google-gemini",
        "perplexity",
        "zotero",
      ],
      faq: [
        {
          question: "Does NotebookLM replace reading the source?",
          answer:
            "No. It can help organize and question your sources, but students should read the original material and verify generated summaries.",
        },
      ],
      officialSources: [
        source("Official product", "https://notebooklm.google.com/"),
        source(
          "Google NotebookLM help",
          "https://support.google.com/notebooklm/",
        ),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-09-14",
      expiresAt: null,
      status: "active",
      changelog: ["2026-08-31: Reviewed official product and help links."],
    },
    {
      id: "tool-grammarly",
      slug: "grammarly",
      name: "Grammarly",
      primaryKeyword: "Grammarly free for students",
      accessGuide: accessGuides.grammarly,
      tagline: "Writing feedback for clearer everyday drafts.",
      shortDescription:
        "Catch basic writing issues and improve clarity as you draft.",
      fullDescription:
        "Grammarly's free offering provides basic writing assistance for students working on emails, notes and early drafts. It is an editing aid, not a substitute for understanding a course's writing or authorship rules.",
      category: "writing-and-research",
      offerType: "free-plan",
      badges: ["No Student Email Required", "Browser Based", "Desktop App"],
      officialUrl: "https://www.grammarly.com/",
      ctaUrl: "https://www.grammarly.com/students",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official Grammarly student page.",
      supportedCountries: "Global product availability may vary.",
      platforms: ["Browser", "Windows", "macOS", "iOS", "Android"],
      freePlanSummary: "The free plan includes basic writing suggestions.",
      freeLimit: "Basic suggestions; advanced features require a paid plan.",
      resetFrequency: "Not applicable",
      creditCardRequired: "Not clearly stated",
      studentVerificationRequired: "No",
      watermark: "Not applicable",
      exportLimits: "Not clearly stated",
      commercialUse: "Check Grammarly's terms for your use case.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Polish an email",
        "Review a first draft",
        "Improve readability",
      ],
      claimSteps: [
        "Open Grammarly.",
        "Create an account or use the supported editor.",
        "Choose the free experience.",
      ],
      freePlanLimitations: [
        "Advanced rewrite and tone features may be paid.",
        "Suggestions need human judgment.",
      ],
      pros: ["Easy to use while drafting", "Works across several surfaces"],
      cons: ["Not an academic source", "Free feature set is limited"],
      alternativeToolSlugs: ["quillbot", "mendeley", "overleaf", "chatgpt"],
      faq: [
        {
          question: "Can Grammarly write an assignment for me?",
          answer:
            "It is best treated as an editing aid. Follow your institution's rules about AI and writing assistance.",
        },
      ],
      officialSources: [
        source("Official product", "https://www.grammarly.com/"),
        source("Official plans", "https://www.grammarly.com/plans"),
        source("Grammarly for students", "https://www.grammarly.com/students"),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-10-30",
      expiresAt: null,
      status: "active",
      changelog: ["2026-08-31: Reviewed official product and plans links."],
    },
    {
      id: "tool-quillbot",
      slug: "quillbot",
      name: "QuillBot",
      primaryKeyword: "QuillBot free for students",
      accessGuide: accessGuides.quillbot,
      tagline: "Writing and paraphrasing support for early drafts.",
      shortDescription:
        "Explore alternative wording, summarize text and check grammar.",
      fullDescription:
        "QuillBot offers writing tools that can help a student explore wording and shorten a draft. Paraphrasing should never be used to disguise copied work; keep the source and follow academic integrity guidance.",
      category: "writing-and-research",
      offerType: "free-plan",
      badges: ["No Student Email Required", "Browser Based"],
      officialUrl: "https://quillbot.com/",
      ctaUrl: "https://quillbot.com/premium/student-discount",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official QuillBot student discount page.",
      supportedCountries: "Availability may vary by region.",
      platforms: ["Browser", "Chrome extension", "iOS"],
      freePlanSummary:
        "Free access is available with limits on selected writing tools.",
      freeLimit: "Limits vary by tool and current plan.",
      resetFrequency: "Not clearly stated",
      creditCardRequired: "Not clearly stated",
      studentVerificationRequired: "No",
      watermark: "Not applicable",
      exportLimits: "Not clearly stated",
      commercialUse: "Check QuillBot's terms.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Try clearer wording",
        "Summarize reading notes",
        "Check a draft's grammar",
      ],
      claimSteps: [
        "Open QuillBot.",
        "Choose a writing tool.",
        "Review the result against your original meaning.",
      ],
      freePlanLimitations: [
        "Free usage is limited.",
        "Paraphrased output still needs attribution where required.",
      ],
      pros: ["Useful for wording alternatives", "Several writing utilities"],
      cons: ["Paraphrasing can change meaning", "Not a citation tool"],
      alternativeToolSlugs: ["grammarly", "overleaf", "zotero", "chatgpt"],
      faq: [
        {
          question: "Is QuillBot safe to use for academic writing?",
          answer:
            "Use it only within your institution's rules. Keep your sources, cite original ideas and do not submit generated text as your own where prohibited.",
        },
      ],
      officialSources: [
        source("Official product", "https://quillbot.com/"),
        source("Official plans", "https://quillbot.com/plans"),
        source(
          "QuillBot student discount",
          "https://quillbot.com/premium/student-discount",
        ),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-10-30",
      expiresAt: null,
      status: "active",
      changelog: ["2026-08-31: Reviewed official product and plans links."],
    },
    {
      id: "tool-zotero",
      slug: "zotero",
      name: "Zotero",
      primaryKeyword: "Zotero free for students",
      accessGuide: accessGuides.zotero,
      tagline: "Open-source reference management for research.",
      shortDescription:
        "Collect sources, organize a library and create citations.",
      fullDescription:
        "Zotero helps students collect bibliographic information, organize research and insert citations in supported writing workflows. The desktop software is free and open source; online storage and syncing have separate limits and plans.",
      category: "writing-and-research",
      offerType: "open-source",
      badges: ["Open Source", "Desktop App", "Browser Based"],
      officialUrl: "https://www.zotero.org/",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official site.",
      supportedCountries: "Global",
      platforms: ["Windows", "macOS", "Linux", "Browser"],
      freePlanSummary: "The Zotero application is free and open source.",
      freeLimit: "Local library use is free; online storage has a quota.",
      resetFrequency: "Not applicable",
      creditCardRequired: "No for the free app",
      studentVerificationRequired: "No",
      watermark: "Not applicable",
      exportLimits:
        "Citation styles and sync depend on supported integrations.",
      commercialUse: "Open-source licensing and service terms apply.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Build a reading library",
        "Insert citations",
        "Organize a dissertation bibliography",
      ],
      claimSteps: [
        "Download Zotero from the official site.",
        "Install the browser connector if needed.",
        "Create an account only if you need syncing.",
      ],
      freePlanLimitations: [
        "Online storage is limited.",
        "Citation output still needs checking.",
      ],
      pros: [
        "Free desktop software",
        "Open-source project",
        "Strong citation workflow",
      ],
      cons: ["Setup takes some learning", "Cloud storage is not unlimited"],
      alternativeToolSlugs: ["mendeley", "overleaf", "quillbot", "notebooklm"],
      faq: [
        {
          question: "Is Zotero free for students?",
          answer:
            "The Zotero software is free and open source. Online storage has its own quota and paid options.",
        },
      ],
      officialSources: [
        source("Official product", "https://www.zotero.org/"),
        source("Official storage plans", "https://www.zotero.org/storage"),
        source(
          "Open-source license",
          "https://www.zotero.org/support/dev/exposing_metadata",
        ),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-11-29",
      expiresAt: null,
      status: "active",
      changelog: ["2026-08-31: Reviewed official product and storage links."],
    },
    {
      id: "tool-mendeley",
      slug: "mendeley",
      name: "Mendeley",
      primaryKeyword: "Mendeley free for students",
      accessGuide: accessGuides.mendeley,
      tagline: "Reference management and PDF organization.",
      shortDescription:
        "Organize research papers, annotate PDFs and manage references.",
      fullDescription:
        "Mendeley Reference Manager gives students a way to organize papers and work with references across a research project. Free account capabilities and storage limits should be checked in the current product documentation before a large library is migrated.",
      category: "writing-and-research",
      offerType: "free-plan",
      badges: ["No Student Email Required", "Desktop App", "Browser Based"],
      officialUrl: "https://www.mendeley.com/",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official site.",
      supportedCountries: "Global availability may vary.",
      platforms: ["Windows", "macOS", "Linux", "Browser"],
      freePlanSummary:
        "Mendeley provides a free reference-management experience.",
      freeLimit: "Storage and collaboration limits depend on the current plan.",
      resetFrequency: "Not applicable",
      creditCardRequired: "Not clearly stated",
      studentVerificationRequired: "No",
      watermark: "Not applicable",
      exportLimits: "Not clearly stated",
      commercialUse: "Check the current service terms.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Organize papers",
        "Annotate a PDF",
        "Create a bibliography",
      ],
      claimSteps: [
        "Open Mendeley.",
        "Download the Reference Manager if needed.",
        "Create a library and review its sync settings.",
      ],
      freePlanLimitations: [
        "Cloud limits may apply.",
        "Reference metadata should be checked for accuracy.",
      ],
      pros: ["Research-focused workflow", "PDF organization"],
      cons: ["Cloud limits need checking", "Service features can change"],
      alternativeToolSlugs: ["zotero", "overleaf", "quillbot", "grammarly"],
      faq: [
        {
          question: "Does Mendeley require a student email?",
          answer:
            "The standard reference manager does not generally require student verification, but current account requirements should be checked on the official site.",
        },
      ],
      officialSources: [
        source("Official product", "https://www.mendeley.com/"),
        source(
          "Official download",
          "https://www.mendeley.com/download-reference-manager/",
        ),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-10-30",
      expiresAt: null,
      status: "active",
      changelog: ["2026-08-31: Reviewed official product and download links."],
    },
    {
      id: "tool-overleaf",
      slug: "overleaf",
      name: "Overleaf",
      primaryKeyword: "Overleaf free for students",
      accessGuide: accessGuides.overleaf,
      tagline: "Collaborative LaTeX writing in the browser.",
      shortDescription:
        "Write papers and reports with templates, citations and collaboration.",
      fullDescription:
        "Overleaf is a browser-based LaTeX editor used for papers, reports and technical documents. Its free plan is enough to start a project, while collaboration, history and project limits depend on the plan currently shown by Overleaf.",
      category: "writing-and-research",
      offerType: "free-plan",
      badges: ["No Student Email Required", "Browser Based"],
      officialUrl: "https://www.overleaf.com/",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official site.",
      supportedCountries: "Global",
      platforms: ["Browser"],
      freePlanSummary: "A free plan is available for starting LaTeX projects.",
      freeLimit: "Project and collaboration limits vary by plan.",
      resetFrequency: "Not applicable",
      creditCardRequired: "Not clearly stated",
      studentVerificationRequired: "No",
      watermark: "Not applicable",
      exportLimits: "Not clearly stated",
      commercialUse: "Check Overleaf's current terms.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Write a lab report",
        "Collaborate on a paper",
        "Use a conference template",
      ],
      claimSteps: [
        "Open Overleaf.",
        "Create an account.",
        "Start from a blank project or official template.",
      ],
      freePlanLimitations: [
        "Free collaboration is limited.",
        "LaTeX has a learning curve.",
      ],
      pros: ["Strong technical typesetting", "Templates and citations"],
      cons: ["Less familiar than word processors", "Plan limits can change"],
      alternativeToolSlugs: ["zotero", "mendeley", "grammarly", "figma"],
      faq: [
        {
          question: "Can a student start Overleaf for free?",
          answer:
            "Yes, Overleaf offers a free starting plan. Check the current plan page for project and collaboration limits.",
        },
      ],
      officialSources: [
        source("Official product", "https://www.overleaf.com/"),
        source(
          "Official plans",
          "https://docs.overleaf.com/getting-started/free-and-premium-plans",
        ),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-10-30",
      expiresAt: null,
      status: "active",
      changelog: ["2026-08-31: Reviewed official product and plan/help links."],
    },
    {
      id: "tool-canva",
      slug: "canva",
      name: "Canva",
      primaryKeyword: "Canva free for students",
      accessGuide: accessGuides.canva,
      tagline: "Fast visual design for presentations and student projects.",
      shortDescription:
        "Make slides, posters, social graphics and simple visual assets.",
      fullDescription:
        "Canva's free plan gives students a quick way to create presentations and visual project materials. Pro assets and education eligibility are separate questions, so check the license and plan shown for each design element before publishing.",
      category: "design-and-creative",
      offerType: "free-plan",
      badges: ["No Student Email Required", "Browser Based", "Mobile App"],
      officialUrl: "https://www.canva.com/",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official site.",
      supportedCountries: "Global availability may vary.",
      platforms: ["Browser", "iOS", "Android", "Desktop"],
      freePlanSummary:
        "Canva has a free plan with a library of free templates and assets.",
      freeLimit:
        "Free and paid assets are mixed; availability depends on the design.",
      resetFrequency: "Not applicable",
      creditCardRequired: "Not clearly stated",
      studentVerificationRequired: "No for the standard free plan",
      watermark: "Paid assets may carry restrictions or watermarks.",
      exportLimits: "Export options depend on the design and asset licenses.",
      commercialUse: "Check the license for each asset and your use case.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Make a presentation",
        "Design a poster",
        "Create a project cover",
      ],
      claimSteps: [
        "Open Canva.",
        "Create or use an account.",
        "Choose free templates and assets or review upgrade prompts.",
      ],
      freePlanLimitations: [
        "Some assets are paid.",
        "Education access has separate eligibility rules.",
      ],
      pros: ["Low learning curve", "Many templates", "Good for quick visuals"],
      cons: [
        "Asset licensing needs attention",
        "Free and paid content are mixed",
      ],
      alternativeToolSlugs: ["figma", "adobe-express", "photopea", "blender"],
      faq: [
        {
          question: "Is Canva free for students?",
          answer:
            "Canva offers a standard free plan. Some education features have separate eligibility requirements, so do not assume every student receives Pro access.",
        },
      ],
      officialSources: [
        source("Official product", "https://www.canva.com/"),
        source("Official pricing", "https://www.canva.com/pricing/"),
        source("Canva for Education", "https://www.canva.com/education/"),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-10-30",
      expiresAt: null,
      status: "active",
      changelog: [
        "2026-08-31: Reviewed official product, pricing and education links.",
      ],
    },
    {
      id: "tool-figma",
      slug: "figma",
      name: "Figma",
      primaryKeyword: "Figma free for students",
      accessGuide: accessGuides.figma,
      tagline: "Collaborative interface design and prototyping.",
      shortDescription:
        "Design interfaces, map ideas and share clickable prototypes.",
      fullDescription:
        "Figma's browser-based workspace is useful for interface design, wireframes and group projects. The free Starter experience has limits around files, collaboration or team features, so confirm the current plan before choosing it for a long project.",
      category: "design-and-creative",
      offerType: "free-plan",
      badges: ["No Student Email Required", "Browser Based", "Desktop App"],
      officialUrl: "https://www.figma.com/",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official site.",
      supportedCountries: "Global",
      platforms: ["Browser", "Windows", "macOS", "Linux"],
      freePlanSummary:
        "Figma offers a free Starter plan for beginning design work.",
      freeLimit: "File, version and collaboration limits depend on the plan.",
      resetFrequency: "Not applicable",
      creditCardRequired: "Not clearly stated",
      studentVerificationRequired: "No for Starter",
      watermark: "Not applicable",
      exportLimits: "Not clearly stated",
      commercialUse: "Check Figma's current terms.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Sketch an app",
        "Prototype a group project",
        "Share design feedback",
      ],
      claimSteps: [
        "Open Figma.",
        "Create an account.",
        "Start a design file and check its current plan limits.",
      ],
      freePlanLimitations: [
        "Starter limits may affect team work.",
        "Some education features require eligibility.",
      ],
      pros: [
        "Excellent collaboration",
        "Strong prototyping",
        "Runs in a browser",
      ],
      cons: ["Plan limits can affect teams", "Requires some design practice"],
      alternativeToolSlugs: ["canva", "adobe-express", "photopea", "overleaf"],
      faq: [
        {
          question: "Can students use Figma for free?",
          answer:
            "Students can start with Figma's free plan. Education access and plan limits are separate; check the official education and pricing pages.",
        },
      ],
      officialSources: [
        source("Official product", "https://www.figma.com/"),
        source("Official pricing", "https://www.figma.com/pricing/"),
        source("Figma for Education", "https://www.figma.com/education/"),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-10-30",
      expiresAt: null,
      status: "active",
      changelog: [
        "2026-08-31: Reviewed official product, pricing and education links.",
      ],
    },
    {
      id: "tool-adobe-express",
      slug: "adobe-express",
      name: "Adobe Express",
      primaryKeyword: "Adobe Express free for students",
      accessGuide: accessGuides["adobe-express"],
      tagline: "Quick graphics, documents and social designs.",
      shortDescription:
        "Create simple visual content with Adobe's browser tools.",
      fullDescription:
        "Adobe Express is a quick design tool for presentations, posters and social graphics. Its free plan can cover basic student work, while premium templates, assets and certain generative features may require an upgrade.",
      category: "design-and-creative",
      offerType: "free-plan",
      badges: ["No Student Email Required", "Browser Based", "Mobile App"],
      officialUrl: "https://www.adobe.com/express/",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official site.",
      supportedCountries: "Global availability and features vary.",
      platforms: ["Browser", "iOS", "Android"],
      freePlanSummary:
        "Adobe Express provides a free plan for basic creation work.",
      freeLimit: "Free assets and features are subject to plan limits.",
      resetFrequency: "Not clearly stated",
      creditCardRequired: "Not clearly stated",
      studentVerificationRequired: "No for standard access",
      watermark: "Paid assets may have restrictions.",
      exportLimits: "Export and asset rights depend on the current plan.",
      commercialUse: "Review Adobe's asset licensing terms.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Create a presentation",
        "Make a poster",
        "Resize a project graphic",
      ],
      claimSteps: [
        "Open Adobe Express.",
        "Sign in or create an Adobe account.",
        "Choose the free plan and review asset labels.",
      ],
      freePlanLimitations: [
        "Premium assets are separate.",
        "Education discounts are not the same as free access.",
      ],
      pros: ["Fast template-based design", "Adobe ecosystem"],
      cons: [
        "Premium prompts appear in the workflow",
        "Licensing needs review",
      ],
      alternativeToolSlugs: ["canva", "figma", "photopea", "blender"],
      faq: [
        {
          question: "Is Adobe Express free for students?",
          answer:
            "Adobe Express has a free plan. Student discounts and premium access are separate offers with their own eligibility rules.",
        },
      ],
      officialSources: [
        source("Official product", "https://www.adobe.com/express/"),
        source("Official plans", "https://www.adobe.com/express/pricing"),
        source("Adobe education", "https://www.adobe.com/education.html"),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-10-30",
      expiresAt: null,
      status: "active",
      changelog: [
        "2026-08-31: Reviewed official product, plan and education links.",
      ],
    },
    {
      id: "tool-photopea",
      slug: "photopea",
      name: "Photopea",
      primaryKeyword: "Photopea free for students",
      accessGuide: accessGuides.photopea,
      tagline: "A capable photo editor that runs in the browser.",
      shortDescription:
        "Edit raster graphics and open common design file formats online.",
      fullDescription:
        "Photopea is a browser-based editor that can be useful when a student needs quick image editing without installing a large application. Check the product's current terms and file support for work that matters, and keep backups of original files.",
      category: "design-and-creative",
      offerType: "completely-free",
      badges: ["No Student Email Required", "Browser Based"],
      officialUrl: "https://www.photopea.com/",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official site.",
      supportedCountries: "Global",
      platforms: ["Browser"],
      freePlanSummary:
        "The editor can be used in a browser without a paid subscription.",
      freeLimit:
        "Core editor access; exact service limits are not clearly stated.",
      resetFrequency: "Not applicable",
      creditCardRequired: "No for basic access",
      studentVerificationRequired: "No",
      watermark: "Not clearly stated",
      exportLimits:
        "Format and file-size support should be checked for each project.",
      commercialUse: "Check Photopea's current terms and asset licenses.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Crop a project image",
        "Edit a PSD",
        "Prepare a simple graphic",
      ],
      claimSteps: [
        "Open Photopea.",
        "Choose a file or create a new document.",
        "Export in a supported format and keep the source file.",
      ],
      freePlanLimitations: [
        "Browser performance depends on the device.",
        "Third-party assets retain their own licenses.",
      ],
      pros: [
        "No installation",
        "Familiar image-editing workflow",
        "Broad file support",
      ],
      cons: ["Large files can be demanding", "Terms and features can change"],
      alternativeToolSlugs: ["canva", "adobe-express", "figma", "blender"],
      faq: [
        {
          question: "Does Photopea require a student account?",
          answer:
            "Basic browser access does not generally require student verification. Review the official product page for current access and service terms.",
        },
      ],
      officialSources: [
        source("Official editor", "https://www.photopea.com/"),
        source("Official Learn guide", "https://www.photopea.com/learn/"),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-11-29",
      expiresAt: null,
      status: "active",
      changelog: [
        "2026-08-31: Reviewed official editor, terms and Learn guide links.",
      ],
    },
    {
      id: "tool-blender",
      slug: "blender",
      name: "Blender",
      primaryKeyword: "Blender free for students",
      accessGuide: accessGuides.blender,
      tagline: "Open-source 3D creation for ambitious projects.",
      shortDescription:
        "Model, animate, render and develop 3D work on your own computer.",
      fullDescription:
        "Blender is a free and open-source 3D creation suite covering modeling, animation, rendering and more. It is more demanding to learn than template tools, but it gives students a serious path for 3D coursework and creative experiments without a subscription.",
      category: "design-and-creative",
      offerType: "open-source",
      badges: ["Open Source", "Desktop App", "No Credit Card"],
      officialUrl: "https://www.blender.org/",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official site.",
      supportedCountries: "Global",
      platforms: ["Windows", "macOS", "Linux"],
      freePlanSummary: "Blender is free and open source.",
      freeLimit: "No subscription quota; local hardware limits performance.",
      resetFrequency: "Not applicable",
      creditCardRequired: "No",
      studentVerificationRequired: "No",
      watermark: "No",
      exportLimits:
        "Export formats and licenses depend on the project assets used.",
      commercialUse: "Review Blender's license and third-party asset licenses.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Learn 3D modeling",
        "Render a design project",
        "Create animation experiments",
      ],
      claimSteps: [
        "Download Blender from the official site.",
        "Install it for your operating system.",
        "Start with the official manual or beginner tutorials.",
      ],
      freePlanLimitations: [
        "Learning takes time.",
        "Rendering depends on local hardware.",
      ],
      pros: ["Powerful toolset", "Open source", "No paid plan required"],
      cons: ["Steep learning curve", "Hardware can limit workflow"],
      alternativeToolSlugs: ["photopea", "figma", "canva", "adobe-express"],
      faq: [
        {
          question: "Is Blender free for students?",
          answer:
            "Blender is free and open source for everyone. Student verification is not required to download the software.",
        },
      ],
      officialSources: [
        source("Official product", "https://www.blender.org/"),
        source("Blender license", "https://www.blender.org/about/license/"),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-11-29",
      expiresAt: null,
      status: "active",
      changelog: ["2026-08-31: Reviewed official product and license links."],
    },
    {
      id: "tool-github-pack",
      slug: "github-student-developer-pack",
      name: "GitHub Student Developer Pack",
      primaryKeyword: "GitHub free for students",
      accessGuide: accessGuides["github-student-developer-pack"],
      tagline: "Verified student access to developer tools and benefits.",
      shortDescription:
        "A student program that bundles offers from GitHub partners.",
      fullDescription:
        "The GitHub Student Developer Pack is a student-only program rather than a single software plan. It works best as a starting point for setting up a learning environment, testing a deployment workflow or exploring partner tools for coursework. Benefits, partner terms and eligibility can change, so students should check the live pack before treating a particular offer as available.",
      category: "coding-and-developer",
      offerType: "student-only",
      badges: ["EDU Email Required", "Verification Required", "Student Only"],
      officialUrl: "https://education.github.com/pack",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official education page.",
      supportedCountries:
        "Eligibility and verification depend on GitHub Education rules.",
      platforms: ["Browser", "Desktop"],
      freePlanSummary:
        "Verified students can request access to the current pack benefits.",
      freeLimit: "Benefits vary by partner and eligibility period.",
      resetFrequency: "Not applicable",
      creditCardRequired: "Not clearly stated",
      studentVerificationRequired: "Yes",
      watermark: "Not applicable",
      exportLimits: "Partner-specific",
      commercialUse: "Check each partner's terms.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Set up a coding environment",
        "Deploy a class project",
        "Learn professional workflows",
      ],
      claimSteps: [
        "Open GitHub Education.",
        "Review eligibility requirements.",
        "Submit student verification and then review available benefits.",
      ],
      freePlanLimitations: [
        "Verification is required.",
        "Partner benefits can expire or change.",
        "Not every offer is available in every country.",
      ],
      pros: ["Many tools in one application", "Relevant to developer students"],
      cons: [
        "Verification takes time",
        "Benefits are not permanent guarantees",
      ],
      alternativeToolSlugs: [
        "jetbrains",
        "visual-studio-code",
        "replit",
        "vercel",
      ],
      faq: [
        {
          question: "Is every GitHub Pack benefit permanent?",
          answer:
            "No. Partner benefits, terms and availability can change. Review each benefit on GitHub Education before using it in a project plan.",
        },
      ],
      officialSources: [
        source("Official pack", "https://education.github.com/pack"),
        source("GitHub Education", "https://education.github.com/"),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-09-14",
      expiresAt: null,
      status: "verification-required",
      changelog: ["2026-08-31: Reviewed official pack and education pages."],
    },
    {
      id: "tool-jetbrains",
      slug: "jetbrains",
      name: "JetBrains",
      primaryKeyword: "JetBrains free for students",
      accessGuide: accessGuides.jetbrains,
      tagline: "Professional IDEs through an education license.",
      shortDescription:
        "Apply for student access to JetBrains developer tools.",
      fullDescription:
        "JetBrains offers an education program for eligible students and teachers. It is a verified education license rather than a universal free plan, and access is subject to current eligibility, verification and license terms.",
      category: "coding-and-developer",
      offerType: "education-discount",
      badges: ["EDU Email Required", "Verification Required", "Desktop App"],
      officialUrl: "https://www.jetbrains.com/community/education/",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official education page.",
      supportedCountries: "Eligibility depends on JetBrains education rules.",
      platforms: ["Windows", "macOS", "Linux"],
      freePlanSummary:
        "Eligible students can apply for free educational access.",
      freeLimit:
        "Access covers eligible educational use during the license period.",
      resetFrequency: "License renewal rules apply",
      creditCardRequired: "No for the education application",
      studentVerificationRequired: "Yes",
      watermark: "Not applicable",
      exportLimits: "Not applicable",
      commercialUse:
        "Educational licenses are not a blanket commercial license.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Learn Java or Kotlin",
        "Build a class project",
        "Use a professional IDE",
      ],
      claimSteps: [
        "Open JetBrains Education.",
        "Choose the student application.",
        "Verify your student status and follow the license terms.",
      ],
      freePlanLimitations: [
        "Educational use terms apply.",
        "Verification and renewal are required.",
      ],
      pros: ["Full-featured IDE family", "Strong student relevance"],
      cons: [
        "Application needs verification",
        "Not intended as a general commercial license",
      ],
      alternativeToolSlugs: [
        "github-student-developer-pack",
        "visual-studio-code",
        "replit",
        "vercel",
      ],
      faq: [
        {
          question: "Is JetBrains free for students?",
          answer:
            "Eligible students can apply for an educational license. Approval, duration and permitted use are controlled by JetBrains' current terms.",
        },
      ],
      officialSources: [
        source(
          "JetBrains Education",
          "https://www.jetbrains.com/community/education/",
        ),
        source(
          "Student eligibility",
          "https://www.jetbrains.com/community/education/#students",
        ),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-09-14",
      expiresAt: null,
      status: "verification-required",
      changelog: [
        "2026-08-31: Reviewed official education and student eligibility pages.",
      ],
    },
    {
      id: "tool-vscode",
      slug: "visual-studio-code",
      name: "Visual Studio Code",
      primaryKeyword: "Visual Studio Code free for students",
      accessGuide: accessGuides["visual-studio-code"],
      tagline: "A flexible, free code editor for almost any stack.",
      shortDescription:
        "Write code, install extensions and work across many languages.",
      fullDescription:
        "Visual Studio Code is a free source-code editor that runs locally and supports a broad extension ecosystem. It is a practical default for students learning web development, scripting and many other programming workflows.",
      category: "coding-and-developer",
      offerType: "completely-free",
      badges: ["No Student Email Required", "Desktop App", "Open Source"],
      officialUrl: "https://code.visualstudio.com/",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official site.",
      supportedCountries: "Global",
      platforms: ["Windows", "macOS", "Linux", "Web"],
      freePlanSummary: "The editor is free to download and use.",
      freeLimit: "No subscription quota; extensions have their own terms.",
      resetFrequency: "Not applicable",
      creditCardRequired: "No",
      studentVerificationRequired: "No",
      watermark: "No",
      exportLimits: "Not applicable",
      commercialUse: "Review the product and extension licenses.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Learn a programming language",
        "Build a web app",
        "Edit configuration and data files",
      ],
      claimSteps: [
        "Download VS Code from Microsoft.",
        "Install it for your platform.",
        "Add only the extensions you understand and trust.",
      ],
      freePlanLimitations: [
        "Some extensions connect to paid services.",
        "The editor does not provide hosting by itself.",
      ],
      pros: ["Free and versatile", "Large extension ecosystem", "Runs locally"],
      cons: ["Extensions vary in quality", "Beginners need setup guidance"],
      alternativeToolSlugs: [
        "jetbrains",
        "replit",
        "github-student-developer-pack",
        "vercel",
      ],
      faq: [
        {
          question: "Does VS Code require a student account?",
          answer:
            "No. Visual Studio Code can be downloaded without student verification. Extensions and connected services may have separate terms.",
        },
        {
          question: "Is Visual Studio Code free for students?",
          answer:
            "Yes, Visual Studio Code free for students access is the same free editor download available to other users; student verification is not required for the editor itself.",
        },
      ],
      officialSources: [
        source("Official product", "https://code.visualstudio.com/"),
        source("Official download", "https://code.visualstudio.com/Download"),
        source("License", "https://code.visualstudio.com/license"),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-11-29",
      expiresAt: null,
      status: "active",
      changelog: [
        "2026-08-31: Reviewed official product, download and license links.",
      ],
    },
    {
      id: "tool-replit",
      slug: "replit",
      name: "Replit",
      primaryKeyword: "Replit free for students",
      accessGuide: accessGuides.replit,
      tagline: "A browser workspace for learning and sharing code.",
      shortDescription:
        "Start small coding projects without setting up a local stack.",
      fullDescription:
        "Replit lets students write and run code in a browser, which can reduce setup friction for small projects and lessons. Free workspace, compute and deployment limits change over time and should be checked before relying on it for a production project.",
      category: "coding-and-developer",
      offerType: "free-plan",
      badges: ["No Student Email Required", "Browser Based", "Mobile App"],
      officialUrl: "https://replit.com/",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official site.",
      supportedCountries: "Availability varies by region.",
      platforms: ["Browser", "iOS", "Android"],
      freePlanSummary:
        "Replit offers a free way to start browser-based coding projects.",
      freeLimit:
        "Compute, storage, collaboration and deployment limits vary by plan.",
      resetFrequency: "Not clearly stated",
      creditCardRequired: "Not clearly stated",
      studentVerificationRequired: "No for standard access",
      watermark: "Not applicable",
      exportLimits: "Not clearly stated",
      commercialUse: "Check Replit's current terms.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Practice a language",
        "Share a class demo",
        "Prototype a small app",
      ],
      claimSteps: [
        "Open Replit.",
        "Create an account.",
        "Start a project and review the current free limits.",
      ],
      freePlanLimitations: [
        "Resources are limited.",
        "A free workspace is not a guarantee of always-on production hosting.",
      ],
      pros: ["Low setup cost", "Easy sharing", "Browser-based"],
      cons: ["Resource limits matter", "Platform behavior can change"],
      alternativeToolSlugs: [
        "visual-studio-code",
        "github-student-developer-pack",
        "jetbrains",
        "vercel",
      ],
      faq: [
        {
          question: "Is Replit free for students?",
          answer:
            "Students can start with Replit's free offering, but workspace, compute and deployment limits vary. Check the official pricing page for current terms.",
        },
      ],
      officialSources: [
        source("Official product", "https://replit.com/"),
        source("Official pricing", "https://replit.com/pricing"),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-10-30",
      expiresAt: null,
      status: "active",
      changelog: ["2026-08-31: Reviewed official product and pricing links."],
    },
    {
      id: "tool-vercel",
      slug: "vercel",
      name: "Vercel",
      primaryKeyword: "Vercel free for students",
      accessGuide: accessGuides.vercel,
      tagline: "Deploy student web projects from a Git repository.",
      shortDescription:
        "Build and deploy modern web projects with a simple workflow.",
      fullDescription:
        "Vercel provides hosting and deployment tools that work well for student websites and frontend projects. The Hobby plan is positioned for personal, non-commercial use, and usage limits apply; treat it as a learning and prototyping option unless your project fits the current terms.",
      category: "coding-and-developer",
      offerType: "free-plan",
      badges: ["No Credit Card", "Browser Based", "No Student Email Required"],
      officialUrl: "https://vercel.com/",
      affiliateDisclosure:
        "No affiliate destination is configured. This button opens the official site.",
      supportedCountries: "Global availability may vary.",
      platforms: ["Browser", "CLI"],
      freePlanSummary:
        "Vercel offers a Hobby plan for personal, non-commercial projects.",
      freeLimit: "Usage, bandwidth and function limits apply.",
      resetFrequency: "Usage periods follow current plan terms.",
      creditCardRequired: "No for starting Hobby use",
      studentVerificationRequired: "No",
      watermark: "Not applicable",
      exportLimits: "Not applicable",
      commercialUse:
        "Hobby is for personal, non-commercial use; check current terms.",
      paidPlanStartingPrice: null,
      studentUseCases: [
        "Deploy a portfolio",
        "Publish a class project",
        "Preview pull requests",
      ],
      claimSteps: [
        "Create a Vercel account.",
        "Connect a Git provider or import a project.",
        "Review Hobby limits before deploying.",
      ],
      freePlanLimitations: [
        "Hobby has usage limits.",
        "Commercial projects may need a paid plan.",
      ],
      pros: [
        "Fast deployment workflow",
        "Good Next.js integration",
        "Preview URLs",
      ],
      cons: ["Plan terms matter", "Usage can exceed free limits"],
      alternativeToolSlugs: [
        "replit",
        "visual-studio-code",
        "github-student-developer-pack",
        "jetbrains",
      ],
      faq: [
        {
          question: "Can students use Vercel for free?",
          answer:
            "Students can start with the Hobby plan for personal, non-commercial projects. Review the current plan terms if a project has commercial use or higher traffic.",
        },
      ],
      officialSources: [
        source("Official product", "https://vercel.com/"),
        source("Official pricing", "https://vercel.com/pricing"),
        source(
          "Hobby plan terms",
          "https://vercel.com/docs/accounts/plans/hobby",
        ),
      ],
      lastVerifiedAt: checked,
      nextCheckAt: "2026-10-30",
      expiresAt: null,
      status: "active",
      changelog: [
        "2026-08-31: Reviewed official product, pricing and Hobby plan links.",
      ],
    },
  ] as StudentTool[]
).map(
  (tool): StudentTool => ({
    ...tool,
    secondaryKeywords: Array.from(
      new Set([
        `${tool.name} free for students`,
        `is ${tool.name} free for students`,
        ...(tool.secondaryKeywords ?? []),
      ]),
    ),
  }),
);

export const activeTools = tools.filter((tool) => tool.status === "active");

const isFirstBatchSlug = (slugs: readonly string[], slug: string) =>
  slugs.includes(slug);

export const publishedTools = activeTools.filter((tool) =>
  isFirstBatchSlug(firstBatch.toolSlugs, tool.slug),
);

export const publishedCategories = categories.filter((category) =>
  isFirstBatchSlug(firstBatch.categorySlugs, category.slug),
);

export const collections = [
  {
    slug: "best-free-ai-tools-for-students",
    name: "Best Free AI Tools for Students",
    primaryKeyword: "free AI tools",
    description:
      "A practical starting list of AI tools for study, research and planning.",
    toolSlugs: [
      "chatgpt",
      "google-gemini",
      "claude",
      "perplexity",
      "notebooklm",
    ],
  },
  {
    slug: "best-free-writing-tools-for-students",
    name: "Best Free Writing Tools for Students",
    primaryKeyword: "free writing tools",
    description:
      "Writing, citation and research tools for essays, reports and reading lists.",
    toolSlugs: ["grammarly", "quillbot", "zotero", "mendeley", "overleaf"],
  },
  {
    slug: "free-tools-without-credit-card",
    name: "Free Tools Without a Credit Card",
    primaryKeyword: "tools without a credit card",
    description:
      "Tools with a free starting path where the official source does not require a card for basic access.",
    toolSlugs: [
      "blender",
      "visual-studio-code",
      "vercel",
      "photopea",
      "zotero",
    ],
  },
  {
    slug: "free-software-with-student-email",
    name: "Free Software With Student Email",
    primaryKeyword: "software with student email",
    description:
      "Education offers where student verification is part of the access path.",
    toolSlugs: ["github-student-developer-pack", "jetbrains"],
  },
] as const;

export const publishedCollections = collections.filter(
  (collection) =>
    isFirstBatchSlug(firstBatch.collectionSlugs, collection.slug) &&
    collection.toolSlugs.some((slug) =>
      publishedTools.some((tool) => tool.slug === slug),
    ),
);

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getPublishedTool(slug: string) {
  return publishedTools.find((tool) => tool.slug === slug);
}

export function getPublishedCategory(slug: string) {
  return publishedCategories.find((category) => category.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getPublishedCollection(slug: string) {
  return publishedCollections.find((collection) => collection.slug === slug);
}

export function getToolsBySlugs(slugs: readonly string[]) {
  return slugs
    .map(getTool)
    .filter((tool): tool is StudentTool => Boolean(tool));
}

export function getPublishedToolsBySlugs(slugs: readonly string[]) {
  return slugs
    .map(getPublishedTool)
    .filter((tool): tool is StudentTool => Boolean(tool));
}

export function formatOfferType(type: OfferType) {
  return {
    "completely-free": "100% Free",
    "free-plan": "Free Plan",
    "free-credits": "Free Credits",
    "free-trial": "Free Trial",
    "open-source": "Open Source",
    "student-only": "Student Only",
    "education-discount": "Education Offer",
    paid: "Paid",
  }[type];
}

export function getCtaLabel(tool: StudentTool) {
  if (
    tool.ctaUrl &&
    tool.offerType !== "student-only" &&
    tool.offerType !== "education-discount"
  ) {
    return "View Student Offer";
  }
  return {
    "completely-free": "Use for Free",
    "free-plan": "View Free Plan",
    "free-credits": "Get Free Credits",
    "free-trial": "Start Free Trial",
    "open-source": "View Open Source Tool",
    "student-only": "Claim Student Deal",
    "education-discount": "Claim Student Deal",
    paid: "View Official Plan",
  }[tool.offerType];
}
