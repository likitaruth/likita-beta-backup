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
  | { type: "text"; eyebrow?: string; heading?: string; body: string[]; size?: 18 | 21 }
  | { type: "image"; alt: string; ratio: number; width?: number }
  | { type: "cards"; cols: 2 | 3; items: { n?: string; title?: string; lines?: string[]; list?: string[] }[] }
  | { type: "pull"; text: string };

export type Tab = { intro: { eyebrow: string; heading: string; body: string[] }; blocks: Block[] };

export type CaseStudy = {
  slug: string;
  title: string;
  lede: string;
  heroAlt: string;
  /** Up to three label/value pairs shown under the hero (Figma: Role / Focus / Year). */
  meta: [string, string][];
  reflection: { eyebrow: string; heading: string; body: string[]; pull: string };
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
 * ClientLens + Activepieces — migrated from likita.dev/works/owigo and likita.dev/works/activepieces.
 * FLAGS:
 *  - The page reader could only return summaries and short quotes, not verbatim paragraphs. Copy below is a faithful
 *    rewrite of what each section says (no facts, numbers or claims added). Paste the exact original text over it if
 *    you want word-for-word parity.
 *  - Neither page states a year, so the third meta slot is Industry. Neither lists implementation internals, so each
 *    Build tab holds system / outcome / collaboration / measurement material only.
 *  - Image slots follow the source page order and captions; every image is a placeholder until exported
 *    (likita.dev is blocked from the build sandbox).
 *  - The source page lists "Teamforce" as client for ClientLens in one read and "ClientLens" as context in another; omitted.
 */
const clientlens: CaseStudy = {
  slug: "clientlens",
  title: "Explainable customer intelligence",
  lede: "ClientLens is an AI-powered feature within an enterprise CRM that helps account managers find clients with similar behavioural patterns, understand why they match, and decide what to do next.",
  heroAlt: "ClientLens overview: AI summary, match score, similarities, differences and recommended actions",
  meta: [["Role", "UX/Product Designer & Builder"], ["Focus", "Explainable AI / Similarity Ranking / Decision Support"], ["Industry", "Customer Intelligence"]],
  reflection: {
    eyebrow: "Reflection",
    heading: "Reviewable AI decisions",
    body: [
      "What matters most is the structure around the AI output: where it sits, what evidence supports it, how incomplete data is handled, how a user can challenge it, and how it connects to a decision.",
      "Two directions follow from that. Move from recommendation to execution by linking suggestions to tasks, outreach or campaigns, with a way to give feedback. And make changing patterns visible through comparison history, score-change visibility, cohort comparison and feature-contribution controls.",
    ],
    pull: "The experience moves users from client context to pattern discovery, AI interpretation, evidence and action, instead of asking them to trust a black box.",
  },
  tabs: {
    design: {
      intro: {
        eyebrow: "The solution",
        heading: "Context to evidence to action",
        body: [
          "The workflow starts with a known client, ranks comparisons, keeps both clients in a shared workspace, and adds natural-language interpretation only when the user starts a detailed comparison.",
        ],
      },
      blocks: [
        { type: "image", alt: "ClientLens product flow from Client Detail through Find Similar, Similar Leads, AI Overview, Radar Preview and Deep Compare", ratio: 1068 / 520 },
        {
          type: "text",
          eyebrow: "Client detail",
          heading: "Start from a known client",
          body: ["The reference screen opens with identity, status, segment, deposits, lifetime value, trading activity, risk, redeposit likelihood, engagement and profile-data availability. Find Similar sits inside the client profile, so every search stays tied to a reference client."],
        },
        { type: "image", alt: "Reference-client detail screen with the Find Similar Leads action", ratio: 1068 / 560 },
        {
          type: "text",
          eyebrow: "Ranked similar leads",
          heading: "Rank by evidence",
          body: ["Results are ranked by overall match strength, with category signals, identity, status and segment alongside. High, medium and low bands keep large result sets manageable without a paragraph of explanation for every result."],
        },
        { type: "image", alt: "Ranked similar-client results with match score breakdowns", ratio: 1068 / 560 },
        { type: "image", alt: "Anatomy of the results: persistent reference context, similarity bands and category-level evidence", ratio: 1068 / 560 },
        {
          type: "text",
          eyebrow: "Persistent comparison context",
          heading: "Keep the pair in view",
          body: ["The same client pair stays visible across Overview, Radar Preview and Deep Compare, so the three views read as one workspace rather than disconnected reports."],
        },
        { type: "image", alt: "Radar Preview comparing behavioural and profile similarity across two clients", ratio: 1068 / 560 },
        { type: "image", alt: "Deep Compare feature breakdown with client values and match results", ratio: 1068 / 560 },
        {
          type: "text",
          eyebrow: "When AI is unavailable",
          heading: "Never hide the evidence",
          body: ["If an AI summary can't be generated, the structured scores remain available, so the underlying evidence is always reachable."],
        },
      ],
    },
    think: {
      intro: {
        eyebrow: "The problem",
        heading: "From CRM data to decisions",
        body: [
          "Client data was spread across profiles, transactions, trading, communications and risk modules, so users had to move between them to compare clients.",
          "Access to data was not the core problem. Users needed to know which behaviours produced a match and what action should follow.",
        ],
      },
      blocks: [
        { type: "image", alt: "Before and after: siloed CRM data versus the five-step ClientLens decision journey", ratio: 1068 / 520 },
        {
          type: "text",
          eyebrow: "How might we",
          heading: "Three questions that shaped the work",
          body: ["The design brief reduced to three questions."],
        },
        {
          type: "cards",
          cols: 3,
          items: [
            { title: "Help users move from a known client to comparisons" },
            { title: "Make each match explainable" },
            { title: "Turn evidence into a next step while the user keeps the final decision" },
          ],
        },
        {
          type: "text",
          eyebrow: "Information model",
          heading: "Four information layers",
          body: ["The design separates factual CRM data, calculated similarity, AI interpretation and operational recommendations. Keeping the layers apart stops generated insight from looking like raw customer data."],
        },
        { type: "image", alt: "Layered information model: observed CRM data, calculated similarity, AI interpretation, operational recommendations", ratio: 1068 / 560 },
        { type: "cards", cols: 2, items: [
          { n: "01", title: "Factual CRM data" },
          { n: "02", title: "Calculated similarity" },
          { n: "03", title: "AI interpretation" },
          { n: "04", title: "Operational recommendations" },
        ] },
        {
          type: "text",
          eyebrow: "A progressive decision journey",
          heading: "Five questions, in order",
          body: ["Each step of the product answers one question, moving the user from context to action."],
        },
        { type: "cards", cols: 3, items: [
          { n: "01", title: "Who is the client?" },
          { n: "02", title: "Who is similar?" },
          { n: "03", title: "Why did they match?" },
          { n: "04", title: "Where do they differ?" },
          { n: "05", title: "What should I do?" },
        ] },
      ],
    },
    build: {
      intro: {
        eyebrow: "Outcome",
        heading: "A live intelligence layer",
        body: ["ClientLens is live in the CRM and supports relationship managers and operational teams."],
      },
      blocks: [
        {
          type: "text",
          eyebrow: "AI in the product",
          heading: "Interpretation only when asked",
          body: ["Natural-language interpretation appears only when a user starts a detailed comparison. Up to that point the product shows calculated scores and CRM facts, each kept in its own layer, and the structured scores stay available if a summary can't be generated."],
        },
        {
          type: "text",
          eyebrow: "Measuring the release",
          heading: "Verified metrics come next",
          body: ["Verified usage metrics are not included yet. A measurement phase is planned, tracking the signals below."],
        },
        { type: "image", alt: "Measurement funnel and planned instrumented product metrics", ratio: 1068 / 560 },
        { type: "cards", cols: 2, items: [
          { title: "Discovery", list: ["Time to find a relevant comparison", "Progression to comparison", "Use of deeper views"] },
          { title: "Action", list: ["Recommendation engagement", "Completion and abandonment", "Adoption and post-action outcomes"] },
        ] },
        {
          type: "text",
          eyebrow: "What comes next",
          heading: "Shipped, next, later",
          body: ["The roadmap runs as a continuous improvement cycle: what has shipped, what is next, and later opportunities."],
        },
        { type: "image", alt: "Product roadmap showing shipped, next and later opportunities with a continuous improvement cycle", ratio: 1068 / 560 },
      ],
    },
  },
};

const activepieces: CaseStudy = {
  slug: "activepieces",
  title: "Automation tool redesign",
  lede: "Activepieces is a no-code tool that connects apps such as Gmail, Slack and Discord so users can build workflows, called Pieces, that automate repetitive tasks. Working as UI designer with the founder and a senior designer, I set out to make complex flows simpler.",
  heroAlt: "Activepieces hero presentation",
  meta: [["Role", "UI Designer"], ["Focus", "Workflow Clarity / Builder Experience / Design Systems"], ["Industry", "Automation"]],
  reflection: {
    eyebrow: "Reflection",
    heading: "Clarity for technical products",
    body: [
      "Thoughtful structure adds a lot of value in technically dense products. Clarifying states, flows and component behaviour made automation easier to approach and trust.",
      "The founder's feedback highlighted the value of collaborative design that improves usability and gives the team a shared language.",
    ],
    pull: "Clarity made automation easier to approach and trust.",
  },
  tabs: {
    design: {
      intro: {
        eyebrow: "Design",
        heading: "Redesigning core workflows",
        body: ["The redesign covers four areas: workflow building, trigger selection, sidebar app discovery and dashboard visibility."],
      },
      blocks: [
        { type: "image", alt: "Activepieces builder redesign", ratio: 1068 / 560 },
        { type: "text", eyebrow: "The builder", heading: "Easier to scan, step by step", body: ["The builder is more intuitive and easier to scan, with visual cues that support step-by-step creation."] },
        { type: "image", alt: "Activepieces trigger selection redesign", ratio: 1068 / 560 },
        { type: "text", eyebrow: "Select trigger", heading: "Choose the right trigger with confidence", body: ["Search, filtering and clearer explanations make it easier to pick an accurate trigger."] },
        { type: "image", alt: "Activepieces sidebar apps redesign", ratio: 1068 / 560 },
        { type: "text", eyebrow: "Sidebar apps", heading: "Find and add tools faster", body: ["The sidebar is reorganised so users can find and add tools faster, with clearer icons and guidance."] },
        { type: "image", alt: "Activepieces dashboard redesign", ratio: 1068 / 560 },
        { type: "text", eyebrow: "Dashboard", heading: "A more approachable overview", body: ["A friendlier layout with clearer, more engaging widgets for app activity and workflow status."] },
        { type: "image", alt: "Activepieces tools integration example", ratio: 1068 / 560 },
        { type: "text", eyebrow: "Tools integration", body: ["Workflow integrations are visualised more clearly, so users can see how their app connections relate to one another."] },
      ],
    },
    think: {
      intro: {
        eyebrow: "The problem",
        heading: "Simpler automation flows",
        body: [
          "Users need help understanding a flow at a glance and configuring it without feeling overwhelmed.",
          "The redesign focused on clarity at the moments that matter most: building, triggering and monitoring automations.",
        ],
      },
      blocks: [
        { type: "image", alt: "Activepieces product overview", ratio: 1068 / 560 },
        {
          type: "text",
          eyebrow: "Research",
          heading: "Learning from workflow friction",
          body: [
            "Working closely with the founder and a senior designer exposed usability issues in setting up and managing automations.",
            "That showed where the interface needed more structure, stronger visual cues and a more approachable path through technical tasks, so users could build faster, choose triggers with more confidence and monitor activity with less ambiguity.",
          ],
        },
        { type: "text", eyebrow: "How might we", heading: "Three goals", body: ["The work was guided by three goals."] },
        {
          type: "cards",
          cols: 3,
          items: [
            { title: "Make flows easier to understand across connected apps" },
            { title: "Reduce friction in trigger selection, builder navigation and sidebar tools" },
            { title: "Create a more consistent interface system that aligns design and development" },
          ],
        },
      ],
    },
    build: {
      intro: {
        eyebrow: "System",
        heading: "Material Design system",
        body: ["Material Design was the foundation for consistent UI patterns, typography and colour, which improved collaboration between design and development."],
      },
      blocks: [
        { type: "image", alt: "Activepieces design system overview", ratio: 1068 / 560 },
        { type: "text", eyebrow: "Shared language", heading: "One product language", body: ["Consistency helped build a cohesive product language and sped up both implementation and future features."] },
        { type: "text", eyebrow: "Results", heading: "Faster setup, better confidence", body: ["The redesigned creation experience reduced setup time for complex automations and improved overall satisfaction."] },
        { type: "cards", cols: 2, items: [{ title: "40%", lines: ["reduction in the time users needed to set up complex automations"] }] },
        { type: "image", alt: "Activepieces founder review", ratio: 1068 / 560 },
      ],
    },
  },
};

caseStudies.push(clientlens, activepieces);

export const tabLabels: Record<TabKey, string> = { design: "Design", think: "Think", build: "Build" };
export const tabOrder: TabKey[] = ["design", "think", "build"];
export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
