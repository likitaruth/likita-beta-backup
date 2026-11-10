/**
 * Case-study content — Figma "Case-Study - Design / Think / Build" (2077:8377 / 8491 / 8623).
 * Only the CRM-agent study exists in Figma; every other project falls back to the simple project page.
 *
 * FLAGS for the designer (kept here so they travel with the data):
 *  1. Which project this study belongs to is not stated; it is attached to CRM AGENT ("A safe CRM action layer").
 *  2. Counter reads "01 / 05" in Figma; it is derived from the project list instead (see components/case).
 *  3. Several blocks repeat placeholder copy in Figma and are reproduced as-is: the RESEARCH paragraphs repeat the intro,
 *     "Rules before interface" repeats the MVP-constraints paragraphs, the five "Explicit scope…" cards are identical,
 *     the six "User Intent" cards are identical (numbered 01–06 here, all "01" in Figma) and the four "Adoption" cards are identical.
 *  4. "decison" in the Design heading is corrected to "decision". "authorising" keeps the author's British spelling.
 *  5. The Build tab's "Next" button reads "Think" (copy of the Think tab). Here: Design → Think, Think → Build, Build → next project.
 *  6. All screenshots/diagrams are placeholders until exported (the Figma asset host is not reachable from the build sandbox).
 */
export type TabKey = "design" | "think" | "build";

export type Block =
  | { type: "text"; eyebrow?: string; heading?: string; body: string[]; size?: 18 | 21; display?: boolean }
  | { type: "image"; alt: string; ratio: number; width?: number; src?: string; tone?: "photo" | "cut" | "dark" | "flow" | "screen" }
  | { type: "cards"; cols: 2 | 3; items: { n?: string; kicker?: string; title?: string; lines?: string[]; list?: string[] }[] }
  | { type: "pull"; text: string; heading?: string };

export type Tab = { intro: { eyebrow?: string; heading: string; body: string[] }; blocks: Block[] };

export type CaseStudy = {
  slug: string;
  title: string;
  lede: string | string[];
  heroAlt: string;
  /** Optional real hero image; falls back to the placeholder. heroRatio is width / height. */
  heroSrc?: string;
  heroRatio?: number;
  heroMax?: number;
  heroTone?: "photo" | "screen";
  /** Up to three label/value pairs shown under the hero (Figma: Role / Focus / Year). */
  meta: [string, string][];
  reflection?: { eyebrow: string; heading: string; body: string[]; pull: string };
  tabs: Partial<Record<TabKey, Tab>>;
};

const intro = (heading: string): Tab["intro"] => ({
  eyebrow: "Reframing the problem",
  heading,
  body: [
    "The initial idea was simple: place an AI chatbot inside the CRM and let it handle lead creation, tagging, password resets, and batch operations through natural language.",
    "The real design problem was more demanding. The assistant had to locate the correct records, respect user permissions, recover from errors, and make every change understandable before it was applied.",
  ],
});

const principle = {
  n: "01",
  title: "Explicit scope over assumed context",
  lines: ["Every action identifies the records being read or changed instead of relying on phrases such as “this record."],
};
const adoption = { title: "Adoption", list: ["Eligible users opening the assistant", "Weekly and repeat usage", "Quick-action versus free-text usage"] };

