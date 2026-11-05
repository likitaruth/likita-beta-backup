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
      { label: "Works", href: "/#selected-work" },
      { label: "About Me", href: "/#about" },
      // FLAG: "Play A Game" exists in the Menu frame but no game/page frame exists yet.
      { label: "Play A Game", href: "/play" },
      { label: "Hit Me Up", href: "/#contact" },
    ],
  },

  hero: {
    ethos: ["DESIGNER.", "THINKER.", "BUILDER"],
    line1: "PRODUCT",
    line2: "DESIGN",
    purpose: { lead: "FOR ", strong: "INCLUSIVITY,", italic: " IMPACT & SOLUTIONS", end: "." },
    cta: "Scroll to explore",
    welcome: "Hello, I’m Likita, Have a fun scroll!",
  },

  works: { eyebrow: "SELECTED WORKS", cta: "View Project" },

  about: {
    eyebrow: "ME IN BRIEF.",
    // FLAG: the subtitle is identical placeholder copy in all four Figma rows.
    rows: [
      { n: "01", title: "WHO?", sub: "The name and person.", href: "/about#who" },
      { n: "02", title: "HOW?", sub: "The name and person.", href: "/about#how" },
      { n: "03", title: "WHY?", sub: "The name and person.", href: "/about#why" },
      { n: "04", title: "AUDIENCE?", sub: "The name and person.", href: "/about#audience" },
    ],
    // Figma "Group 1000001479" (hover state): the small character thumbnail carries a "Likita" hand-written label.
    label: "Likita",
  },

  contact: {
    eyebrow: "Reach out",
    headlineLead: "/LETS BUILD SOMETHING",
    headlineEmphasis: "MEANINGFUL.",
    body: "Wanna chat, discuss a project or want me to speak on a project?",
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
      { label: "Works", href: "/#selected-work", style: "display" },
      { label: "About Me", href: "/#about", style: "italic" },
      { label: "Hit Me Up", href: "/#contact", style: "display" },
    ],
    // FLAG: Figma shows three pills (Gmail / LinkedIn / Mail) with no URLs. LinkedIn URL is missing.
    socials: [
      { label: "Gmail", href: "mailto:likitaconnect@gmail.com" },
      { label: "LinkedIn", href: null as string | null },
      { label: "Mail", href: "mailto:likitaconnect@gmail.com" },
    ],
    credit: { a: "Likita", b: " with ", c: "love 2026" },
    copyright: "© 2026",
  },
} as const;
