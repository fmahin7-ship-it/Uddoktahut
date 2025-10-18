"use client";

import { TEMPLATE_IDS } from "@/constants/templates";
import { getTemplate } from "../../../common/TemplateRegistry";

export default function BoutiqueTemplate() {
  const templateConfig = getTemplate(TEMPLATE_IDS.BOUTIQUE);

  return (
    <div
      className="min-h-screen font-serif"
      style={{
        backgroundColor: templateConfig.colors.background,
        color: templateConfig.colors.text,
        fontFamily: templateConfig.typography.fontFamily,
      }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1
            className="text-6xl font-bold mb-4"
            style={{ color: templateConfig.colors.accent }}
          >
            BOUTIQUE
          </h1>
          <p
            className="text-xl"
            style={{ color: templateConfig.colors.textSecondary }}
          >
            Luxury Template Coming Soon...
          </p>
          <p
            className="text-sm mt-4"
            style={{ color: templateConfig.colors.textSecondary }}
          >
            This demonstrates how easy it is to add new templates!
          </p>
        </div>
      </div>
    </div>
  );
}
