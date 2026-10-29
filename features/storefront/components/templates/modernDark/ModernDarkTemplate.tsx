"use client";

import deliverySystem from "@/public/assets/images/onboarding-img.png";
import { useStoreTheme } from "@/features/storefront/hooks/useStoreTheme";
import ModernDarkHeader from "@/features/storefront/components/templates/modernDark/ModernDarkHeader";
import ModernDarkHero from "@/features/storefront/components/templates/modernDark/ModernDarkHero";
import ModernDarkFeatureProducts from "@/features/storefront/components/templates/modernDark/ModernDarkFeatureProducts";
import ModernDarkPromotions from "@/features/storefront/components/templates/modernDark/ModernDarkPromotions";
import ModernDarkFooter from "@/features/storefront/components/templates/modernDark/ModernDarkFooter";

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
