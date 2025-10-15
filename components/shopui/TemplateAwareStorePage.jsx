"use client";

import { useShop } from "@/app/context/ShopContext";
import { getTemplate } from "./templates/TemplateRegistry";

function StorePageContent() {
  const { selectedTemplate } = useShop();

  const template = getTemplate(selectedTemplate);
  const TemplateComponent = template.component;

  return <TemplateComponent />;
}

export default function TemplateAwareStorePage() {
  return <StorePageContent />;
}
