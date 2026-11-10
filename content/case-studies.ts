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


/*
 * NORTHSTAR — content and screenshots from the published Northstar artifact (claude.ai/artifact/FXFcop4Kwh1KpCwuc5YmK7).
 * FLAGS: the artifact's numbered annotation pins are folded into the copy (the image block has no overlay). The decision
 * tree, role table, before/after lanes, recovery run and approval timeline are expressed as cards, since the shared blocks
 * have no diagram/table type. The artifact's "Limits & next" and closing line become the Reflection block.
 */
const NS = "/assets/northstar";
const nsIntro: Tab["intro"] = {
  heading: "A CRM that stays honest about what its AI doesn't know",
  body: [
    "Retention teams reactivating dormant enterprise clients work in tools built around modules, not outcomes. The judgment that decides who gets contacted lives outside the system, in exports and spreadsheets, where nobody can audit it.",
    "Northstar starts from a business outcome. The AI investigates and drafts, people keep authority over consequential decisions, and the handoffs between them are designed rather than left to chance.",
  ],
};
const ns = (file: string, alt: string, ratio = 1.6): Block => ({ type: "image", src: `${NS}/${file}.webp`, tone: "screen", alt, ratio });
const northstar: CaseStudy = {
  slug: "northstar",
  title: "An AI-native CRM that shows its uncertainty",
  lede: "Northstar is a working prototype of a goal-driven CRM for retention teams. I designed the journey from a stated goal to an audited action, then built it end to end as a React and TypeScript front end on synthetic data: 7 flows, 3 roles and 10 designed failure scenarios.",
  heroAlt: "Northstar investigation summary: 11 eligible clients, 14 needing review, a draft audience of 10, a recommended strategy marked Draft, and a Next decision panel",
  heroSrc: `${NS}/summary.webp`,
  heroRatio: 1.6,
  heroMax: 1068,
  heroTone: "screen",
  meta: [["Role", "Product design, systems thinking & front-end engineering"], ["Focus", "Explainable AI / Human control / Safe execution"], ["Status", "Working prototype on synthetic data"]],
  reflection: {
    eyebrow: "limits & next",
    heading: "What this is, and what it isn't yet",
    body: [
      "Still a prototype. The data is 36 invented clients built to exercise eligible, uncertain and excluded paths, and execution is simulated: no real email was sent and no live CRM or provider was connected. The design reasoning comes from the problem framing, not from studies with retention or compliance teams, and nothing here measures reactivation, conversion or time saved.",
      "Next: test the journey with real retention managers and approvers and watch where they hesitate at each seam. Measure time to a trusted decision, not clicks saved. Learn which conflicts teams resolve fastest and which they escalate. Then connect a real data source behind the same boundary, keeping execution simulated until approvals hold under load.",
    ],
    pull: "The AI does the investigating. People keep the authority. The space between them is designed, not left to chance.",
  },
  tabs: {
    design: {
      intro: nsIntro,
      blocks: [
        { type: "text", eyebrow: "the experience", heading: "From a goal to an audited action, in one connected thread", body: ["The journey runs Goal, Investigation, Evidence, Opportunities, Refinement, Approval, Execution and Recovery. Every screen belongs to one investigation, so a finding, the plan it led to and the approval it needed never lose their connection."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Designed", list: ["10 Figma screens across 7 flows", "States the screens didn't cover: running investigation, impact review, approval outcomes, execution recovery", "Role and autonomy boundaries"] },
          { kicker: "Implemented", list: ["A working prototype of every flow", "Plan versioning and approval of an exact version", "Role-based actions, audit log, simulated execution with safe retries"] },
          { kicker: "Validated", list: ["An end-to-end Fresh Start journey on synthetic data", "13 unit and component tests and a 10-step journey test", "WCAG 2.1 AA scan, zero violations across 9 screens"] },
          { kicker: "Still a prototype", list: ["Synthetic clients and simulated sends", "No user research or business metrics yet", "Never connected to a live CRM or email provider"] },
        ] },
        { type: "text", eyebrow: "goal · workspace", heading: "The home screen asks for an outcome, then shows the next decision", body: ["First-time users see a goal composer, three suggested goals and a short explanation of what happens next. There are no empty charts. Returning users see Needs attention and Continue work, ordered by the next useful decision rather than the last page they opened.", "The list depends on the role. A retention manager sees “Waiting for approval of plan v1”. An approver sees the same item as “Authorize plan v1”."] },
        ns("first-run", "First-run workspace with a welcome message, a Create your first business goal button, onboarding steps and suggested goals"),
        { type: "text", body: ["First run: one primary action, and suggested goals that fill in the composer and stay editable before anything runs."] },
        ns("home", "Returning workspace with a goal composer, a Needs attention list showing consent review, approval needed and findings ready, and a Continue work list"),
        { type: "text", body: ["Returning: a new goal is always one line away, pending decisions come first and are tagged by type, and Continue work links to the next decision, not the last screen."] },
        { type: "text", eyebrow: "investigation · seam 1", heading: "The AI shows its work while it runs, and reports findings, not verdicts", body: ["An investigation shows what it is checking as it goes: interpreting the goal, gathering evidence, verifying consent and KYC, classifying, drafting a plan. The progress screen states the boundary plainly: investigations only read evidence.", "When it finishes, the badge reads Investigation complete while the goal reads review ready. They are separate states on purpose. Finishing the analysis doesn't mean the business goal is met, and the interface never suggests otherwise."] },
        ns("running", "Investigation in progress, with five steps, two complete, a progress bar and a note that investigations only read evidence"),
        { type: "text", body: ["Progress is calculated from the start time, so it survives a page reload. The read-only boundary is stated where the user is waiting, which is when they wonder what the system is doing. This screen is not in the original Figma file. I designed it during the build to cover the gap between submitting a goal and seeing findings."] },
        { type: "text", eyebrow: "opportunities · seam 2", heading: "“Needs review” and “omitted by criteria” look alike. They are different problems", body: ["A client can be left out of outreach for two very different reasons. Held for review means the evidence conflicts, so a person must resolve it. Omitted by criteria means the client qualifies but the current plan rules leave them out, so the fix is a plan change. Each state has its own label, colour and next action.", "Inside a client record, each piece of evidence names its source and observation time, and is marked either Verified fact or Conflict. The AI never picks a side between conflicting records. It shows both."] },
        ns("opportunities", "Reactivation opportunities table with an amber banner saying 14 records need evidence review, and a Plan status column showing Omitted by criteria and In current plan"),
        { type: "text", body: ["The uncertain group is announced before the table, together with what is still safe: verified clients can continue. Plan status is its own column, separate from eligibility."] },
        ns("client-conflict", "Client sheet for Omar Haddad: Needs review, consent Unknown, held out of outreach until reviewed"),
        { type: "text", body: ["Conflict: the headline says why this client is held, and the uncertain field is flagged inside the facts, not hidden in a tooltip."] },
        ns("client-omitted", "Client sheet for Tariq Bello: eligible, omitted by criteria for plan v1, with a Refine current plan button and a verified last-trade fact"),
        { type: "text", body: ["Omitted: the status comes with its own fix, refine the plan or exclude the client explicitly in the next version. Facts carry their source and the time they were observed."] },
        { type: "text", eyebrow: "refinement · seam 3", heading: "You can't save a plan change until you've seen who it affects", body: ["Refining a plan always creates a new version. Plan v1 stays untouched. Save as new version stays locked until the user runs Review impact, which lists the audience before and after, by name, with the rule that removed each person.", "If the user edits anything after reviewing, the impact review is marked out of date and saving locks again. This is the same rule that governs approvals, applied one step earlier: a decision only counts for the exact inputs it was made on."] },
        ns("refine-impact", "Refine plan v2 drawer with an impact review showing the audience going from 10 to 5, with named clients removed and the reasons"),
        { type: "text", body: ["Reviewed: 10 to 5 clients, each removal explained, and saving unlocks only now."] },
        ns("refine-stale", "The same drawer after an edit: the impact review is labelled out of date and saving is disabled until it is reviewed again"),
        { type: "text", body: ["Stale: the old review fades and is labelled out of date, and the footer explains why saving locked and how to unlock it."] },
        { type: "text", eyebrow: "approval · seam 3", heading: "Requesting approval doesn't send anything. Approval covers one version", body: ["The campaign screen splits into the plan and an authorization rail. The rail names the executable candidate: plan version, audience size, channel. It says outright that requesting approval does not execute outreach, because people hesitate before buttons that might have side effects.", "The approver sees the same plan with different controls: approve this version, or request changes with a required note. The approval states that version number in writing."] },
        ns("campaign-draft", "Campaigns screen with plan v2 draft and a Prepare authorization rail with a Request approval button"),
        { type: "text", body: ["Manager view: the exact thing being authorized, and the side effects of the button, stated up front."] },
        ns("campaign-review", "Approver view with an awaiting approval badge, Approve plan v2 and Request changes buttons, and a note that approval applies only to version 2"),
        { type: "text", body: ["Approver view (labelled Compliance Reviewer in the build): the version is in the button label, and any later change needs a new approval."] },
        { type: "text", eyebrow: "execution · seam 4", heading: "Every consequential step leaves a record a person can read and a system can verify", body: ["Execution asks for one last confirmation with the real number of recipients. The Activity log then separates AI and system, human decisions and execution. Each event has a plain-language summary, the key numbers and the technical record underneath, so a compliance reviewer and an engineer can read the same event."] },
        ns("execute-confirm", "Confirmation dialog: Schedule outreach to 5 clients, using the approved plan v2 draft, recorded as an execution event"),
        { type: "text", body: ["The confirmation states the count, the version and that the step is recorded. It does not say “Are you sure?”."] },
        ns("activity", "Activity log filtered into AI and system, Human decisions and Execution, showing an Outreach scheduled event with its technical record expanded"),
        { type: "text", body: ["Filters by who acted, events that state the outcome in plain language, and the structured record behind a disclosure with a copy button."] },
        { type: "text", heading: "On phones", body: ["The Figma file was desktop only. On phones, tables become cards, side drawers go full screen, and the uncertainty banner stays above the list."] },
        { type: "image", src: `${NS}/phone-summary.webp`, tone: "screen", alt: "Investigation summary on a phone, awaiting approval", ratio: 780 / 1328, width: 340 },
        { type: "image", src: `${NS}/phone-opps.webp`, tone: "screen", alt: "Opportunities on a phone, filtered to records that need review, shown as cards", ratio: 780 / 1328, width: 340 },
      ],
    },
    think: {
      intro: nsIntro,
      blocks: [
        { type: "text", eyebrow: "the problem", heading: "A CRM asks which workflow you want. A retention team has a goal.", body: ["A retention manager doesn't want a dashboard. They want dormant enterprise clients to come back this month, without emailing someone who withdrew consent. In a traditional CRM, the judgment that decides who gets contacted lives outside the system, in exports and spreadsheets, where nobody can audit it."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Workflow-driven CRM", title: "The user does the investigation.", list: ["Open the dormant-accounts dashboard (human)", "Build filters for inactivity and deposits (human)", "Export a report to a spreadsheet (human)", "Check consent in another system (gap)", "Decide who is “probably fine” (unrecorded)", "Send the campaign (irreversible)"], lines: ["The riskiest decisions happen where the system can't see them."] },
          { kicker: "Northstar", title: "The user makes the decisions.", list: ["State the business goal (human)", "Investigate records against the goal (AI)", "Inspect evidence and resolve conflicts (uncertain)", "Refine the plan, preview its impact (human)", "Authorize one exact plan version (approver)", "Execute, reconcile, retry safely (system)"], lines: ["Each step leaves a record of who, or what, decided, and from which evidence."] },
        ] },
        { type: "pull", heading: "Design challenge", text: "How might we turn CRM work from manual task execution into goal-driven, AI-assisted decisions, without giving up transparency, safety or human control?" },
        { type: "text", eyebrow: "the core idea", heading: "Most AI products design the answer. Northstar designs the space around it.", body: ["An AI that reaches a conclusion is the easy part. Trust breaks in the handoffs: between what the model concluded and what it actually saw, between what it knows and what it can't know, between a human's approval and what gets executed, and between a failed send and a safe retry. I treated these four seams as the product."] },
        { type: "cards", cols: 2, items: [
          { n: "01", kicker: "Seam 1 · AI reasoning", title: "Show the evidence", lines: ["“What did it actually look at?”", "Findings link to the client records behind them. Evidence carries a freshness date. Every number opens its source."] },
          { n: "02", kicker: "Seam 2 · Uncertainty", title: "Keep the unknown visible", lines: ["“What doesn't it know?”", "Conflicting or missing evidence becomes its own state. Uncertain consent is never treated as permission."] },
          { n: "03", kicker: "Seam 3 · Human decision", title: "Bind approval to a version", lines: ["“Who decided, on what, exactly?”", "Edits create a new version. Approval covers one version. A change makes earlier reviews and approvals stale."] },
          { n: "04", kicker: "Seam 4 · Execution", title: "Design the recovery", lines: ["“What happened, and is it safe to retry?”", "Completed, failed and unknown outcomes stay distinct. Unknowns are reconciled before retrying. Completed actions are never repeated."] },
        ] },
        { type: "text", eyebrow: "classification · seam 2", heading: "Uncertain is a destination, not a rounding error", body: ["Every client record goes through the same questions. Only one path leads into an audience, and even that path ends at a person, not at a send."] },
        { type: "cards", cols: 3, items: [
          { kicker: "Evidence present? No", title: "Held · missing", lines: ["Says what is missing; no conclusion drawn."] },
          { kicker: "Sources agree? No", title: "Held · conflict", lines: ["Both records shown; a person resolves it."] },
          { kicker: "Consent unknown", title: "Held · review", lines: ["Never treated as permission."] },
          { kicker: "Consent withdrawn", title: "Excluded", lines: ["With the rule that excluded it."] },
          { kicker: "Matches plan? No", title: "Omitted", lines: ["Eligible; fixed by refining the plan."] },
          { kicker: "Matches plan? Yes", title: "Draft audience", lines: ["Still needs a human approval."] },
        ] },
        { type: "text", eyebrow: "autonomy", heading: "Four kinds of action, decided before any prompt was written", body: ["Autonomy is a design property, not a model setting. I sorted every action in the journey into one of four groups, and the interface follows from that sorting. A button lives where its group says it may."] },
        { type: "cards", cols: 2, items: [
          { kicker: "AI may do", title: "Without asking", list: ["Read CRM evidence against the goal", "Classify records as eligible, uncertain or excluded", "Draft a plan and outreach copy", "Calculate the impact of a proposed edit"] },
          { kicker: "AI does, then tells", title: "With notification", list: ["Investigation completed or stopped", "Plan version generated", "Evidence freshness and source gaps", "AI provider unavailable"] },
          { kicker: "Needs a person", title: "With approval", list: ["Resolving uncertain consent or eligibility", "Saving a changed plan version", "Authorizing a plan for execution", "Retrying an action whose outcome is unknown"] },
          { kicker: "Must never", title: "Hard limits", list: ["Treat unknown consent as permission", "Execute on a stale or unapproved version", "Answer follow-up questions without evidence to ground them", "Repeat an action that already completed"] },
        ] },
        { type: "cards", cols: 3, items: [
          { kicker: "Retention Manager", list: ["Set goals and run investigations", "Review opportunities and refine plans", "Request approval for a plan version", "Inspect evidence, plans and the audit log"] },
          { kicker: "Approver", list: ["Authorize or return a plan version", "Inspect evidence, plans and the audit log"] },
          { kicker: "Viewer", list: ["Inspect permitted items only"] },
        ] },
        { type: "text", eyebrow: "failure catalogue", heading: "Ten things that go wrong, designed before the happy path was finished", body: ["Each failure answers the same four questions in the interface: what happened, why, what is still safe, and what the user can do next. A failure that can't answer all four isn't designed yet."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Seam 2", title: "Missing evidence", lines: ["User sees which fact is missing, on the client record.", "Still safe: no conclusion is drawn from the gap.", "Next: held for review until the evidence arrives."] },
          { kicker: "Seam 2", title: "Conflicting evidence", lines: ["User sees both records, labelled Conflict, with their sources.", "Still safe: the AI never quietly chooses one.", "Next: a person resolves the conflict on the record."] },
          { kicker: "Seam 2", title: "Uncertain consent", lines: ["User sees “Held for review” in the plan status column.", "Still safe: the client is excluded from every audience.", "Next: human review before any outreach."] },
          { kicker: "Seam 1", title: "Invalid recommendation", lines: ["User sees the rule the plan breaks, at the field.", "Still safe: output is checked against business rules before display.", "Next: correct or revise it as a new version."] },
          { kicker: "Seam 3", title: "Restricted permissions", lines: ["User sees who can act, and how to hand off to them.", "Still safe: review, approval and execution are blocked for that role.", "Next: hand off to the right role."] },
          { kicker: "Seam 3", title: "Stale approval", lines: ["User sees that the approval belongs to an earlier version.", "Still safe: the changed plan cannot run on the old approval.", "Next: request approval for the new version."] },
          { kicker: "Seam 4", title: "Failed execution", lines: ["User sees exactly which actions failed.", "Still safe: completed actions are left alone.", "Next: a controlled retry of the failed actions only."] },
          { kicker: "Seam 4", title: "Unknown outcome", lines: ["User sees “Unknown”, not a guess of sent or failed.", "Still safe: no retry until the status is reconciled.", "Next: reconcile the status, then decide."] },
          { kicker: "Seam 1", title: "AI provider unavailable", lines: ["User sees “Grounded follow-ups are not available”, with the reason.", "Still safe: no made-up answers to fill the gap.", "Next: work continues from verified findings."] },
          { kicker: "Seam 4", title: "Duplicate action", lines: ["User sees completed actions marked as skipped on retry.", "Still safe: execution safeguards stop repeat sends.", "Next: nothing to do. The record shows why."] },
        ] },
        { type: "text", eyebrow: "recovery · seam 4", heading: "Ten sends. Eight complete, one failed, one unknown. Now what?", body: ["This is the run from the prototype's verification journey. The tempting design is a single “Retry” that sends to anyone not marked complete. That would resend to the unknown client, who may already have received the email. Northstar treats the three outcomes differently."] },
        { type: "cards", cols: 3, items: [
          { n: "01", kicker: "Outcomes reported", title: "Keep three states, not two", lines: ["8 completed, 1 failed, 1 unknown. “Unknown” is shown as it is. Showing it as failed invites a duplicate send. Showing it as sent hides a possible gap."] },
          { n: "02", kicker: "Reconcile", title: "Resolve the unknown first", lines: ["The unknown action's status is reconciled with the execution record before it can be retried."] },
          { n: "03", kicker: "Controlled retry", title: "Retry only what failed", lines: ["Safeguards on each action skip the eight completed sends. The retry covers only the failure, and the log records why each action was skipped."] },
        ] },
        { type: "text", body: ["Verified in the prototype: retrying did not duplicate the successful actions. The run used synthetic data and a simulated execution channel."] },
        { type: "text", eyebrow: "approval · staleness", heading: "An approval is a promise about one version. Edits break it, on purpose", body: ["Plan v1 is drafted: the AI proposes 10 verified clients. The approver authorizes v1, by number. Then the manager excludes a client, and v1's approval no longer describes what would run. Plan v2 is a new version, impact is reviewed again and v1 stays in history, unchanged. Only an approval of v2 can release v2.", "In the build, a plan that is awaiting approval can't be refined. The request must be withdrawn first, so nobody can change a plan while someone else is reviewing it."] },
        { type: "text", eyebrow: "trade-offs", heading: "Every safety rule costs some speed. These are the trades I chose", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Chose", title: "Outcome-first workspace", lines: ["Over module navigation: contacts, deals, reports.", "Cost: less familiar to people used to classic CRMs, who expect a module menu."] },
          { kicker: "Chose", title: "Evidence before recommendation", lines: ["Over a confident one-line answer.", "Cost: more to read before acting. Every number links to its source to keep that short."] },
          { kicker: "Chose", title: "Visible uncertainty", lines: ["Over a cleaner list that hides 14 open questions.", "Cost: the product looks less finished. That's accurate, so it stays."] },
          { kicker: "Chose", title: "Exact-version approval", lines: ["Over approving “the campaign”.", "Cost: small edits need re-approval. Impact review makes each one quick to judge."] },
          { kicker: "Chose", title: "Disabled follow-ups when ungrounded", lines: ["Over a chat box that always answers.", "Cost: the feature can look missing. The disabled state explains why."] },
          { kicker: "Chose", title: "Persistent decision threads", lines: ["Over disposable AI conversations.", "Cost: more structure to model, but findings, plans and approvals stay linked to their investigation."] },
          { kicker: "Chose", title: "Bounded execution", lines: ["Over end-to-end automation.", "Cost: slower than a fully automated send, and more explainable when something goes wrong."] },
        ] },
      ],
    },
    build: {
      intro: nsIntro,
      blocks: [
        { type: "text", eyebrow: "the implementation", heading: "The safety rules are in the system, not only in the UI", display: true, body: ["A disabled button is not a control. The rules from the Think section (versioning, approval scope, role checks, idempotent retries) are enforced below the interface, and the interface reflects them."] },
        { type: "text", eyebrow: "architecture", heading: "The AI provider sits behind a boundary. Nothing it returns is trusted by default", body: [] },
        { type: "cards", cols: 3, items: [
          { kicker: "Layer 1", title: "Interface", list: ["Workspace", "Investigation", "Opportunities", "Plan refinement", "Campaigns", "Activity"], lines: ["Requests carry the user's role."] },
          { kicker: "Layer 2", title: "Application", list: ["Permission checks", "Validation", "State persistence"] },
          { kicker: "Layer 3", title: "Domain services", list: ["Investigation", "Planning and versioning", "Approval (exact version)", "Execution (safe retries)", "Audit log, written by every service"] },
          { kicker: "Boundary", title: "AI provider", list: ["Structured responses only", "Checked against business rules", "Unavailable: follow-ups disabled"] },
          { kicker: "Layer 4", title: "Data and channels", list: ["Synthetic CRM records", "Simulated execution channel"] },
        ] },
        { type: "text", eyebrow: "mechanisms", heading: "How the rules hold", body: [] },
        { type: "cards", cols: 3, items: [
          { title: "Plan versioning", lines: ["Plans are never edited in place. A refinement writes version n+1 that records which version it came from. History is append-only."] },
          { title: "Exact-version approval", lines: ["An approval stores the version it covers. Execution only runs the version that was approved, so a newer version needs its own approval."] },
          { title: "Structured AI output", lines: ["The model returns structured data, not prose. Each response is checked against business rules before the user sees it, and fixed or rejected if it fails."] },
          { title: "Safe retries", lines: ["Execution safeguards track each action, so a retry skips the ones that already completed. Unknown outcomes are reconciled before they can be retried."] },
          { title: "Role permissions", lines: ["Restricted roles can't review, approve or execute. The check guards the action itself, so hiding a button is never the only safeguard."] },
          { title: "Audit log", lines: ["Every service writes events with a plain-language summary and a technical record. People and tools read the same history."] },
        ] },
        { type: "text", eyebrow: "front end", heading: "A front end rebuilt to match the Figma, with every state addressable by link", body: ["The Figma file was rebuilt as a React and TypeScript front end. Colour, type and spacing tokens were taken directly from the file. Filters, sorting, open drawers and the selected plan version all live in the URL, so any state can be shared, reloaded or opened from a link in the Activity log. Animations respect the reduced-motion setting, and drawers trap focus and return it on close."] },
        { type: "cards", cols: 2, items: [
          { n: "13", title: "Unit and component tests", lines: ["Audience rules, next-decision logic, goal validation."] },
          { n: "10/10", title: "Journey steps passed", lines: ["In the automated test that walks the whole journey."] },
          { n: "0", title: "WCAG 2.1 AA violations", lines: ["In an axe scan of 9 screens and drawers."] },
          { n: "3", title: "Widths checked", lines: ["375, 768 and 1440px, with no horizontal scrolling."] },
        ] },
        { type: "text", eyebrow: "validation", heading: "What the end-to-end prototype run verified", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Fresh Start run", list: ["First-time workspace and goal creation", "Investigation and supporting evidence review", "Uncertainty resolution", "Plan revision and impact preview", "Handoff to the approver and approval of the exact version", "Controlled, simulated execution", "Recovery from failed operations", "Returning workspace with investigation history"] },
          { kicker: "Results", list: ["11 clients initially eligible", "14 to 13 uncertain records after one resolution", "10 clients in the revised target audience", "8 completed, 1 failed, 1 unknown execution outcomes", "0 duplicated actions after retry"] },
        ] },
        { type: "text", body: ["Prototype verification on synthetic data. These numbers confirm the system behaved correctly. They are not customer results or business impact."] },
      ],
    },
  },
};

caseStudies.push(clientlens, activepieces, northstar);

export const tabLabels: Record<TabKey, string> = { design: "Design", think: "Think", build: "Build" };
export const tabOrder: TabKey[] = ["design", "think", "build"];
export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
