"use client";

import { HOW_IT_WORKS_STEPS } from "@/constants/landing/content";
import { landing } from "../landing-tokens";
import { SectionHeader } from "../ui/SectionHeader";
import { RevealOnScroll } from "../ui/motion";
import { cn } from "@/lib/utils";

export function HowItWorksSection() {
  return (
    <section className={landing.sectionMuted}>
      <div className={cn(landing.container, "max-w-3xl")}>
        <SectionHeader title="কিভাবে কাজ করে?" subtitle="৪টি সহজ ধাপ — কোনো কোডিং লাগে না।" />
        <ol className="space-y-3">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <RevealOnScroll key={step.step} delay={i * 0.08}>
              <li className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-400 text-sm font-bold text-green-900">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className={cn("mt-1", landing.body)}>{step.description}</p>
                </div>
              </li>
            </RevealOnScroll>
          ))}
        </ol>
      </div>
    </section>
  );
}
