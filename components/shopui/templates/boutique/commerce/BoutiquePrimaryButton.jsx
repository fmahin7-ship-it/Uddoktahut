"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStoreTheme } from "@/hooks/useStoreTheme";

export default function BoutiquePrimaryButton({
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
        "font-serif font-medium tracking-wide transition-all hover:opacity-90",
        buttonRadius,
        className
      )}
      style={
        isOutline
          ? {
              borderColor: colors.accent,
              color: colors.accent,
              backgroundColor: "transparent",
              ...style,
            }
          : {
              backgroundColor: colors.accent,
              color: "#ffffff",
              ...style,
            }
      }
      {...props}
    >
      {children}
    </Button>
  );
}
