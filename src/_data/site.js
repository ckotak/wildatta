// All copy lives here so it is easy to edit in one place.
//
// PLACEHOLDERS: anything passed through ph() in the templates, and anything
// listed under `placeholder` below, is invented stand-in copy that Chetan
// needs to confirm or replace. While `showPlaceholders` is true, placeholder
// text is underlined with a dotted line and a "Placeholder" note appears at the
// top of the page. Set it to false before launch to turn the markers off.

export default {
  name: "Wild Atta",
  // The one place the public address lives. Canonical, Open Graph and sitemap-style
  // absolute URLs are all built from it. No trailing slash.
  url: "https://wildatta.com",
  title: "Wild Atta – naturally fermented sourdough bread in Gilroy, CA",
  locale: "en_US",
  themeColor: "#F7EFE5",
  // Link-preview image, 1200x630. Path is relative to the site root.
  share: {
    image: "assets/img/share.jpg",
    width: 1200,
    height: 630,
    alt: "Wild Atta logo: a hand-lettered wordmark with wheat sprigs, beside the words “Naturally fermented sourdough bread. Gilroy, CA.”",
  },
  tagline: "Naturally fermented sourdough bread. Gilroy, CA.",
  description:
    "Naturally fermented sourdough bread. Gilroy, CA. Baked one batch at a time.",
  showPlaceholders: true,

  // Privacy-friendly visitor stats: Cloudflare Web Analytics. It sets no cookies and
  // needs no consent banner. Paste the site token from Cloudflare (Analytics & Logs >
  // Web Analytics > your site > Manage site > JS snippet, the value after "token":).
  // The token is public by design. Leave it empty to turn analytics off.
  analytics: { cloudflareToken: "858508dc08994431a6aa6fee1b2818d2" },

  // Public social profiles. Add more here (and they appear in the Find section).
  social: [
    { label: "Instagram", handle: "@wildatta", href: "https://www.instagram.com/wildatta/" },
  ],

  nav: [
    { label: "Story", href: "#story" },
    { label: "Bakes", href: "#bakes" },
    { label: "Process", href: "#process" },
    { label: "Find me", href: "#find" },
  ],

  hero: {
    title: "Naturally fermented sourdough bread, baked one batch at a time in Gilroy, CA.",
    lead: "Wild yeast, wholemeal flour, salt, water, and about thirty hours. That’s the whole recipe.",
    cta: "This week’s bake",
    photo: { label: "Hero – crust, close", note: "Warm natural light, cream ground, one whole loaf" },
  },

  story: {
    eyebrow: "The story",
    script: "One",
    title: "person, one oven",
    photo: { label: "The baker", note: "Hands, flour, morning light" },
    paragraphs: [
      "I fed a jar of flour and water in 2021 and never quite stopped. Everything here is mixed by hand in my kitchen, proofed overnight, and baked the morning you collect it. I bake what I can bake properly – usually eight to twelve loaves, twice a week.",
      "No mixer worth the name, no shortcuts worth taking. Just the flour I grew up eating and a fermentation that keeps its own schedule.",
    ],
    quote: "Nothing here rises faster than it wants to.",
    quoteBy: "Gilroy, CA",
  },

  bakes: {
    eyebrow: "What I bake",
    title: "Three things, done properly",
    week: "Week of 30 November",
    allergen: "Contains wheat",
    note: "The list changes with the week and the weather.",
    items: [
      {
        name: "Country wholemeal",
        description: "Half stone-milled atta, half bread flour. Deep crust, open crumb, faintly nutty.",
        meta: "30-hour ferment",
        tags: ["Bakes Thursday"],
      },
      {
        name: "Ajwain & sea salt",
        description: "Carom seed through the crumb, flaked salt on top. Eat it with butter and nothing else.",
        meta: "24-hour cold proof",
        tags: ["Bakes Friday"],
      },
      {
        name: "Cardamom cinnamon rolls",
        description: "Sourdough enriched with butter and cardamom, rolled tight, baked in a tray of six.",
        meta: "Overnight proof",
        tags: ["Fridays only", "Six per tray"],
      },
    ],
  },

  process: {
    eyebrow: "The process",
    script: "Slow",
    title: "is the method, not the marketing",
    lead: "Roughly thirty-two hours from feeding the starter to pulling the loaf. Most of that is waiting, which is the part that matters.",
    steps: [
      { hours: "12 hours", title: "Feed the starter", body: "The same culture since 2021. It gets flour and water the night before, and it decides when it’s ready." },
      { hours: "1 hour", title: "Mix and rest", body: "Flour, water, salt. An autolyse, then folds by hand every half hour. No machine touches the dough." },
      { hours: "18 hours", title: "Cold proof", body: "Shaped and into the fridge overnight. The long, cold ferment is where the flavour comes from." },
      { hours: "45 minutes", title: "Bake", body: "Cast iron, full steam, dark crust. Out of the oven the morning you collect it – never the day before." },
    ],
    photos: [
      { label: "Crumb, cut", note: "Full-bleed, warm, shallow depth" },
      { label: "Flour on the bench" },
    ],
  },

  find: {
    eyebrow: "Where to find me",
    title: "Gilroy, and about five miles around it",
    places: [
      { tag: "Pickup", tone: "brown", title: "From my porch", body: "Thursday and Friday, 4–7pm. I’ll send the address when you get in touch." },
      { tag: "Delivery", tone: "terracotta", title: "Within five miles", body: "Gilroy, Morgan Hill and San Martin. Free over two loaves, otherwise $4." },
    ],
    contact: {
      text: "To get a loaf, send me a message on Instagram.",
      // Phone and email are deliberately left out of the site for now, to keep them
      // away from scraping bots. To bring them back, add `phone`, `phoneHref`,
      // `smsHref`, `email` and `emailHref` here and restore the links in
      // src/index.njk. Do not commit them until Chetan says to.
    },
  },

  footer: {
    permit: "PT0508049",
    county: "Santa Clara County",
    legal: "Made in a home kitchen. Wild Atta is a California Cottage Food Operation, permit",
    legalEnd: "Not inspected by the California Department of Public Health.",
    allergens: "Made in a home kitchen that handles wheat, rye, milk, butter, eggs and tree nuts.",
    year: 2026,
  },
};
