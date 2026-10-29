"use client";

import type React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useShop } from "@/shared/providers/shop-provider";
import { useCart } from "@/features/storefront/hooks/use-cart";
import { useStoreTheme } from "@/features/storefront/hooks/useStoreTheme";

export default function CartNavButton({
  className,
  badgeClassName,
  badgeStyle,
  buttonVariant = "outline",
}: {
  className?: string;
  badgeClassName?: string;
  badgeStyle?: React.CSSProperties;
  buttonVariant?: "outline" | "ghost" | "default";
}) {
  const { shop } = useShop();
  const shopSlug = shop?.store_name;
  const { lineCount } = useCart(shopSlug);
  const { colors } = useStoreTheme();

  return (
    <Button
      variant={buttonVariant}
      size="icon"
      className={`relative ${className ?? ""}`}
      style={{ borderColor: colors.border, color: colors.text }}
      asChild
    >
      <Link href="/cart" aria-label={`Cart (${lineCount} items)`}>
        <ShoppingCart className="w-5 h-5" />
        {lineCount > 0 && (
          <span
            className={
              badgeClassName ??
              "absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full text-xs flex items-center justify-center font-bold"
            }
            style={
              badgeStyle ?? {
                backgroundColor: colors.accent,
                color: "#ffffff",
              }
            }
          >
            {lineCount > 99 ? "99+" : lineCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
