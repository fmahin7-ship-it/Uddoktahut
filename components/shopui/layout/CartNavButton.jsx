"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShop } from "@/app/context/ShopContext";
import { useCart } from "@/hooks/use-cart";

export default function CartNavButton({
  className,
  badgeClassName,
  badgeStyle,
  buttonVariant = "outline",
}) {
  const { shop } = useShop();
  const shopSlug = shop?.store_name;
  const { lineCount } = useCart(shopSlug);

  return (
    <Button
      variant={buttonVariant}
      size="icon"
      className={`relative ${className ?? ""}`}
      asChild
    >
      <Link href="/cart" aria-label={`Cart (${lineCount} items)`}>
        <ShoppingCart className="w-5 h-5" />
        {lineCount > 0 && (
          <span
            className={
              badgeClassName ??
              "absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full text-xs flex items-center justify-center font-bold bg-green-600 text-white"
            }
            style={badgeStyle}
          >
            {lineCount > 99 ? "99+" : lineCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
