"use client";

import { useShop } from "@/app/context/ShopContext";
import { getTemplate } from "@/components/shopui/templates/registry";

export default function Shop() {
  const { selectedTemplate } = useShop();
  const { Shop: TemplateShop } = getTemplate(selectedTemplate);
  return <TemplateShop />;
}
