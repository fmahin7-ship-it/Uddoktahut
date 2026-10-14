"use client";

import { useTranslations } from "next-intl";
import { Package, CreditCard, Truck, BarChart3, Globe, Users } from "lucide-react";
import { COMMERCE_FEATURES } from "@/constants/landing/content";
import { landing } from "../landing-tokens";
import { SectionHeader } from "../ui/SectionHeader";
import { StatusBadge } from "../ui/StatusBadge";
import { SurfaceCard, RevealOnScroll } from "../ui/motion";
import { cn } from "@/lib/utils";

const ICONS = [Package, CreditCard, Truck, BarChart3, Globe, Users, Package, Users];

export function CommerceSection() {
  const t = useTranslations("Landing.commerce");

  return (
    <section id="features" className={landing.section}>
      <div className={landing.container}>
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          gradientTitle
        />
        <div className={cn(landing.grid, "sm:grid-cols-2 lg:grid-cols-4")}>
          {COMMERCE_FEATURES.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <RevealOnScroll key={item.id} delay={i * 0.04}>
                <SurfaceCard>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-400/15 text-green-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <StatusBadge status={item.status} />
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
