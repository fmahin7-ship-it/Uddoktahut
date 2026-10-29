"use client";

import type { PrimaryButtonProps } from "@/features/storefront/types";
import { useShop } from "@/shared/providers/shop-provider";
import { getTemplate } from "@/features/storefront/components/templates/registry";

export default function StorePrimaryButton(props: PrimaryButtonProps) {
  const { selectedTemplate } = useShop();
  const { PrimaryButton } = getTemplate(selectedTemplate);
  return <PrimaryButton {...props} />;
}
