"use client";

import type { StoreCardProps } from "@/features/storefront/types";
import { cn } from "@/shared/lib/utils";
import { useStoreTheme } from "@/features/storefront/hooks/useStoreTheme";

export default function ClassicStoreCard({ className, children, ...props }: StoreCardProps) {
  const { cardClass, cardStyle } = useStoreTheme();

  return (
    <div className={cn(cardClass, "shadow-sm", className)} style={cardStyle} {...props}>
      {children}
    </div>
  );
}
