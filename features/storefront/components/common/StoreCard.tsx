"use client";

import type { StoreCardProps } from "@/features/storefront/types";
import { useShop } from "@/shared/providers/shop-provider";
import { getTemplate } from "@/features/storefront/components/templates/registry";

export default function StoreCard(props: StoreCardProps) {
  const { selectedTemplate } = useShop();
  const { StoreCard: TemplateStoreCard } = getTemplate(selectedTemplate);
  return <TemplateStoreCard {...props} />;
}
