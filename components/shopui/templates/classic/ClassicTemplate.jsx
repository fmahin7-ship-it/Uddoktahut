"use client";

import deliverySystem from "@/public/assets/images/onboarding-img.png";
import ClassicHeader from "./ClassicHeader";
import ClassicHero from "./ClassicHero";
import ClassicFeatureProducts from "./ClassicFeatureProducts";
import StoreTrustStrip from "@/components/shopui/common/StoreTrustStrip";
import ClassicFooter from "./ClassicFooter";
import { useStoreTheme } from "@/hooks/useStoreTheme";

export default function ClassicTemplate() {
  const { cssVars, heroMesh, colors } = useStoreTheme();

  return (
    <div
      className="min-h-screen flex flex-col font-sans antialiased"
      style={{ ...cssVars, background: heroMesh, color: colors.text }}
    >
      <ClassicHeader />
      <main className="flex-1">
        <ClassicHero deliverySystem={deliverySystem} />
        <ClassicFeatureProducts />
        <StoreTrustStrip />
      </main>
      <ClassicFooter />
    </div>
  );
}
