"use client";

import { useTranslations } from "next-intl";
import { Bot, History, Languages, Lock } from "lucide-react";
import { AI_FEATURES } from "@/constants/landing/content";
import { RevealOnScroll } from "../ui/motion";
import { ProductDemoMockup } from "./ProductDemoMockup";
import { landing } from "../landing-tokens";
import { SectionHeader } from "../ui/SectionHeader";
import { cn } from "@/lib/utils";

const ICONS = {
  bot: Bot,
  lock: Lock,
  history: History,
  languages: Languages,
};

export function AICopilotSection() {
  const t = useTranslations("Landing.ai");

  return (
    <section id="ai" className={cn(landing.sectionDark, "relative overflow-hidden")}>
      <div
        className="pointer-events-none absolute -right-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-green-400/8 blur-2xl sm:h-80 sm:w-80 sm:bg-green-400/10 sm:blur-3xl"
        aria-hidden
      />

      <div className={cn(landing.container, "relative grid items-center gap-10 lg:grid-cols-2")}>
        <RevealOnScroll>
          <SectionHeader
            align="left"
            onDark
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            className="mb-0 max-w-none"
          />
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {AI_FEATURES.map((feature) => {
              const Icon = ICONS[feature.icon];
              return (
                <li key={feature.id} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-400/15 text-green-400">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">{t(`features.${feature.id}.title`)}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                      {t(`features.${feature.id}.description`)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <ProductDemoMockup animated onDark conversation="spotlight" />
        </RevealOnScroll>
      </div>
    </section>
  );
}
