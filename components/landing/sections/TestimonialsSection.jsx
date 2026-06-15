"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/constants/landing/content";
import { landing } from "../landing-tokens";
import { SectionHeader } from "../ui/SectionHeader";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const t = TESTIMONIALS[index];

  return (
    <section className={landing.section}>
      <div className={cn(landing.container, "max-w-2xl")}>
        <SectionHeader title="ব্যবহারকারীদের মতামত" />
        <div className="relative min-h-[180px]">
          <AnimatePresence mode="wait">
            <m.blockquote
              key={index}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-green-400/20 bg-card p-6 shadow-sm"
            >
              <Quote className="mb-3 h-6 w-6 text-green-400/60" />
              <p className="text-base leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4">
                <cite className="not-italic">
                  <span className="font-semibold text-green-600 dark:text-green-400">{t.name}</span>
                  <span className="block text-sm text-muted-foreground">{t.role}</span>
                </cite>
              </footer>
            </m.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="rounded-lg border border-border p-2 transition-colors hover:border-green-400/40 hover:bg-green-400/5"
            aria-label="Previous"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
            className="rounded-lg border border-border p-2 transition-colors hover:border-green-400/40 hover:bg-green-400/5"
            aria-label="Next"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
