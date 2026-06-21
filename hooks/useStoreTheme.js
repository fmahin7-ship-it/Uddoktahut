import { useTemplateConfig } from "@/hooks/useTemplateConfig";

export function useStoreTheme() {
  const { colors, typography, layout, selectedTemplate, currentTheme } =
    useTemplateConfig();

  const commerce = currentTheme.commerce ?? {};
  const radius = commerce.radius ?? "rounded-2xl";
  const radiusButton = commerce.radiusButton ?? "rounded-xl";

  const cssVars = {
    "--store-bg": colors.background,
    "--store-bg-secondary": colors.secondaryBg,
    "--store-card": colors.cardBg,
    "--store-text": colors.text,
    "--store-text-muted": colors.textSecondary,
    "--store-accent": colors.accent,
    "--store-cta": colors.cta,
    "--store-border": colors.border,
  };

  const pageGradient = `linear-gradient(180deg, ${colors.background} 0%, ${colors.secondaryBg} 55%, ${colors.background} 100%)`;
  const heroMesh = `radial-gradient(ellipse 90% 60% at 10% 0%, ${colors.accent}18, transparent 55%), radial-gradient(ellipse 70% 50% at 90% 10%, ${colors.cta}14, transparent 50%), linear-gradient(180deg, ${colors.background} 0%, ${colors.secondaryBg} 100%)`;

  const pageBackground =
    commerce.backgroundStyle === "mesh"
      ? heroMesh
      : commerce.backgroundStyle === "gradient"
        ? pageGradient
        : colors.background;

  return {
    colors,
    typography,
    layout,
    commerce,
    selectedTemplate,
    currentTheme,
    cssVars,
    pageGradient,
    heroMesh,
    pageBackground,
    accentSoft: `${colors.accent}14`,
    fontClass: commerce.fontClass ?? "font-sans antialiased",
    maxWidth: commerce.maxWidth ?? "max-w-6xl",
    headingCase: commerce.headingCase ?? "normal",
    cardClass: `${radius} border`,
    cardStyle: {
      backgroundColor: colors.cardBg,
      borderColor: colors.border,
    },
    buttonRadius: radiusButton,
    inputStyle: {
      borderColor: colors.border,
      backgroundColor: colors.cardBg,
      color: colors.text,
    },
    headingStyle: {
      fontWeight: typography.headingWeight,
      textTransform: commerce.headingCase === "uppercase" ? "uppercase" : "none",
      fontFamily: typography.fontFamily,
    },
  };
}
