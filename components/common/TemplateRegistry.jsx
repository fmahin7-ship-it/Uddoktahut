import dynamic from "next/dynamic";
import { TEMPLATE_IDS, TEMPLATE_METADATA } from "@/constants/templates";
import TemplateSkeleton from "./TemplateSkeleton";

// Lazy load template components with loading states
const ClassicTemplate = dynamic(
  () => import("../shopui/templates/classic/ClassicTemplate"),
  {
    loading: () => <TemplateSkeleton />,
    ssr: false, // Templates are interactive components, don't need SSR
  }
);

const ModernDarkTemplate = dynamic(
  () => import("../shopui/templates/modernDark/ModernDarkTemplate"),
  {
    loading: () => <TemplateSkeleton />,
    ssr: false,
  }
);

const BoutiqueTemplate = dynamic(
  () => import("../shopui/templates/boutique/BoutiqueTemplate"),
  {
    loading: () => <TemplateSkeleton />,
    ssr: false,
  }
);

export const TEMPLATE_REGISTRY = {
  [TEMPLATE_IDS.CLASSIC]: {
    id: TEMPLATE_IDS.CLASSIC,
    name: TEMPLATE_METADATA[TEMPLATE_IDS.CLASSIC].name,
    description: TEMPLATE_METADATA[TEMPLATE_IDS.CLASSIC].description,
    component: ClassicTemplate,
    colors: {
      background: "#fdfcfb",
      secondaryBg: "#f6f4f1",
      cardBg: "#ffffff",
      text: "#171717",
      textSecondary: "#525252",
      accent: "#16a34a",
      cta: "#4ade80",
      ctaHover: "#22c55e",
      border: "#e5e5e5",
    },
    layout: {
      heroLayout: "split", // split, full, minimal
      productGrid: "cards", // cards, list, masonry
      headerStyle: "clean", // clean, bold, minimal
      spacing: "comfortable", // tight, comfortable, spacious
    },
    typography: {
      fontFamily: "sans-serif",
      headingWeight: "700",
      bodyWeight: "400",
    },
  },
  [TEMPLATE_IDS.MODERN_DARK]: {
    id: TEMPLATE_IDS.MODERN_DARK,
    name: TEMPLATE_METADATA[TEMPLATE_IDS.MODERN_DARK].name,
    description: TEMPLATE_METADATA[TEMPLATE_IDS.MODERN_DARK].description,
    component: ModernDarkTemplate,
    colors: {
      background: "#0a0a0a",
      secondaryBg: "#1a1a1a",
      cardBg: "#262626",
      text: "#f5f5f5",
      textSecondary: "#a3a3a3",
      accent: "#06b6d4",
      cta: "#0891b2",
      ctaHover: "#0e7490",
      border: "#404040",
    },
    layout: {
      heroLayout: "full", // full-width hero
      productGrid: "masonry", // masonry layout
      headerStyle: "bold", // bold header
      spacing: "spacious", // more spacing
    },
    typography: {
      fontFamily: "sans-serif",
      headingWeight: "800",
      bodyWeight: "500",
    },
  },
  [TEMPLATE_IDS.BOUTIQUE]: {
    id: TEMPLATE_IDS.BOUTIQUE,
    name: TEMPLATE_METADATA[TEMPLATE_IDS.BOUTIQUE].name,
    description: TEMPLATE_METADATA[TEMPLATE_IDS.BOUTIQUE].description,
    component: BoutiqueTemplate,
    colors: {
      background: "#fdf2f8",
      secondaryBg: "#fce7f3",
      cardBg: "#ffffff",
      text: "#9f1239",
      textSecondary: "#be185d",
      accent: "#be123c",
      cta: "#e879f9",
      ctaHover: "#d946ef",
      border: "#f9a8d4",
    },
    layout: {
      heroLayout: "full",
      productGrid: "masonry",
      headerStyle: "elegant",
      spacing: "luxurious",
    },
    typography: {
      fontFamily: "serif",
      headingWeight: "700",
      bodyWeight: "400",
    },
  },
};

export const getTemplate = (templateId) => {
  // console.log(templateId);
  const template = TEMPLATE_REGISTRY[templateId];
  if (!template) {
    console.warn(`Template "${templateId}" not found, falling back to classic`);
    return TEMPLATE_REGISTRY[TEMPLATE_IDS.CLASSIC];
  }
  return template;
};

export const getTemplateList = () => {
  return Object.values(TEMPLATE_REGISTRY);
};