export const caseStudies: CaseStudy[] = [
  {
    slug: "crm-agent",
    title: "A safe CRM action layer",
    lede: "A conversational interface that helps teams search, ask questions, and perform common CRM operations without hiding the permissions, validation, and accountability behind every system change.",
    heroAlt: "CRM workspace with the AI assistant panel open",
    meta: [["Role", "Product design & Prototype"], ["Focus", "AI / SAAS / CRM"], ["Year", "2026"]],
    reflection: {
      eyebrow: "Reflection",
      heading: "Shared Responsibility in AI",
      body: [
        "This project reinforced that designing AI products requires more than shaping a conversation. The essential work is deciding how responsibility is divided between the model, the application, and the person authorising the result.",
        "When page awareness proved technically unrealistic, the answer was not to disguise the limitation. The interaction changed so users could provide explicit context and the application could validate it. That made the MVP more honest, safer, and easier to extend skill by skill.",
      ],
      pull: "The strongest AI experiences do not hide uncertainty. They turn it into a clear moment for context, validation, and control.",
    },
    tabs: {
      design: {
        intro: intro("A command bot."),
        blocks: [
          { type: "text", eyebrow: "Research", heading: "Clarity, designed into every decision.", body: intro("").body },
          { type: "image", alt: "CRM assistant: first concept", ratio: 1068 / 483 },
          { type: "image", alt: "CRM assistant: revised concept", ratio: 1066 / 485 },
          {
            type: "text",
            body: [
              "Early flows generated simulated responses for ambiguous requests, displayed disconnected confirmation cards, and used a generic “Thinking” state that gave users no insight into which records or values were being accessed.",
              "A normal chatbot primarily generates responses. This assistant needed to coordinate structured operations that could update records, notify users, or change account states. The project was therefore reframed around controlled CRM access rather than unrestricted conversation.",
            ],
          },
          {
            type: "text",
            eyebrow: "Entry experience",
            heading: "Show supported actions",
            body: [
              "“How can I help?” was familiar but too vague. The revised entry state exposes supported skills, gives users useful starting points, and states that records may need to be identified and changes are only applied after approval.",
              "Capability-led prompts remain consistent across the CRM because they are tied to supported skills, not whichever page happens to be open.",
            ],
          },
          { type: "image", alt: "Entry state listing supported skills", ratio: 1061 / 498.6 },
          {
            type: "text",
            eyebrow: "Explicit entity resolution",
            heading: "Resolve records with @ mentions",
            size: 21,
            body: ["Typing @ opens permission-aware search across leads, clients, affiliates, users, and business units. A selected result becomes a readable inline chip carrying structured CRM type and ID data, so the backend receives a validated identity instead of a name the model has to interpret."],
          },
          { type: "image", alt: "@ mention search with inline record chips", ratio: 1067 / 496.5 },
          {
            type: "text",
            eyebrow: "Natural-language extraction",
            heading: "Extract fields from natural language",
            size: 21,
            body: [
              "The assistant classifies intent, extracts the fields already present, resolves human-readable values to CRM entities, validates them against CRM rules, and asks only for details that are missing or ambiguous.",
              "This produces a hybrid interface: natural language provides speed, field-specific clarification provides precision, and review cards provide control before any mutation.",
            ],
          },
          { type: "image", alt: "Field extraction and clarification", ratio: 1064 / 484.5 },
          {
            type: "text",
            eyebrow: "From resolution to execution",
            heading: "Make execution visible",
            size: 21,
            body: ["Validation and execution are presented as a readable operational sequence instead of a generic thinking state. Users can see when the assistant is searching, validating, checking access, preparing a review, waiting for approval, or applying a change."],
          },
          { type: "image", alt: "Execution sequence: validating and applying", ratio: 1064 / 484.5 },
          { type: "image", alt: "Review card before applying a change", ratio: 1062 / 494.2 },
        ],
      },
      think: {
        intro: intro("A command BOT."),
        blocks: [
          {
            type: "text",
            eyebrow: "MVP constraints",
            heading: "Designing without page context",
            body: [
              "The early concept assumed the assistant could detect the current module, active filters, selected rows, and business unit. During technical alignment, the AI team confirmed that page-level context would not be available in the first release.",
              "That limitation changed the interaction model. Automatic context chips were removed, universal skill-based actions replaced page-specific shortcuts, and every record became something the user or assistant had to resolve explicitly.",
            ],
          },
          { type: "image", alt: "Context mapping: illusion versus MVP reality", ratio: 1038 / 772.4 },
          {
            type: "text",
            eyebrow: "Revised design principle",
            body: ["The assistant must not invent information that is not present in context. Every record, account, user, or data set must be identified in the conversation."],
          },
          {
            type: "text",
            eyebrow: "Product principles",
            heading: "Rules before interface",
            body: [
              "The early concept assumed the assistant could detect the current module, active filters, selected rows, and business unit. During technical alignment, the AI team confirmed that page-level context would not be available in the first release.",
              "That limitation changed the interaction model. Automatic context chips were removed, universal skill-based actions replaced page-specific shortcuts, and every record became something the user or assistant had to resolve explicitly.",
            ],
          },
          { type: "cards", cols: 2, items: [principle, principle, principle, principle, principle] },
          {
            type: "text",
            eyebrow: "Outcome",
            heading: "An implementation-ready model",
            body: ["The final design moved the assistant from a generic chatbot concept to an operational system that communicates what it knows, what it still needs, and exactly what it is about to change."],
          },
          { type: "cards", cols: 3, items: ["01", "02", "03", "04", "05", "06"].map((n) => ({ n, title: "User Intent" })) },
        ],
      },
      build: {
        intro: intro("Not a chatbot. A command layer."),
        blocks: [
          {
            type: "text",
            eyebrow: "Skill contracts",
            heading: "A shared skill contract",
            body: ["Each capability became a registered skill describing its entity types, required inputs, permission, confirmation, bulk-action, undo, and risk rules. The model could identify a request, but the contract determined what the application was allowed to do."],
          },
          { type: "image", alt: "Skill definition as a JSON contract", ratio: 1086 / 634 },
          {
            type: "text",
            eyebrow: "Capability model",
            heading: "Five executable skills",
            body: ["The MVP was deliberately constrained to querying CRM data, finding and summarising records, creating records, managing tags and supported fields, and restricted account operations. This converted an open-ended promise into a system the team could validate and ship."],
          },
          { type: "image", alt: "Structured CRM skill capability pipeline", ratio: 1032 / 407 },
          { type: "image", alt: "CRM AI assistant architecture", ratio: 1032 / 1028.8 },
          {
            type: "text",
            eyebrow: "Measuring the release",
            heading: "A Measurement Framework",
            body: ["Because the assistant was still at MVP stage, the case study does not present unverified performance claims. The measurement plan focuses on whether the product actually reduces work while preserving reliability and user control."],
          },
          { type: "cards", cols: 2, items: [adoption, adoption, adoption, adoption] },
        ],
      },
    },
  },
];

