"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useShop } from "@/app/context/ShopContext";
import { useCart } from "@/hooks/use-cart";
import { resolveCartLines } from "@/lib/cart/resolveCartLines";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import StoreShell from "@/components/shopui/layout/StoreShell";
import StoreCard from "@/components/shopui/common/StoreCard";
import StorePrimaryButton from "@/components/shopui/common/StorePrimaryButton";
import CartLineItem from "./CartLineItem";
import CartOrphanLine from "./CartOrphanLine";
import CartSummary from "./CartSummary";

export default function CartPage() {
  const router = useRouter();
  const { shop, products } = useShop();
  const shopSlug = shop?.store_name;
  const { items, updateQuantity, removeItem } = useCart(shopSlug);
  const { colors, maxWidth } = useStoreTheme();

  const { lines, orphanLines, subtotal, resolvedCount, errors } = useMemo(
    () => resolveCartLines(items, products),
    [items, products]
  );

  const canCheckout = lines.length > 0 && errors.length === 0;

  if (items.length === 0) {
    return (
      <StoreShell backHref="/shop" backLabel="Continue shopping">
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
            Your cart is empty
          </h1>
          <p className="mb-8" style={{ color: colors.textSecondary }}>
            Add products from the shop to get started.
          </p>
          <StorePrimaryButton asChild className="inline-flex w-auto px-8">
            <Link href="/shop">Browse products</Link>
          </StorePrimaryButton>
        </div>
      </StoreShell>
    );
  }

  return (
    <StoreShell backHref="/shop" backLabel="Back to shop">
      <div className={`${maxWidth} mx-auto px-4 sm:px-6 py-8 sm:py-10`}>
        <h1
          className="text-2xl sm:text-3xl font-bold mb-2"
          style={{ color: colors.text }}
        >
          Shopping cart
        </h1>
        <p className="mb-8 text-sm" style={{ color: colors.textSecondary }}>
          Review items before checkout
        </p>

        <div className="grid lg:grid-cols-5 gap-8">
          <StoreCard className="lg:col-span-3 p-4 sm:p-6 space-y-1">
            {lines.length === 0 && orphanLines.length > 0 && (
              <p className="text-sm pb-3" style={{ color: colors.textSecondary }}>
                Remove unavailable items below, then add products from the shop
                again.
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
          </StoreCard>

          <div className="lg:col-span-2">
            <CartSummary lineCount={resolvedCount} subtotal={subtotal}>
              {errors.length > 0 && (
                <ul className="text-sm text-destructive space-y-1">
                  {errors.map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              )}
              {canCheckout ? (
                <StorePrimaryButton
                  type="button"
                  className="w-full h-11 rounded-xl"
                  onClick={() => router.push("/checkout")}
                >
                  Proceed to checkout
                </StorePrimaryButton>
              ) : (
                <StorePrimaryButton
                  type="button"
                  className="w-full h-11 rounded-xl opacity-50"
                  disabled
                >
                  Fix cart to checkout
                </StorePrimaryButton>
              )}
            </CartSummary>
          </div>
        </div>
      </div>
    </StoreShell>
  );
}
