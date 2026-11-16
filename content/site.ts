/**
 * Homepage copy, verbatim from Figma (frame "Homepage", node 2144:11229).
 * FLAG comments mark gaps that need designer input — nothing here is invented.
 */
export const site = {
  owner: "Likita",
  email: "likitaconnect@gmail.com", // Figma frame "Contact/On Hover" (2077:9236)

  nav: {
    customize: "CUSTOMIZE",
    menu: [
      { label: "Home", href: "/" },
      { label: "Works", href: "/works" },
      { label: "About Me", href: "/about" },
      // FLAG: "Play A Game" exists in the Menu frame but no game page frame does; it opens the game preview on About Me.
      { label: "Play A Game", href: "/about#audience" },
      { label: "Hit Me Up", href: "/contact" },
    ],
  },

  hero: {
    ethos: ["DESIGNER.", "THINKER.", "BUILDER."],
    line1: "PRODUCT",
    line2: "DESIGN",
    purpose: { lead: "FOR ", strong: "AI-NATIVE CRM", italic: " & B2B SAAS", end: "." },
    cta: "Scroll to explore",
    welcome: "Hello, I’m Likita, Have a fun scroll!",
  },

  works: { eyebrow: "SELECTED WORKS", cta: "View Project", all: "View all works" },
  projectsPage: { titleLead: "/SELECTED ", titleEmphasis: "WORKS", years: "2023 - 2026", cta: "View Project" },

  aboutPage: {
    titleLead: "/BEHIND",
    titleEmphasis: "FRAMES",
    // "Frame 3523" is deliberate: About renders it as the interactive Figma-frame tag (see FigmaFrame).
    paragraphs: [
      "My journey into product design began in customer support and that foundation still shapes how I listen, ask better questions, and design with empathy.",
      "It usually starts around Frame 3523 and I've come to love this industry and the problems I get to solve through it. Over the past four years, I've worked across startups and enterprise CRM, including FeelPixel Studio and MBL Hightech, designing for SaaS, fintech, AI-powered platforms, and automation tools.",
      "I like being involved from the strategy down to the small details, and I care about shipping things that are actually useful.",
    ],
    photoAlt: "Likita working at a desk with two monitors, with a candle on the desk and a shelf of plants behind",
    gameLabel: "Game: Two truths and a lie.",
  },

  about: {
    eyebrow: "ME IN BRIEF.",
    rows: [
      { n: "01", title: "Who?", sub: "The name, person and origin", note: "nice to meet you!", href: "/about#who" },
      { n: "02", title: "How?", sub: "From customer support to product design", note: "ticket → flow", href: "/about#how" },
      { n: "03", title: "Why?", sub: "Curiosity and meaningful work", note: "always asking “what if?”", href: "/about#why" },
      { n: "04", title: "Audience?", sub: "Design for all", note: "every body, every screen", href: "/about#audience" },
    ],
    // Accessible label for the About video shown in the "Who?" panel.
    videoLabel: "Likita at her desk, working",
  },

  contactPage: {
    first: "HIT ",
    firstEmphasis: "ME",
    second: "UP",
    // Figma copy reads "@likitaconnect@gmail.com" (stray leading @) — rendered as the plain address. FLAG: confirm.
    lead: "Feel free to reach out to me directly ",
  },

  contact: {
    eyebrow: "Reach out",
    headlineLead: "/LET’S BUILD SOMETHING",
    headlineEmphasis: "MEANINGFUL.",
    body: "Want to chat or collaborate on a project? I'd love to hear from you.",
    cta: "Email me",
    note: "Good ideas start with a cup of coffee.",
  },

  footer: {
    quote: [
      { t: "Do", em: true },
      { t: " or " },
      { t: "do not", em: true },
      { t: ", there is no " },
      { t: "try.", em: true },
    ],
    nav: [
      { label: "Works", href: "/works", style: "display" },
      { label: "About Me", href: "/about", style: "italic" },
      { label: "Hit Me Up", href: "/contact", style: "display" },
    ],
    socials: [
      { label: "Gmail", href: "mailto:likitaconnect@gmail.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ruthlikita/" },
      { label: "Mail", href: "mailto:likitaconnect@gmail.com" },
    ],
    credit: { a: "Likita", b: " with ", c: "love 2026" },
    copyright: "© 2026",
  },
} as const;
