"use client";

import type React from "react";
import { formatPrice } from "@/shared/lib/formatPrice";
import { useStoreTheme } from "@/features/storefront/hooks/useStoreTheme";
import { useStoreCurrency } from "@/features/storefront/hooks/useStoreCurrency";
import StoreCard from "@/features/storefront/components/common/StoreCard";

export default function CartSummary({ lineCount, subtotal, children }: {
  lineCount: number;
  subtotal: number;
  children?: React.ReactNode;
}) {
  const { colors } = useStoreTheme();
  const currency = useStoreCurrency();

  return (
    <StoreCard className="p-6 space-y-4 sticky top-24">
      <h2 className="font-semibold text-lg" style={{ color: colors.text }}>
        Order summary
      </h2>
      <div className="flex justify-between text-sm">
        <span style={{ color: colors.textSecondary }}>Items ({lineCount})</span>
        <span style={{ color: colors.text }}>{formatPrice(subtotal, currency)}</span>
      </div>
      <div
        className="flex justify-between font-semibold border-t pt-4 text-base"
        style={{ borderColor: colors.border, color: colors.text }}
      >
        <span>Total</span>
        <span style={{ color: colors.accent }}>{formatPrice(subtotal, currency)}</span>
      </div>
      <p className="text-xs" style={{ color: colors.textSecondary }}>
        Cash on delivery (COD)
      </p>
      {children}
    </StoreCard>
  );
}
