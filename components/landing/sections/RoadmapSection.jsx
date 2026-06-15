"use client";

import { ROADMAP_PHASES } from "@/constants/landing/content";
import { landing } from "../landing-tokens";
import { SectionHeader } from "../ui/SectionHeader";
import { StatusBadge } from "../ui/StatusBadge";
import { SurfaceCard, RevealOnScroll } from "../ui/motion";
import { cn } from "@/lib/utils";

export function RoadmapSection() {
  return (
    <section id="roadmap" className={landing.sectionMuted}>
      <div className={landing.container}>
        <SectionHeader
          title="রোডম্যাপ"
          subtitle="আমরা ধাপে ধাপে গড়ে তুলছি — সব কিছু স্পষ্ট লেবেলে।"
        />
        <div className={cn(landing.grid, "md:grid-cols-3")}>
          {ROADMAP_PHASES.map((phase, i) => (
            <RevealOnScroll key={phase.phase} delay={i * 0.08}>
              <SurfaceCard>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold">{phase.phase}</h3>
                  <StatusBadge status={phase.status} />
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SurfaceCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
