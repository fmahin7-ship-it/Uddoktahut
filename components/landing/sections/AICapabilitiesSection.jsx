"use client";

import { useTranslations } from "next-intl";
import { AI_CAPABILITIES } from "@/constants/landing/content";
import { landing } from "../landing-tokens";
import { SectionHeader } from "../ui/SectionHeader";
import { StatusBadge } from "../ui/StatusBadge";
import { SurfaceCard, RevealOnScroll } from "../ui/motion";
import { cn } from "@/lib/utils";

export function AICapabilitiesSection() {
  const t = useTranslations("Landing.capabilities");

  return (
    <section className={landing.sectionMuted}>
      <div className={landing.container}>
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div className={cn(landing.grid, "sm:grid-cols-2 lg:grid-cols-3")}>
          {AI_CAPABILITIES.map((item, i) => (
            <RevealOnScroll key={item.id} delay={i * 0.03}>
              <SurfaceCard>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-snug">{t(`items.${item.id}.title`)}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <p className={landing.body}>{t(`items.${item.id}.description`)}</p>
              </SurfaceCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
