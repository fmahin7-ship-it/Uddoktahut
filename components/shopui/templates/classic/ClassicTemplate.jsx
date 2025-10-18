"use client";

import deliverySystem from "@/public/assets/images/onboarding-img.png";
import { TEMPLATE_IDS } from "@/constants/templates";
import { getTemplate } from "../../../common/TemplateRegistry";

// Classic Template Components
import ClassicHeader from "./ClassicHeader";
import ClassicHero from "./ClassicHero";
import ClassicPromotions from "./ClassicPromotions";
import ClassicFooter from "./ClassicFooter";
import ClassicFeatureProducts from "./ClassicFeatureProducts";

export default function ClassicTemplate() {
  const templateConfig = getTemplate(TEMPLATE_IDS.CLASSIC);

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: templateConfig.colors.background,
        color: templateConfig.colors.text,
        fontFamily: templateConfig.typography.fontFamily,
      }}
    >
      <ClassicHeader />
      <ClassicHero deliverySystem={deliverySystem} />
      <ClassicFeatureProducts deliverySystem={deliverySystem} />
      <ClassicPromotions />
      <ClassicFooter isShopList={false} />
    </div>
  );
}
