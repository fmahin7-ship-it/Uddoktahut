// Template constants for consistent usage across the application

export const TEMPLATE_IDS = {
  CLASSIC: "classic",
  MODERN_DARK: "modernDark",
  BOUTIQUE: "boutique",
} as const;

export type TemplateId = (typeof TEMPLATE_IDS)[keyof typeof TEMPLATE_IDS];

export const DEFAULT_TEMPLATE: TemplateId = TEMPLATE_IDS.CLASSIC;

// Template metadata for UI display
export const TEMPLATE_METADATA: Record<
  TemplateId,
  { name: string; description: string; category: string; isPremium: boolean }
> = {
  [TEMPLATE_IDS.CLASSIC]: {
    name: "Modern Commerce",
    description: "Clean, modern storefront with indigo accents",
    category: "Business",
    isPremium: false,
  },
  [TEMPLATE_IDS.MODERN_DARK]: {
    name: "Modern Dark",
    description: "Dark, sophisticated design with bold typography",
    category: "Premium",
    isPremium: true,
  },
  [TEMPLATE_IDS.BOUTIQUE]: {
    name: "Luxury Boutique",
    description: "Elegant design for premium brands",
    category: "Premium",
    isPremium: true,
  },
};
