"use client";

import { useShop } from "@/shared/providers/shop-provider";
import { getTemplate } from "@/features/storefront/components/templates/registry";

export default function Shop() {
  const { selectedTemplate } = useShop();
  const { Shop: TemplateShop } = getTemplate(selectedTemplate);
  return <TemplateShop />;
}
