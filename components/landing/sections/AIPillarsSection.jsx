"use client";

import { Brain, MessageCircle, Sparkles, TrendingUp } from "lucide-react";
import { AI_PILLARS } from "@/constants/landing/content";
import { landing } from "../landing-tokens";
import { SectionHeader } from "../ui/SectionHeader";
import { SurfaceCard } from "../ui/motion";
import { RevealOnScroll } from "../ui/motion";
import { cn } from "@/lib/utils";

const ICONS = {
  brain: Brain,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
  "message-circle": MessageCircle,
};

export function AIPillarsSection() {
  return (
    <section id="ai" className={landing.section}>
      <div className={landing.container}>
        <SectionHeader
          eyebrow="AI-চালিত SaaS"
          title="AI — শুধু অ্যানালিটিক্স নয়, পুরো ব্যবসা"
          subtitle="বুঝুন, তৈরি করুন, বিক্রি বাড়ান, সাপোর্ট দিন — চার দিক থেকে AI আপনার পাশে।"
          gradientTitle
        />
        <div className={cn(landing.grid, "sm:grid-cols-2 lg:grid-cols-4")}>
          {AI_PILLARS.map((pillar, i) => {
            const Icon = ICONS[pillar.icon];
            return (
              <RevealOnScroll key={pillar.id} delay={i * 0.05}>
                <SurfaceCard>
                  <div className={landing.iconBox}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-green-600 dark:text-green-400">
                    {pillar.titleEn}
                  </p>
                  <h3 className="mt-1 text-base font-bold">{pillar.title}</h3>
                  <p className={cn("mt-2", landing.body)}>{pillar.description}</p>
                </SurfaceCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
