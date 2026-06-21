"use client";

import deliverySystem from "@/public/assets/images/onboarding-img.png";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import ModernDarkHeader from "./ModernDarkHeader";
import ModernDarkHero from "./ModernDarkHero";
import ModernDarkFeatureProducts from "./ModernDarkFeatureProducts";
import ModernDarkPromotions from "./ModernDarkPromotions";
import ModernDarkFooter from "./ModernDarkFooter";

export default function ModernDarkTemplate() {
  const { colors, typography } = useStoreTheme();

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: typography.fontFamily,
      }}
    >
      {/* <TemplateToggle /> */}
      <ModernDarkHeader />
      <ModernDarkHero deliverySystem={deliverySystem} />
      <ModernDarkFeatureProducts deliverySystem={deliverySystem} />
      <ModernDarkPromotions />
      <ModernDarkFooter isShopList={false} />
    </div>
  );
}
