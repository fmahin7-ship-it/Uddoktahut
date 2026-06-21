"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useShop } from "@/app/context/ShopContext";
import { useCart } from "@/hooks/use-cart";
import { resolveCartLines } from "@/lib/cart/resolveCartLines";
import StoreShell from "@/components/shopui/layout/StoreShell";
import CartLineItem from "./CartLineItem";
import CartOrphanLine from "./CartOrphanLine";
import CartSummary from "./CartSummary";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const router = useRouter();
  const { shop, products } = useShop();
  const shopSlug = shop?.store_name;
  const { items, updateQuantity, removeItem } = useCart(shopSlug);

  const { lines, orphanLines, subtotal, resolvedCount, errors } = useMemo(
    () => resolveCartLines(items, products),
    [items, products]
  );

  const canCheckout = lines.length > 0 && errors.length === 0;

  if (items.length === 0) {
    return (
      <StoreShell backHref="/shop" backLabel="Continue shopping">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Add products from the shop to get started.
          </p>
          <Button asChild>
            <Link href="/shop">Browse products</Link>
          </Button>
        </div>
      </StoreShell>
    );
  }

  return (
    <StoreShell backHref="/shop" backLabel="Back to shop">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-xl border bg-card p-4 space-y-2">
            {lines.length === 0 && orphanLines.length > 0 && (
              <p className="text-sm text-muted-foreground pb-2">
                Your saved items are outdated. Remove unavailable products
                below, then add items from the shop again.
              </p>
            )}
            {lines.map((line) => (
              <CartLineItem
                key={line.productId}
                line={line}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
            {orphanLines.map((line) => (
              <CartOrphanLine
                key={`orphan-${line.productId}`}
                line={line}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div>
            <CartSummary lineCount={resolvedCount} subtotal={subtotal}>
              {errors.length > 0 && (
                <ul className="text-sm text-destructive space-y-1">
                  {errors.map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              )}
              {canCheckout ? (
                <Button
                  type="button"
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => router.push("/checkout")}
                >
                  Proceed to checkout
                </Button>
              ) : (
                <Button
                  type="button"
                  className="w-full"
                  disabled
                  variant="secondary"
                >
                  Fix cart to checkout
                </Button>
              )}
            </CartSummary>
          </div>
        </div>
      </div>
    </StoreShell>
  );
}
