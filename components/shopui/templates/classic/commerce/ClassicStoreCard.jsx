"use client";

import { cn } from "@/lib/utils";
import { useStoreTheme } from "@/hooks/useStoreTheme";

export default function ClassicStoreCard({ className, children, ...props }) {
  const { cardClass, cardStyle } = useStoreTheme();

  return (
    <div className={cn(cardClass, "shadow-sm", className)} style={cardStyle} {...props}>
      {children}
    </div>
  );
}
