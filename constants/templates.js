// Template constants for consistent usage across the application

export const TEMPLATE_IDS = {
  CLASSIC: "classic",
  MODERN_DARK: "modernDark",
  BOUTIQUE: "boutique",
};

export const DEFAULT_TEMPLATE = TEMPLATE_IDS.CLASSIC;

// Template metadata for UI display
export const TEMPLATE_METADATA = {
  [TEMPLATE_IDS.CLASSIC]: {
    name: "Clean Commerce",
    description: "Light, clean design with warm tones",
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
