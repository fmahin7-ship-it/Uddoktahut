"use client";

import deliverySystem from "@/public/assets/images/onboarding-img.png";
import { TEMPLATE_IDS } from "@/constants/templates";
import { getTemplate } from "../../../common/TemplateRegistry";

// Modern Dark Template Components
import ModernDarkHeader from "./ModernDarkHeader";
import ModernDarkHero from "./ModernDarkHero";
import ModernDarkFeatureProducts from "./ModernDarkFeatureProducts";
import ModernDarkPromotions from "./ModernDarkPromotions";
import ModernDarkFooter from "./ModernDarkFooter";

export default function ModernDarkTemplate() {
  const templateConfig = getTemplate(TEMPLATE_IDS.MODERN_DARK);

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: templateConfig.colors.background,
        color: templateConfig.colors.text,
        fontFamily: templateConfig.typography.fontFamily,
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
