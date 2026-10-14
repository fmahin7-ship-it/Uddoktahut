/**
 * Landing structure — ids, links, statuses, icons.
 * Copy lives in messages/{bn,en}.json under "Landing", keyed by these ids.
 */

export const LANDING_NAV_LINKS = [
  { id: "ai", href: "#ai" },
  { id: "features", href: "#features" },
  { id: "pricing", href: "#pricing" },
  { id: "roadmap", href: "#roadmap" },
  { id: "faq", href: "#faq" },
];

export const HERO_LINKS = {
  primaryCta: "/signup",
  secondaryCta: "#ai",
};

export const AI_PILLARS = [
  { id: "understand", icon: "brain" },
  { id: "create", icon: "sparkles" },
  { id: "sell", icon: "trending-up" },
  { id: "support", icon: "message-circle" },
];

export const AI_CAPABILITIES = [
  { id: "copilot", pillar: "understand", status: "live" },
  { id: "store-scoped", pillar: "understand", status: "live" },
  { id: "off-topic-guard", pillar: "understand", status: "live" },
  { id: "chat-memory", pillar: "understand", status: "live" },
  { id: "sales-forecast", pillar: "understand", status: "roadmap" },
  { id: "product-seo", pillar: "create", status: "soon" },
  { id: "store-generator", pillar: "create", status: "roadmap" },
  { id: "voice-to-product", pillar: "create", status: "roadmap" },
  { id: "facebook-import", pillar: "create", status: "soon" },
  { id: "pdf-import", pillar: "create", status: "roadmap" },
  { id: "recommendations", pillar: "sell", status: "roadmap" },
  { id: "ai-pricing", pillar: "sell", status: "roadmap" },
  { id: "ai-retargeting", pillar: "sell", status: "roadmap" },
  { id: "customer-chatbot", pillar: "support", status: "roadmap" },
  { id: "order-faq", pillar: "support", status: "roadmap" },
];

export const COMMERCE_FEATURES = [
  { id: "online-store", status: "live" },
  { id: "products-inventory", status: "live" },
  { id: "free-trial", status: "live" },
  { id: "store-themes", status: "beta" },
  { id: "checkout", status: "beta" },
  { id: "order-management", status: "soon" },
  { id: "bd-payments", status: "soon" },
  { id: "delivery", status: "soon" },
];

export const HOW_IT_WORKS_STEPS = ["signup", "setup", "products", "sell"];

export const PRICING_PLANS = [
  { id: "trial", includesAi: true, popular: false, href: "/signup" },
  { id: "basic", includesAi: false, popular: false, href: "/signup" },
  { id: "ai-starter", includesAi: true, popular: false, href: "/signup" },
  { id: "ai-pro", includesAi: true, popular: true, href: "/signup" },
  { id: "ai-business", includesAi: true, popular: false, href: "/signup" },
];

export const ROADMAP_PHASES = [
  { id: "live", status: "live" },
  { id: "soon", status: "soon" },
  { id: "roadmap", status: "roadmap" },
];

export const TESTIMONIALS = ["rabeya", "sohel", "tanvir", "sumaiya"];

export const FAQ_ITEMS = ["what", "live-ai", "trial", "basic-ai", "tokens", "compare", "all-features"];

export const CTA_LINK = "/signup";

/** labelKey is relative to the "Landing" namespace. */
export const FOOTER_COLUMNS = [
  {
    id: "product",
    links: [
      { labelKey: "nav.ai", href: "#ai" },
      { labelKey: "nav.features", href: "#features" },
      { labelKey: "nav.pricing", href: "#pricing" },
    ],
  },
  {
    id: "company",
    links: [
      { labelKey: "nav.roadmap", href: "#roadmap" },
      { labelKey: "nav.faq", href: "#faq" },
    ],
  },
  {
    id: "legal",
    links: [
      { labelKey: "footer.links.privacy", href: "#" },
      { labelKey: "footer.links.terms", href: "#" },
      { labelKey: "footer.links.contact", href: "mailto:info@uddoktahut.com" },
    ],
  },
];

export const PARTNER_LABELS = ["bKash", "SSLCommerz", "Pathao", "RedX", "Bangla", "Stripe"];
