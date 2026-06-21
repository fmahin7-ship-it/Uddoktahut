"use client";

import { Banknote, Package, ShieldCheck, Truck } from "lucide-react";
import { useStoreTheme } from "@/hooks/useStoreTheme";

const TRUST_ITEMS = [
  { icon: Truck, label: "Fast local delivery" },
  { icon: Banknote, label: "Cash on delivery" },
  { icon: ShieldCheck, label: "Trusted checkout" },
  { icon: Package, label: "Quality products" },
];

export default function StoreTrustStrip() {
  const { colors } = useStoreTheme();

  return (
    <section className="px-6 py-10 max-w-6xl mx-auto">
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 rounded-2xl border p-5 sm:p-6"
        style={{
          borderColor: colors.border,
          backgroundColor: colors.cardBg,
        }}
      >
        {TRUST_ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${colors.accent}14`, color: colors.accent }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium leading-snug" style={{ color: colors.text }}>
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
