"use client";

import type { ProductCardProps } from "@/features/storefront/types";
import { useShop } from "@/shared/providers/shop-provider";
import { getTemplate } from "@/features/storefront/components/templates/registry";

export default function ProductItem(props: ProductCardProps) {
  const { selectedTemplate } = useShop();
  const { ProductCard } = getTemplate(selectedTemplate);
  return <ProductCard {...props} />;
}
