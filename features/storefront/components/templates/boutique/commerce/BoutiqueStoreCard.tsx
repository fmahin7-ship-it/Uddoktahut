"use client";

import type { StoreCardProps } from "@/features/storefront/types";
import { cn } from "@/shared/lib/utils";
import { useStoreTheme } from "@/features/storefront/hooks/useStoreTheme";

export default function BoutiqueStoreCard({ className, children, ...props }: StoreCardProps) {
  const { cardClass, cardStyle } = useStoreTheme();

  return (
    <div className={cn(cardClass, "shadow-md shadow-pink-200/40", className)} style={cardStyle} {...props}>
      {children}
    </div>
  );
}
