"use client";

import { formatPrice } from "@/lib/utils/formatPrice";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import StoreCard from "@/components/shopui/common/StoreCard";

export default function CheckoutOrderSummary({ lines, subtotal, lineCount }) {
  const { colors } = useStoreTheme();

  return (
    <StoreCard className="p-6 space-y-4 sticky top-24">
      <h2 className="font-semibold text-lg" style={{ color: colors.text }}>
        Your order
      </h2>
      <ul className="space-y-3 max-h-64 overflow-y-auto">
        {lines.map((line) => (
          <li
            key={line.productId}
            className="flex justify-between gap-2 text-sm"
            style={{ color: colors.text }}
          >
            <span className="line-clamp-2 flex-1">
              {line.name} × {line.quantity}
            </span>
            <span className="shrink-0 font-medium">
              {formatPrice(line.lineTotal)}
            </span>
          </li>
        ))}
      </ul>
      <div
        className="border-t pt-4 flex justify-between font-semibold"
        style={{ borderColor: colors.border, color: colors.text }}
      >
        <span>Total ({lineCount} items)</span>
        <span style={{ color: colors.accent }}>{formatPrice(subtotal)}</span>
      </div>
      <p className="text-xs" style={{ color: colors.textSecondary }}>
        Payment: Cash on delivery. We will confirm by phone.
      </p>
    </StoreCard>
  );
}
