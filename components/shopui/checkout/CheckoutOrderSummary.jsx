"use client";

import { formatPrice } from "@/lib/utils/formatPrice";

export default function CheckoutOrderSummary({ lines, subtotal, lineCount }) {
  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <h2 className="font-semibold text-lg">Your order</h2>
      <ul className="space-y-3 max-h-64 overflow-y-auto">
        {lines.map((line) => (
          <li
            key={line.productId}
            className="flex justify-between gap-2 text-sm"
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
      <div className="border-t pt-3 flex justify-between font-semibold">
        <span>Total ({lineCount} items)</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <p className="text-xs text-muted-foreground">
        Payment: Cash on delivery. We will confirm by phone.
      </p>
    </div>
  );
}
