import { COMPANY } from "@/constants/company";

/**
 * Landing structure — ids, links, statuses, icons.
 * Copy lives in messages/{bn,en}.json under "Landing", keyed by these ids.
 * Only list what customers can use today; plans and roadmap belong in the docs.
 */

export const LANDING_NAV_LINKS = [
  { id: "ai", href: "#ai" },
  { id: "features", href: "#features" },
  { id: "pricing", href: "#pricing" },
  { id: "faq", href: "#faq" },
];

export const HERO_LINKS = {
  primaryCta: "/signup",
  secondaryCta: "#ai",
};

export const AI_FEATURES = [
  { id: "copilot", icon: "bot" },
  { id: "private", icon: "lock" },
  { id: "memory", icon: "history" },
  { id: "bilingual", icon: "languages" },
];

/** status "live" renders no badge; anything else (e.g. "beta") is labelled. */
export const COMMERCE_FEATURES = [
  { id: "online-store", icon: "store", status: "live" },
  { id: "products-inventory", icon: "package", status: "live" },
  { id: "store-themes", icon: "palette", status: "beta" },
  { id: "checkout", icon: "credit-card", status: "beta" },
];

export const HOW_IT_WORKS_STEPS = ["signup", "setup", "products", "sell"];

/** Mirrors the backend plans (trial, basic, pro, business) and their AI entitlement. */
export const PRICING_PLANS = [
  { id: "trial", includesAi: false, popular: false, href: "/signup" },
  { id: "basic", includesAi: false, popular: false, href: "/signup" },
  { id: "pro", includesAi: true, popular: true, href: "/signup" },
  { id: "business", includesAi: true, popular: false, href: "/signup" },
];

export const FAQ_ITEMS = ["what", "ai", "trial", "basic-ai", "ai-usage", "compare"];

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
      { labelKey: "nav.faq", href: "#faq" },
      { labelKey: "footer.links.contact", href: `mailto:${COMPANY.email}` },
    ],
  },
  {
    id: "legal",
    links: [
      { labelKey: "footer.links.privacy", href: "/privacy" },
      { labelKey: "footer.links.terms", href: "/terms" },
      { labelKey: "footer.links.refunds", href: "/refunds" },
    ],
  },
];
