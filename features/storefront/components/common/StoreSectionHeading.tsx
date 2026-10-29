"use client";

import type { SectionHeadingProps } from "@/features/storefront/types";
import { useShop } from "@/shared/providers/shop-provider";
import { getTemplate } from "@/features/storefront/components/templates/registry";

export default function StoreSectionHeading(props: SectionHeadingProps) {
  const { selectedTemplate } = useShop();
  const { SectionHeading } = getTemplate(selectedTemplate);
  return <SectionHeading {...props} />;
}
