"use client";

import { formatPrice } from "@/lib/utils/formatPrice";

export default function CartSummary({ lineCount, subtotal, children }) {
  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <h2 className="font-semibold text-lg">Order summary</h2>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Items ({lineCount})</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between font-semibold border-t pt-3">
        <span>Total</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <p className="text-xs text-muted-foreground">Cash on delivery (COD)</p>
      {children}
    </div>
  );
}
