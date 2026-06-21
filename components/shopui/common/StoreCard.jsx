"use client";

import { useShop } from "@/app/context/ShopContext";
import { getTemplate } from "@/components/shopui/templates/registry";

export default function StoreCard(props) {
  const { selectedTemplate } = useShop();
  const { StoreCard: TemplateStoreCard } = getTemplate(selectedTemplate);
  return <TemplateStoreCard {...props} />;
}
