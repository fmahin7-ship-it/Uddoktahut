"use client";

import { formatPrice } from "@/lib/utils/formatPrice";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import StoreCard from "@/components/shopui/common/StoreCard";

export default function CartSummary({ lineCount, subtotal, children }) {
  const { colors } = useStoreTheme();

  return (
    <StoreCard className="p-6 space-y-4 sticky top-24">
      <h2 className="font-semibold text-lg" style={{ color: colors.text }}>
        Order summary
      </h2>
      <div className="flex justify-between text-sm">
        <span style={{ color: colors.textSecondary }}>Items ({lineCount})</span>
        <span style={{ color: colors.text }}>{formatPrice(subtotal)}</span>
      </div>
      <div
        className="flex justify-between font-semibold border-t pt-4 text-base"
        style={{ borderColor: colors.border, color: colors.text }}
      >
        <span>Total</span>
        <span style={{ color: colors.accent }}>{formatPrice(subtotal)}</span>
      </div>
      <p className="text-xs" style={{ color: colors.textSecondary }}>
        Cash on delivery (COD)
      </p>
      {children}
    </StoreCard>
  );
}
