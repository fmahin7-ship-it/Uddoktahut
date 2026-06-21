"use client";

import { useStoreTheme } from "@/hooks/useStoreTheme";

export default function BoutiqueTemplate() {
  const { colors, typography } = useStoreTheme();

  return (
    <div
      className="min-h-screen font-serif"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: typography.fontFamily,
      }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1
            className="text-6xl font-bold mb-4"
            style={{ color: colors.accent }}
          >
            BOUTIQUE
          </h1>
          <p
            className="text-xl"
            style={{ color: colors.textSecondary }}
          >
            Luxury Template Coming Soon...
          </p>
          <p
            className="text-sm mt-4"
            style={{ color: colors.textSecondary }}
          >
            This demonstrates how easy it is to add new templates!
          </p>
        </div>
      </div>
    </div>
  );
}
