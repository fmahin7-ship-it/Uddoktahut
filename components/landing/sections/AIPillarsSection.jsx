"use client";

import { useTranslations } from "next-intl";
import { Brain, MessageCircle, Sparkles, TrendingUp } from "lucide-react";
import { AI_PILLARS } from "@/constants/landing/content";
import { landing } from "../landing-tokens";
import { SectionHeader } from "../ui/SectionHeader";
import { SurfaceCard } from "../ui/motion";
import { RevealOnScroll } from "../ui/motion";
import { cn } from "@/lib/utils";

const ICONS = {
  brain: Brain,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
  "message-circle": MessageCircle,
};

export function AIPillarsSection() {
  const t = useTranslations("Landing.pillars");

  return (
    <section id="ai" className={landing.section}>
      <div className={landing.container}>
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          gradientTitle
        />
        <div className={cn(landing.grid, "sm:grid-cols-2 lg:grid-cols-4")}>
          {AI_PILLARS.map((pillar, i) => {
            const Icon = ICONS[pillar.icon];
            return (
              <RevealOnScroll key={pillar.id} delay={i * 0.05}>
                <SurfaceCard>
                  <div className={landing.iconBox}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-green-600 dark:text-green-400">
                    {t(`items.${pillar.id}.label`)}
                  </p>
                  <h3 className="mt-1 text-base font-bold">{t(`items.${pillar.id}.title`)}</h3>
                  <p className={cn("mt-2", landing.body)}>{t(`items.${pillar.id}.description`)}</p>
                </SurfaceCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
