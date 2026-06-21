"use client";

import { cn } from "@/lib/utils";
import { useStoreTheme } from "@/hooks/useStoreTheme";

export default function BoutiqueStoreCard({ className, children, ...props }) {
  const { cardClass, cardStyle } = useStoreTheme();

  return (
    <div className={cn(cardClass, "shadow-md shadow-pink-200/40", className)} style={cardStyle} {...props}>
      {children}
    </div>
  );
}
