"use client";

import { useTranslations } from "next-intl";
import { HOW_IT_WORKS_STEPS } from "@/features/landing/content";
import { landing } from "@/features/landing/components/landing-tokens";
import { SectionHeader } from "@/features/landing/components/ui/SectionHeader";
import { RevealOnScroll } from "@/features/landing/components/ui/motion";
import { cn } from "@/shared/lib/utils";

export function HowItWorksSection() {
  const t = useTranslations("Landing.howItWorks");

  return (
    <section className={landing.sectionMuted}>
      <div className={cn(landing.container, "max-w-3xl")}>
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <ol className="space-y-3">
          {HOW_IT_WORKS_STEPS.map((id, i) => (
            <RevealOnScroll key={id} delay={i * 0.08}>
              <li className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-400 text-sm font-bold text-green-900">
                  {t(`steps.${id}.number`)}
                </span>
                <div>
                  <h3 className="text-base font-semibold">{t(`steps.${id}.title`)}</h3>
                  <p className={cn("mt-1", landing.body)}>{t(`steps.${id}.description`)}</p>
                </div>
              </li>
            </RevealOnScroll>
          ))}
        </ol>
      </div>
    </section>
  );
}
