"use client";

import deliverySystem from "@/public/assets/images/onboarding-img.png";
import ClassicHeader from "@/features/storefront/components/templates/classic/ClassicHeader";
import ClassicHero from "@/features/storefront/components/templates/classic/ClassicHero";
import ClassicFeatureProducts from "@/features/storefront/components/templates/classic/ClassicFeatureProducts";
import StoreTrustStrip from "@/features/storefront/components/common/StoreTrustStrip";
import ClassicFooter from "@/features/storefront/components/templates/classic/ClassicFooter";
import { useStoreTheme } from "@/features/storefront/hooks/useStoreTheme";

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
