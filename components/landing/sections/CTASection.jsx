"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";
import { CTA_LINK } from "@/constants/landing/content";
import { landing } from "../landing-tokens";
import { RevealOnScroll } from "../ui/motion";
import { cn } from "@/lib/utils";

export function CTASection() {
  const t = useTranslations("Landing.cta");

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:py-14">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0d2a1f] via-green-800 to-[#14532d]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(74,222,128,0.14),transparent_50%)]"
        aria-hidden
      />

      <RevealOnScroll className={cn(landing.container, "relative max-w-2xl text-center")}>
        <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-green-400/25 bg-green-400/10 px-3 py-0.5 text-[11px] font-semibold text-green-400">
          <Sparkles className="h-3 w-3" />
          {t("badge")}
        </p>

        <h2 className="text-xl font-bold tracking-tight text-balance text-white sm:text-2xl">
          {t.rich("title", {
            hl: (chunks) => <span className={landing.gradientText}>{chunks}</span>,
          })}
        </h2>

        <p className="mt-2 text-sm text-green-100/80">{t("subtitle")}</p>

        <Link
          href={CTA_LINK}
          className="group mx-auto mt-6 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-green-400 px-6 py-3 text-sm font-bold text-green-900 shadow-[0_4px_20px_rgba(74,222,128,0.3)] transition-all hover:bg-[#05f27c] sm:w-auto"
        >
          {t("button")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </RevealOnScroll>
    </section>
  );
}
