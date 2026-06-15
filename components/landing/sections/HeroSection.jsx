"use client";

import { ArrowRight, Play, Sparkles } from "lucide-react";
import { HERO_CONTENT, TRUST_ITEMS } from "@/constants/landing/content";
import { landing } from "../landing-tokens";
import { GradientBackground } from "../ui/GradientBackground";
import { BrandButton } from "../ui/BrandButton";
import { RevealOnScroll } from "../ui/motion";
import { ProductDemoMockup } from "./ProductDemoMockup";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:pb-12 lg:pt-10">
      <GradientBackground />

      <div className={cn(landing.container, "relative grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-8")}>
        <RevealOnScroll>
          <p className={landing.eyebrow}>
            <Sparkles className="h-3.5 w-3.5 text-green-500" />
            {HERO_CONTENT.badge}
          </p>

          <h1 className="mt-4 text-[1.75rem] font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            <span className={landing.gradientText}>AI দিয়ে</span> চালান
            <br />
            আপনার অনলাইন ব্যবসা
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            {HERO_CONTENT.subtitle}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BrandButton href={HERO_CONTENT.primaryCta.href}>
              {HERO_CONTENT.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </BrandButton>
            <BrandButton href={HERO_CONTENT.secondaryCta.href} variant="secondary">
              <Play className="h-4 w-4 fill-current" />
              {HERO_CONTENT.secondaryCta.label}
            </BrandButton>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">{HERO_CONTENT.finePrint}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {TRUST_ITEMS.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded-full border border-green-400/25 bg-green-400/8 px-3 py-1 text-xs font-medium text-foreground/80"
              >
                {item}
              </span>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.12} className="relative lg:pl-4">
          <div className="landing-float-y relative">
            <div className="absolute -inset-3 rounded-3xl bg-green-400/20 blur-2xl" aria-hidden />
            <ProductDemoMockup animated />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
