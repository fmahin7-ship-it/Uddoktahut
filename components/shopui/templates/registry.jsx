import dynamic from "next/dynamic";
import { TEMPLATE_IDS, TEMPLATE_METADATA } from "@/constants/templates";
import TemplateSkeleton from "@/components/common/TemplateSkeleton";

// Home pages (lazy-loaded)
const ClassicHome = dynamic(() => import("./classic/ClassicTemplate"), {
  loading: () => <TemplateSkeleton />,
  ssr: false,
});

const ModernDarkHome = dynamic(() => import("./modernDark/ModernDarkTemplate"), {
  loading: () => <TemplateSkeleton />,
  ssr: false,
});

const BoutiqueHome = dynamic(() => import("./boutique/BoutiqueTemplate"), {
  loading: () => <TemplateSkeleton />,
  ssr: false,
});

// Classic commerce
import ClassicHeader from "./classic/ClassicHeader";
import ClassicFooter from "./classic/ClassicFooter";
import ClassicShop from "./classic/commerce/ClassicShop";
import ClassicStoreShell from "./classic/commerce/ClassicStoreShell";
import ClassicProductCard from "./classic/commerce/ClassicProductCard";
import ClassicPrimaryButton from "./classic/commerce/ClassicPrimaryButton";
import ClassicStoreCard from "./classic/commerce/ClassicStoreCard";
import ClassicSectionHeading from "./classic/commerce/ClassicSectionHeading";

// Modern Dark commerce
import ModernDarkHeader from "./modernDark/ModernDarkHeader";
import ModernDarkFooter from "./modernDark/ModernDarkFooter";
import ModernDarkShop from "./modernDark/commerce/ModernDarkShop";
import ModernDarkStoreShell from "./modernDark/commerce/ModernDarkStoreShell";
import ModernDarkProductCard from "./modernDark/commerce/ModernDarkProductCard";
import ModernDarkPrimaryButton from "./modernDark/commerce/ModernDarkPrimaryButton";
import ModernDarkStoreCard from "./modernDark/commerce/ModernDarkStoreCard";
import ModernDarkSectionHeading from "./modernDark/commerce/ModernDarkSectionHeading";

// Boutique commerce
import BoutiqueHeader from "./boutique/commerce/BoutiqueHeader";
import BoutiqueFooter from "./boutique/commerce/BoutiqueFooter";
import BoutiqueShop from "./boutique/commerce/BoutiqueShop";
import BoutiqueStoreShell from "./boutique/commerce/BoutiqueStoreShell";
import BoutiqueProductCard from "./boutique/commerce/BoutiqueProductCard";
import BoutiquePrimaryButton from "./boutique/commerce/BoutiquePrimaryButton";
import BoutiqueStoreCard from "./boutique/commerce/BoutiqueStoreCard";
import BoutiqueSectionHeading from "./boutique/commerce/BoutiqueSectionHeading";

export const TEMPLATE_REGISTRY = {
  [TEMPLATE_IDS.CLASSIC]: {
    id: TEMPLATE_IDS.CLASSIC,
    name: TEMPLATE_METADATA[TEMPLATE_IDS.CLASSIC].name,
    description: TEMPLATE_METADATA[TEMPLATE_IDS.CLASSIC].description,
    component: ClassicHome,
    Header: ClassicHeader,
    Footer: ClassicFooter,
    Shop: ClassicShop,
    StoreShell: ClassicStoreShell,
    ProductCard: ClassicProductCard,
    PrimaryButton: ClassicPrimaryButton,
    StoreCard: ClassicStoreCard,
    SectionHeading: ClassicSectionHeading,
    colors: {
      background: "#f8fafc",
      secondaryBg: "#eef2ff",
      cardBg: "#ffffff",
      text: "#0f172a",
      textSecondary: "#64748b",
      accent: "#4f46e5",
      cta: "#6366f1",
      ctaHover: "#4338ca",
      border: "#e2e8f0",
    },
    layout: {
      heroLayout: "split",
      productGrid: "cards",
      headerStyle: "clean",
      spacing: "comfortable",
    },
    typography: {
      fontFamily: "sans-serif",
      headingWeight: "700",
      bodyWeight: "400",
    },
    commerce: {
      maxWidth: "max-w-6xl",
      fontClass: "font-sans antialiased",
      backgroundStyle: "mesh",
      radius: "rounded-2xl",
      radiusButton: "rounded-xl",
      headingCase: "normal",
      productGrid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      shopTitle: "All products",
    },
  },
  [TEMPLATE_IDS.MODERN_DARK]: {
    id: TEMPLATE_IDS.MODERN_DARK,
    name: TEMPLATE_METADATA[TEMPLATE_IDS.MODERN_DARK].name,
    description: TEMPLATE_METADATA[TEMPLATE_IDS.MODERN_DARK].description,
    component: ModernDarkHome,
    Header: ModernDarkHeader,
    Footer: ModernDarkFooter,
    Shop: ModernDarkShop,
    StoreShell: ModernDarkStoreShell,
    ProductCard: ModernDarkProductCard,
    PrimaryButton: ModernDarkPrimaryButton,
    StoreCard: ModernDarkStoreCard,
    SectionHeading: ModernDarkSectionHeading,
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
      heroLayout: "full",
      productGrid: "masonry",
      headerStyle: "bold",
      spacing: "spacious",
    },
    typography: {
      fontFamily: "sans-serif",
      headingWeight: "800",
      bodyWeight: "500",
    },
    commerce: {
      maxWidth: "max-w-7xl",
      fontClass: "font-sans antialiased",
      backgroundStyle: "solid",
      radius: "rounded-none",
      radiusButton: "rounded-none",
      headingCase: "uppercase",
      productGrid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      shopTitle: "COLLECTION",
    },
  },
  [TEMPLATE_IDS.BOUTIQUE]: {
    id: TEMPLATE_IDS.BOUTIQUE,
    name: TEMPLATE_METADATA[TEMPLATE_IDS.BOUTIQUE].name,
    description: TEMPLATE_METADATA[TEMPLATE_IDS.BOUTIQUE].description,
    component: BoutiqueHome,
    Header: BoutiqueHeader,
    Footer: BoutiqueFooter,
    Shop: BoutiqueShop,
    StoreShell: BoutiqueStoreShell,
    ProductCard: BoutiqueProductCard,
    PrimaryButton: BoutiquePrimaryButton,
    StoreCard: BoutiqueStoreCard,
    SectionHeading: BoutiqueSectionHeading,
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
    commerce: {
      maxWidth: "max-w-5xl",
      fontClass: "font-serif antialiased",
      backgroundStyle: "gradient",
      radius: "rounded-3xl",
      radiusButton: "rounded-full",
      headingCase: "normal",
      productGrid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2",
      shopTitle: "The Collection",
    },
  },
};

export function getTemplate(templateId) {
  const template = TEMPLATE_REGISTRY[templateId];
  if (!template) {
    console.warn(`Template "${templateId}" not found, falling back to classic`);
    return TEMPLATE_REGISTRY[TEMPLATE_IDS.CLASSIC];
  }
  return template;
}

export function getTemplateList() {
  return Object.values(TEMPLATE_REGISTRY);
}
