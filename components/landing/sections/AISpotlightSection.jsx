"use client";

import { useTranslations } from "next-intl";
import { RevealOnScroll } from "../ui/motion";
import { ProductDemoMockup } from "./ProductDemoMockup";
import { landing } from "../landing-tokens";
import { SectionHeader } from "../ui/SectionHeader";
import { cn } from "@/lib/utils";

export function AISpotlightSection() {
  const t = useTranslations("Landing.spotlight");

  return (
    <section className={cn(landing.sectionDark, "relative overflow-hidden")}>
      {/* Glow stays inside dark section — right side only, no green band at top */}
      <div
        className="pointer-events-none absolute -right-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-green-400/8 blur-2xl sm:h-80 sm:w-80 sm:bg-green-400/10 sm:blur-3xl"
        aria-hidden
      />

      <div className={cn(landing.container, "relative grid items-center gap-8 lg:grid-cols-2")}>
        <RevealOnScroll>
          <SectionHeader
            align="left"
            onDark
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            gradientTitle
            className="mb-0 max-w-none"
          />
          <ul className="mt-5 space-y-2.5">
            {t.raw("points").map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-zinc-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-400 text-xs font-bold text-green-900">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <ProductDemoMockup animated onDark />
        </RevealOnScroll>
      </div>
    </section>
  );
}
