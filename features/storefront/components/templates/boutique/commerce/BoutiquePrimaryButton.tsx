"use client";

import type { PrimaryButtonProps } from "@/features/storefront/types";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { useStoreTheme } from "@/features/storefront/hooks/useStoreTheme";

export default function BoutiquePrimaryButton({
  className,
  style,
  children,
  variant,
  asChild,
  ...props
}: PrimaryButtonProps) {
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
