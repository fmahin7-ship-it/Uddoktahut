"use client";

import type { StoreShellProps } from "@/features/storefront/types";
import { useShop } from "@/shared/providers/shop-provider";
import { getTemplate } from "@/features/storefront/components/templates/registry";

export default function StoreShell(props: StoreShellProps) {
  const { selectedTemplate } = useShop();
  const { StoreShell: TemplateStoreShell } = getTemplate(selectedTemplate);
  return <TemplateStoreShell {...props} />;
}
