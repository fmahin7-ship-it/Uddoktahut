"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/constants/landing/content";
import { usePlanPrices } from "@/lib/pricing/usePlanPrices";
import { landing } from "../landing-tokens";
import { SectionHeader } from "../ui/SectionHeader";
import { cn } from "@/lib/utils";

export function FAQSection({ market }) {
  const t = useTranslations("Landing.faq");
  const { prices } = usePlanPrices(market);
  const priceValues = { basicPrice: prices.basic, proPrice: prices.pro };
  const [open, setOpen] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className={landing.sectionMuted}>
      <div className={cn(landing.container, "max-w-2xl")}>
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div className="space-y-2">
          {FAQ_ITEMS.map((id, i) => {
            const isOpen = open === i;
            return (
              <div
                key={id}
                className={cn(
                  "overflow-hidden rounded-xl border bg-card transition-colors",
                  isOpen ? "border-green-400/40" : "border-border"
                )}
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="min-w-0 flex-1 text-pretty">{t(`items.${id}.question`, priceValues)}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-green-500 transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="border-t border-border px-4 py-3.5 text-sm leading-relaxed text-muted-foreground">
                        {t(`items.${id}.answer`, priceValues)}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
