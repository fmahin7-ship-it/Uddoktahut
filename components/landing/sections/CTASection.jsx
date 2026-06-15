"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { CTA_CONTENT } from "@/constants/landing/content";
import { landing } from "../landing-tokens";
import { RevealOnScroll } from "../ui/motion";
import { cn } from "@/lib/utils";

const PERKS = ["৭ দিন ফ্রি", "সীমিত AI টোকেন", "কার্ড লাগে না"];

export function CTASection() {
  return (
    <section className="relative overflow-hidden px-4 py-10 sm:px-6 lg:py-11">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0d2a1f] via-green-800 to-[#14532d]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(74,222,128,0.14),transparent_50%)]"
        aria-hidden
      />
      <div
        className="absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-green-400/12 blur-3xl"
        aria-hidden
      />

      <RevealOnScroll className={cn(landing.container, "relative max-w-2xl text-center")}>
        <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-green-400/25 bg-green-400/10 px-3 py-0.5 text-[11px] font-semibold text-green-400">
          <Sparkles className="h-3 w-3" />
          ৭ দিন ফ্রি ট্রায়াল
        </p>

        <h2 className="text-xl font-bold tracking-tight text-balance text-white sm:text-2xl">
          আজই শুরু করুন —{" "}
          <span className={landing.gradientText}>AI দিয়ে</span> ব্যবসা এগিয়ে নিন
        </h2>

        <p className="mt-2 text-sm text-green-100/80">{CTA_CONTENT.subtitle}</p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
          {PERKS.map((perk) => (
            <span
              key={perk}
              className="rounded-full border border-green-400/20 bg-green-400/8 px-2.5 py-0.5 text-[11px] font-medium text-green-100/90"
            >
              {perk}
            </span>
          ))}
        </div>

        <Link
          href={CTA_CONTENT.button.href}
          className="group mx-auto mt-5 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-green-400 px-6 py-3 text-sm font-bold text-green-900 shadow-[0_4px_20px_rgba(74,222,128,0.3)] transition-all hover:bg-[#05f27c] sm:w-auto"
        >
          {CTA_CONTENT.button.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </RevealOnScroll>
    </section>
  );
}
