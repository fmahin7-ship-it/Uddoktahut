"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils/formatPrice";
import StoreShell from "@/components/shopui/layout/StoreShell";

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "—";
  const total = searchParams.get("total");
  const phone = searchParams.get("phone");

  return (
    <StoreShell backHref="/shop" backLabel="Back to shop">
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="rounded-full w-16 h-16 bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-6 text-2xl">
          ✓
        </div>
        <h1 className="text-2xl font-bold mb-2">Order placed!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you. Your order has been received.
        </p>

        <div className="rounded-xl border bg-card p-5 text-left space-y-2 mb-8">
          <p className="text-sm">
            <span className="text-muted-foreground">Order number: </span>
            <span className="font-semibold">{orderNumber}</span>
          </p>
          {total && (
            <p className="text-sm">
              <span className="text-muted-foreground">Total: </span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </p>
          )}
          {phone && (
            <p className="text-sm">
              <span className="text-muted-foreground">We will call: </span>
              <span className="font-semibold">{phone}</span>
            </p>
          )}
          <p className="text-xs text-muted-foreground pt-2">
            Pay with cash when your order is delivered.
          </p>
        </div>

        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    </StoreShell>
  );
}
