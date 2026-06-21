"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStoreTheme } from "@/hooks/useStoreTheme";

export default function ClassicPrimaryButton({
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
        "font-semibold transition-all hover:opacity-95 active:scale-[0.98]",
        buttonRadius,
        !isOutline && "shadow-md shadow-indigo-500/15",
        className
      )}
      style={
        isOutline
          ? {
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: colors.cardBg,
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
