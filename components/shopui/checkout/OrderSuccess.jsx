"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import StoreShell from "@/components/shopui/layout/StoreShell";
import StoreCard from "@/components/shopui/common/StoreCard";
import StorePrimaryButton from "@/components/shopui/common/StorePrimaryButton";

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "—";
  const total = searchParams.get("total");
  const phone = searchParams.get("phone");
  const { colors } = useStoreTheme();

  return (
    <StoreShell backHref="/shop" backLabel="Back to shop">
      <div className="max-w-lg mx-auto px-4 py-16 sm:py-24 text-center">
        <div
          className="rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"
          style={{
            backgroundColor: `${colors.accent}18`,
            color: colors.accent,
          }}
        >
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: colors.text }}>
          Order placed successfully
        </h1>
        <p className="mb-10 text-sm sm:text-base" style={{ color: colors.textSecondary }}>
          Thank you — we received your order and will contact you shortly.
        </p>

        <StoreCard className="p-6 text-left space-y-4 mb-10">
          <div className="flex justify-between text-sm gap-4">
            <span style={{ color: colors.textSecondary }}>Order number</span>
            <span className="font-semibold" style={{ color: colors.text }}>
              {orderNumber}
            </span>
          </div>
          {total && (
            <div className="flex justify-between text-sm gap-4">
              <span style={{ color: colors.textSecondary }}>Total (COD)</span>
              <span className="font-bold" style={{ color: colors.accent }}>
                {formatPrice(total)}
              </span>
            </div>
          )}
          {phone && (
            <div className="flex justify-between text-sm gap-4">
              <span style={{ color: colors.textSecondary }}>Contact phone</span>
              <span className="font-semibold" style={{ color: colors.text }}>
                {phone}
              </span>
            </div>
          )}
          <p
            className="text-xs pt-3 border-t"
            style={{ borderColor: colors.border, color: colors.textSecondary }}
          >
            Pay with cash when your order is delivered.
          </p>
        </StoreCard>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <StorePrimaryButton asChild className="h-11 px-8 rounded-xl">
            <Link href="/shop">Continue shopping</Link>
          </StorePrimaryButton>
          <StorePrimaryButton asChild variant="outline" className="h-11 px-8 rounded-xl">
            <Link href="/">Back to home</Link>
          </StorePrimaryButton>
        </div>
      </div>
    </StoreShell>
  );
}