/*
 * ClientLens — exact copy and image placement from Figma 2171:9645 (Design 2171:8814 / Think 2171:9033 / Build 2171:9154).
 * Images are web-sized WebP/JPG in /public/assets/case/clientlens. Frame ratios are the Figma frame sizes.
 * Notes: the Figma Build tab "Next" button reads "Think"; the site flow is kept (Build -> next project).
 * The counter is derived from the project list, not hard-coded.
 */
const CL = "/assets/case/clientlens";
const clIntro: Tab["intro"] = {
  eyebrow: "Product journey",
  heading: "Context to Evidence to Action",
  body: ["The shipped workflow begins with a known client, ranks relevant comparisons, preserves both clients inside a shared comparison workspace, and introduces natural-language interpretation only when the user intentionally begins a detailed comparison."],
};
const clientlens: CaseStudy = {
  slug: "clientlens",
  title: "Explainable Customer Intelligence",
  lede: [
    "ClientLens is an AI-powered feature within an enterprise CRM that helps account managers find clients with similar behavioural patterns, understand what drives those similarities, and identify appropriate engagement opportunities.",
    "It brings trading activity, financial behaviour, CRM notes, communication habits, risk indicators, lead-source data, and lifecycle engagement into one investigation workflow.",
  ],
  heroAlt: "ClientLens similar-leads results on a laptop at a walnut desk",
  heroSrc: `${CL}/hero-walnut-desk.jpg`,
  heroRatio: 1068 / 600,
  meta: [["Role", "Product design & Prototype"], ["Focus", "AI / SAAS / CRM"], ["Year", "2026"]],
  tabs: {
    design: {
      intro: clIntro,
      blocks: [
        { type: "text", eyebrow: "Product journey", heading: "Client Detail", body: ["The journey starts with identity, status, segment, deposits, lifetime value, trading activity, risk, redeposit likelihood, engagement, and profile-data availability. Anchoring Find Similar inside the client profile keeps the investigation grounded in a reference client and a clear business hypothesis."] },
        { type: "image", src: `${CL}/mockup-lead-detail.webp`, tone: "photo", alt: "Client detail screen with the Find Similar action, shown on a laptop on a sunny terrace", ratio: 1068 / 600 },
        { type: "text", eyebrow: "Product journey", heading: "Ranked Similar Leads", body: ["Ranked results prioritize overall match strength, category-level signals, identity, status, and segment so users can decide whether a result is relevant enough to investigate. High, medium, and low bands make a large client set manageable without generating a paragraph for every result."] },
        { type: "image", src: `${CL}/mockup-similar-leads.webp`, tone: "cut", alt: "Ranked similar-client results with match scores, shown on an angled laptop", ratio: 1068 / 700 },
        { type: "text", eyebrow: "comparison workspace", heading: "Persistent Comparison Context", body: ["The same client pair remains visible across Overview, Radar Preview, and Deep Compare. This shared state prevents each view from feeling like a disconnected report and reduces the need to repeatedly select or reconstruct context.", "Structured scores remain available even when an AI summary cannot be generated, providing graceful degradation without hiding the underlying evidence."] },
        { type: "image", src: `${CL}/mockup-deep-compare.webp`, tone: "photo", alt: "Deep Compare feature breakdown for a client pair, shown on a laptop on a sofa", ratio: 1068 / 700 },
      ],
    },
    think: {
      intro: clIntro,
      blocks: [
        { type: "cards", cols: 3, items: [
          { kicker: "How might we?", title: "Help account managers move from a known client to relevant comparisons without manually searching across CRM modules." },
          { kicker: "How might we?", title: "Make every AI-selected match explainable by showing the behaviours, dimensions, and differences behind the score." },
          { kicker: "How might we?", title: "Turn comparison evidence into a clear next step while keeping the user responsible for the final decision." },
        ] },
        { type: "text", eyebrow: "Information Model", heading: "Four Information Layers", body: ["ClientLens combines four distinct information layers: factual CRM values, calculated similarity data, AI-generated interpretation, and operational recommendations. Separating these layers keeps generated insight from being mistaken for raw customer data and makes the reasoning easier to inspect."] },
        { type: "cards", cols: 3, items: [
          { n: "01", title: "Factual CRM Data", lines: ["Deposits, lifetime value, trading activity, status, communication records, lead source, and lifecycle stage establish the underlying client context."] },
          { n: "02", title: "Calculated Similarity", lines: ["Overall scores, category percentages, feature-level matches, confidence bands, and unavailable comparisons form the structured comparison result."] },
          { n: "03", title: "Interpretation and Action", lines: ["AI-generated explanations clarify why a match matters, while operational recommendations translate the evidence into a reviewable next step"] },
        ] },
        { type: "image", src: `${CL}/information-model.webp`, tone: "dark", alt: "Information model showing the four layers: factual CRM data, calculated similarity, AI interpretation and operational recommendations", ratio: 1068 / 612 },
        { type: "text", heading: "A Progressive Decision Journey", body: ["The experience was reframed around five questions: Who is this client? Who are the similar clients? Why were they matched? Where do they differ? What should the user do with the information?", "This progression moves from client context to discovery, interpretation, evidence, and action. It gives account officers a concise path while preserving deeper comparison detail for analysts who need it."] },
        { type: "image", src: `${CL}/product-flow.webp`, tone: "flow", alt: "Product flow from Client Detail through Find Similar, Similar Leads, AI Overview, Radar Preview and Deep Compare", ratio: 1077 / 132.8 },
        { type: "text", eyebrow: "Reflection", heading: "Reviewable AI Decisions", body: ["The most important part of an intelligent feature is the structure around its output: where it appears, what evidence supports it, how incomplete data is handled, how users inspect or challenge it, and how it connects to an operational decision."] },
        { type: "image", src: `${CL}/product-roadmap.webp`, tone: "dark", alt: "Product roadmap showing shipped, next and later opportunities", ratio: 1068 / 800 },
      ],
    },
    build: {
      intro: clIntro,
      blocks: [
        { type: "image", src: `${CL}/anatomy-of-the-system.webp`, tone: "dark", alt: "Anatomy of the ClientLens system", ratio: 1068 / 500 },
        { type: "text", eyebrow: "Outcome", heading: "A Live Intelligence Layer", body: ["ClientLens is live within the CRM. It gives relationship managers and operational teams a structured way to begin from a known client, discover comparable profiles, understand why they match, inspect differences, and use visible evidence to inform engagement decisions.", "Verified usage metrics are not yet included. The next measurement phase will track time to identify a relevant comparison, progression from results to comparison, use of deeper evidence views, recommendation engagement, completion and abandonment, adoption, and operational outcomes after recommended actions."] },
        { type: "image", src: `${CL}/measurement-funnel.webp`, tone: "dark", alt: "Measurement funnel for the next phase of ClientLens metrics", ratio: 1068 / 800 },
        { type: "cards", cols: 2, items: [
          { title: "Move from recommendation to execution", lines: ["Future iterations can connect a recommendation directly to a task, outreach sequence, or campaign while collecting feedback on whether the suggestion was useful or acted upon."] },
          { title: "Make changing patterns visible", lines: ["Comparison history, score-change visibility, cohort comparison, and deeper feature-contribution controls can extend the same product model without creating a separate AI experience."] },
        ] },
        { type: "pull", heading: "Closing Thought", text: "The final experience does not ask users to trust a black-box recommendation. It helps them move from client context, to pattern discovery, to AI interpretation, to evidence, and finally to action." },
      ],
    },
  },
};


