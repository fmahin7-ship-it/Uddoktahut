"use client";

import { useShop } from "@/app/context/ShopContext";
import { getTemplate } from "@/components/shopui/templates/registry";

export default function ProductItem(props) {
  const { selectedTemplate } = useShop();
  const { ProductCard } = getTemplate(selectedTemplate);
  return <ProductCard {...props} />;
}
