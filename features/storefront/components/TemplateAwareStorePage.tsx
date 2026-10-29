"use client";

import { useShop } from "@/shared/providers/shop-provider";
import { getTemplate } from "@/features/storefront/components/templates/registry";

function StorePageContent() {
  const { selectedTemplate } = useShop();

  const template = getTemplate(selectedTemplate);
  const TemplateComponent = template.component;

  return <TemplateComponent />;
}

export default function TemplateAwareStorePage() {
  return <StorePageContent />;
}