/*
 * Activepieces — Figma 2183:6218 (Design 2173:9865 / Think 2173:9977 / Build 2173:10077). Copy and image placement follow the frames.
 * FLAGS: the Figma meta row (Product design & Prototype / AI-SAAS-CRM / 2026) is a copy of ClientLens, so the existing
 * role / focus / industry values are kept. Stray words in Figma ("Reduce", "Create a more consistent interface ") that
 * trail two of the three "How might we" cards are left out. The eyebrow "system" above "Faster Setup, Better Confidence"
 * is kept as drawn. The Figma counter (01 / 05) is derived by the site instead.
 */
const AP = "/assets/activepieces";
const apIntro: Tab["intro"] = {
  heading: "Simpler Automation Flow",
  body: [
    "Activepieces helps people automate work across multiple tools, but the product experience needed to make those flows easier to understand at a glance and less overwhelming to configure.",
    "The focus of the redesign work was to improve clarity in key interaction moments, especially where users needed to build, trigger, and monitor automations without losing confidence in the process.",
  ],
};
const activepieces: CaseStudy = {
  slug: "activepieces",
  title: "Automation Tool Redesign",
  lede: "Activepieces is a no-code automation tool that connects apps like Gmail, Slack, and Discord so users can create workflows, or \u201cPieces\u201d, that automate repetitive tasks. As a UI Designer, I worked with the founder and senior designer to make those complex flows more straightforward and easier to use.",
  heroAlt: "Activepieces flow builder with the Blackbaud action list open, shown on a monitor",
  heroSrc: `${AP}/hero-flow-monitor.webp`,
  heroRatio: 1312 / 600,
  heroMax: 1312,
  heroTone: "screen",
  meta: [["Role", "UI Designer"], ["Focus", "Workflow Clarity / Builder Experience / Design Systems"], ["Industry", "Automation"]],
  tabs: {
    design: {
      intro: apIntro,
      blocks: [
        { type: "text", eyebrow: "workflows", heading: "Redesigning Core Workflows", body: ["The redesign work centered on the product areas that most directly shaped usability: workflow building, trigger selection, app discovery in the sidebar, and dashboard visibility."] },
        { type: "text", heading: "The Builder", body: ["The builder was redesigned to feel more intuitive and easier to scan, with clearer visual cues that support workflow creation step by step."] },
        { type: "image", src: `${AP}/builder-canvas.webp`, tone: "screen", alt: "Redesigned Activepieces builder: an empty canvas with the flow name, Test Flow and Publish actions", ratio: 1068 / 590 },
        { type: "text", heading: "Select Trigger", body: ["Search, filtering, and clearer explanations made trigger selection easier and more accurate for users starting new automations."] },
        { type: "image", src: `${AP}/select-trigger.webp`, tone: "screen", alt: "Select Step panel with a search field, tabs and a list of apps including Airtable, Amazon S3 and Asana", ratio: 1068 / 590 },
        { type: "text", heading: "Side Bar Apps", body: ["The sidebar was reorganized to help users find and add the right tools faster, supported by clearer icons and helpful guidance."] },
        { type: "image", src: `${AP}/sidebar-apps.webp`, tone: "screen", alt: "Sidebar app list with clearer icons and guidance", ratio: 1068 / 590 },
        { type: "text", heading: "Dashboard", body: ["A more approachable dashboard helped users monitor app activity and workflow status through clearer, more visually engaging widgets."] },
        { type: "image", src: `${AP}/dashboard-flows.webp`, tone: "screen", alt: "Flows dashboard with a table of flows, status toggles and a task usage bar", ratio: 1068 / 590 },
      ],
    },
    think: {
      intro: apIntro,
      blocks: [
        { type: "cards", cols: 3, items: [
          { kicker: "How might we?", title: "Make automation-building flows easier to understand for users working across multiple connected apps." },
          { kicker: "How might we?", title: "Reduce friction in key setup moments like selecting triggers, navigating the builder, and managing sidebar tools." },
          { kicker: "How might we?", title: "Create a more consistent interface system that supports both better usability and stronger design-development alignment." },
        ] },
        { type: "text", eyebrow: "research", heading: "Learning from Workflow Simplicity", body: ["Working alongside the founder and senior designer gave me direct visibility into the usability issues people encountered while trying to set up and manage automations. That collaboration helped clarify where the interface needed more structure, stronger visual cues, and a more approachable path through technically complex tasks."] },
      ],
    },
    build: {
      intro: apIntro,
      blocks: [
        { type: "text", eyebrow: "system", heading: "Material Design System", display: true, body: ["Material Design was used as the foundation for stronger collaboration between design and development, helping the team work from a more consistent set of UI patterns, typography, and color decisions. That system-level consistency made it easier to build a cohesive product language while also speeding up implementation and future feature work."] },
        { type: "image", src: `${AP}/material-design-system.webp`, tone: "screen", alt: "Material Design components used as the system foundation: tabs, cards, lists, chips, buttons and dialogs", ratio: 1068 / 575 },
        { type: "text", heading: "Tools Integration", body: ["Workflow integrations were also visualized more clearly so users could better understand how app connections relate to one another inside the product."] },
        { type: "image", src: `${AP}/tools-integration-branch.webp`, tone: "screen", alt: "Branch step with True and False paths and a settings panel showing required fields", ratio: 1068 / 546 },
        { type: "text", eyebrow: "system", heading: "Faster Setup, Better Confidence", body: ["The redesign of the workflow creation experience helped reduce the time users needed to set up complex automations while also improving overall satisfaction with the product."] },
        { type: "text", eyebrow: "OUTCOME", heading: "40%", body: ["Reduction in the time it took users to set up complex automations, helping them work more productively."] },
        { type: "image", src: `${AP}/outcome-discord-feedback.webp`, tone: "screen", alt: "Discord conversation where the founder says the redesigned back end is very clear to users", ratio: 1068 / 500 },
      ],
    },
  },
};

caseStudies.push(clientlens, activepieces);

export const tabLabels: Record<TabKey, string> = { design: "Design", think: "Think", build: "Build" };
export const tabOrder: TabKey[] = ["design", "think", "build"];
export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
