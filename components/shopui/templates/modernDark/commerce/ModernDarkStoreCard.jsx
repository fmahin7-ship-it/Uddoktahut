"use client";

import { cn } from "@/lib/utils";
import { useStoreTheme } from "@/hooks/useStoreTheme";

export default function ModernDarkStoreCard({ className, children, ...props }) {
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
