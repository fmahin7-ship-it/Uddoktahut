"use client";

import type { StoreCardProps } from "@/features/storefront/types";
import { cn } from "@/shared/lib/utils";
import { useStoreTheme } from "@/features/storefront/hooks/useStoreTheme";

export default function ModernDarkStoreCard({ className, children, ...props }: StoreCardProps) {
  const { cardClass, cardStyle, colors } = useStoreTheme();

  return (
    <div
      className={cn(cardClass, className)}
      style={{
        ...cardStyle,
        boxShadow: `0 4px 24px ${colors.background}80`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
