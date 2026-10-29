"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { HERO_LINKS } from "@/features/landing/content";
import { landing } from "@/features/landing/components/landing-tokens";
import { GradientBackground } from "@/features/landing/components/ui/GradientBackground";
import { BrandButton } from "@/features/landing/components/ui/BrandButton";
import { ProductDemoMockup } from "@/features/landing/components/sections/ProductDemoMockup";
import { cn } from "@/shared/lib/utils";

export function HeroSection() {
  const t = useTranslations("Landing");
  const trustItems = t.raw("trust.items") as string[];

  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:pb-12 lg:pt-10">
      <GradientBackground />

      <div className={cn(landing.container, "relative grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-8")}>
        <div className="landing-hero-in">
          <p className={landing.eyebrow}>
            <Sparkles className="h-3.5 w-3.5 text-green-500" />
            {t("hero.badge")}
          </p>

          <h1 className="mt-4 text-[1.75rem] font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            {t.rich("hero.title", {
              hl: (chunks) => <span className={landing.gradientText}>{chunks}</span>,
              br: () => <br />,
            })}
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            {t("hero.subtitle")}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BrandButton href={HERO_LINKS.primaryCta}>
              {t("hero.primaryCta")}
              <ArrowRight className="h-4 w-4" />
            </BrandButton>
            <BrandButton href={HERO_LINKS.secondaryCta} variant="secondary">
              <Play className="h-4 w-4 fill-current" />
              {t("hero.secondaryCta")}
            </BrandButton>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">{t("hero.finePrint")}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {trustItems.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded-full border border-green-400/25 bg-green-400/8 px-3 py-1 text-xs font-medium text-foreground/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="landing-hero-in landing-hero-in-delay relative lg:pl-4">
          <div className="landing-float-y relative">
            <div
              className="absolute -inset-3 rounded-3xl bg-green-400/15 blur-xl sm:bg-green-400/20 sm:blur-2xl"
              aria-hidden
            />
            <ProductDemoMockup animated />
          </div>
        </div>
      </div>
    </section>
  );
}
