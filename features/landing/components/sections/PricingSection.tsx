"use client";

import type { MarketCode } from "@/shared/api/types";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Check, Sparkles, X } from "lucide-react";
import { PRICING_PLANS } from "@/features/landing/content";
import { usePlanPrices } from "@/shared/pricing/usePlanPrices";
import { landing } from "@/features/landing/components/landing-tokens";
import { SectionHeader } from "@/features/landing/components/ui/SectionHeader";
import { SurfaceCard, RevealOnScroll } from "@/features/landing/components/ui/motion";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export function PricingSection({ market }: { market: MarketCode }) {
  const t = useTranslations("Landing.pricing");
  const tMarket = useTranslations("Common.market");
  const { currency, prices } = usePlanPrices(market);

  return (
    <section id="pricing" className={landing.section}>
      <div className={landing.container}>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <p className="mx-auto -mt-4 mb-8 max-w-xl text-center text-sm text-muted-foreground">
          {t("note", { country: tMarket(market), currency })}
        </p>

        <div className={cn(landing.grid, "sm:grid-cols-2 lg:grid-cols-4")}>
          {PRICING_PLANS.map((plan, i) => {
            const key = (field: string) => `plans.${plan.id}.${field}`;
            return (
              <RevealOnScroll key={plan.id} delay={i * 0.05}>
                <SurfaceCard
                  highlight={plan.popular}
                  className={cn("relative flex h-full flex-col", plan.popular && "pt-4")}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-green-400 px-3 py-0.5 text-[11px] font-bold text-green-900">
                      {t("popular")}
                    </span>
                  )}
                  <h3 className="text-base font-bold">{t(key("name"))}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t(key("tagline"))}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">{prices[plan.id]}</span>
                    <span className="text-xs text-muted-foreground">{t(key("period"))}</span>
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
                    {t(key("aiLabel"))}
                  </div>
                  <ul className="mt-4 flex-1 space-y-2">
                    {(t.raw(key("features")) as string[]).map((feature) => (
                      <li key={feature} className="flex gap-2 text-sm">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
                        {feature}
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
                    <Link href={plan.href}>{t(key("cta"))}</Link>
                  </Button>
                </SurfaceCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
