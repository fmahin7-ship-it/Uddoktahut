"use client";

import { useTranslations } from "next-intl";
import { CreditCard, Package, Palette, Store } from "lucide-react";
import { COMMERCE_FEATURES } from "@/features/landing/content";
import { landing } from "@/features/landing/components/landing-tokens";
import { SectionHeader } from "@/features/landing/components/ui/SectionHeader";
import { StatusBadge } from "@/features/landing/components/ui/StatusBadge";
import { SurfaceCard, RevealOnScroll } from "@/features/landing/components/ui/motion";
import { cn } from "@/shared/lib/utils";

const ICONS = {
  store: Store,
  package: Package,
  palette: Palette,
  "credit-card": CreditCard,
};

export function CommerceSection() {
  const t = useTranslations("Landing.commerce");

  return (
    <section id="features" className={landing.section}>
      <div className={landing.container}>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <div className={cn(landing.grid, "sm:grid-cols-2 lg:grid-cols-4")}>
          {COMMERCE_FEATURES.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <RevealOnScroll key={item.id} delay={i * 0.04}>
                <SurfaceCard>
                  <div className="mb-3 flex items-center justify-between">
                    <div className={landing.iconBox}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {item.status !== "live" && <StatusBadge status={item.status} />}
                  </div>
                  <h3 className="text-sm font-semibold">{t(`items.${item.id}.title`)}</h3>
                  <p className={cn("mt-1.5", landing.body)}>{t(`items.${item.id}.description`)}</p>
                </SurfaceCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
