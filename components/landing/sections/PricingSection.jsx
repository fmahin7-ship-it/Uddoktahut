"use client";

import Link from "next/link";
import { Check, Sparkles, X } from "lucide-react";
import { PRICING_NOTE, PRICING_PLANS } from "@/constants/landing/content";
import { landing } from "../landing-tokens";
import { SectionHeader } from "../ui/SectionHeader";
import { SurfaceCard, RevealOnScroll } from "../ui/motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section id="pricing" className={landing.section}>
      <div className={landing.container}>
        <SectionHeader
          eyebrow="স্পষ্ট মূল্য"
          title="টোকেন-ভিত্তিক AI প্রাইসিং"
          subtitle="বেসিক = AI ছাড়া ম্যানুয়াল। AI প্ল্যান = টোকেন অনুযায়ী।"
          gradientTitle
        />
        <p className="mx-auto -mt-6 mb-8 max-w-xl text-center text-sm text-muted-foreground">
          {PRICING_NOTE}
        </p>

        {/* flex-wrap + justify-center → 5 cards become 3+2 centered, no orphan gap */}
        <div className="flex flex-wrap justify-center gap-4">
          {PRICING_PLANS.map((plan, i) => (
            <RevealOnScroll key={plan.id} delay={i * 0.05} className={landing.pricingItem}>
              <SurfaceCard highlight={plan.popular} className={cn("relative flex h-full flex-col", plan.popular && "pt-4")}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-400 px-3 py-0.5 text-[11px] font-bold text-green-900">
                    জনপ্রিয়
                  </span>
                )}
                <h3 className="text-base font-bold">{plan.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{plan.tagline}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={cn("text-3xl font-bold", landing.gradientText)}>{plan.price}</span>
                  <span className="text-xs text-muted-foreground">{plan.period}</span>
                </div>
                <div
                  className={cn(
                    "mt-3 flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium",
                    plan.includesAi
                      ? "bg-green-400/15 text-green-700 dark:text-green-400"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {plan.includesAi ? <Sparkles className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  {plan.aiLabel}
                </div>
                <ul className="mt-4 flex-1 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn(
                    "mt-5 w-full font-semibold",
                    plan.popular
                      ? "bg-green-400 text-green-900 hover:bg-[#05f27c]"
                      : "border-green-400/30 hover:bg-green-400/10"
                  )}
                  variant={plan.popular ? "default" : "outline"}
                  size="sm"
                  asChild
                >
                  <Link href={plan.cta.href}>{plan.cta.label}</Link>
                </Button>
              </SurfaceCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
