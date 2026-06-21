"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStoreTheme } from "@/hooks/useStoreTheme";

export default function ModernDarkPrimaryButton({
  className,
  style,
  children,
  variant,
  asChild,
  ...props
}) {
  const { colors, buttonRadius } = useStoreTheme();
  const isOutline = variant === "outline";

  return (
    <Button
      asChild={asChild}
      variant={variant}
      className={cn(
        "font-bold tracking-widest uppercase text-xs transition-all hover:scale-[1.02]",
        buttonRadius,
        className
      )}
      style={
        isOutline
          ? {
              borderColor: colors.accent,
              borderWidth: 2,
              color: colors.accent,
              backgroundColor: "transparent",
              ...style,
            }
          : {
              backgroundColor: colors.cta,
              borderColor: colors.cta,
              borderWidth: 2,
              color: "#000000",
              ...style,
            }
      }
      {...props}
    >
      {children}
    </Button>
  );
}
