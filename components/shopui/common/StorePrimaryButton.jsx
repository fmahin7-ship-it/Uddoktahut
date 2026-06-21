"use client";

import { useShop } from "@/app/context/ShopContext";
import { getTemplate } from "@/components/shopui/templates/registry";

export default function StorePrimaryButton(props) {
  const { selectedTemplate } = useShop();
  const { PrimaryButton } = getTemplate(selectedTemplate);
  return <PrimaryButton {...props} />;
}
