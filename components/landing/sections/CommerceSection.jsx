"use client";

import { Package, CreditCard, Truck, BarChart3, Globe, Users } from "lucide-react";
import { COMMERCE_FEATURES } from "@/constants/landing/content";
import { landing } from "../landing-tokens";
import { SectionHeader } from "../ui/SectionHeader";
import { StatusBadge } from "../ui/StatusBadge";
import { SurfaceCard, RevealOnScroll } from "../ui/motion";
import { cn } from "@/lib/utils";

const ICONS = [Package, CreditCard, Truck, BarChart3, Globe, Users, Package, Users];

export function CommerceSection() {
  return (
    <section id="features" className={landing.section}>
      <div className={landing.container}>
        <SectionHeader
          eyebrow="ই-কমার্স ফাউন্ডেশন"
          title="স্টোর ও কমার্স — AI-এর ভিত্তি"
          subtitle="AI ছাড়াও সম্পূর্ণ স্টোর ম্যানেজমেন্ট। বেসিক প্ল্যানে ম্যানুয়ালি, AI প্ল্যানে স্মার্ট অটোমেশন।"
          gradientTitle
        />
        <div className={cn(landing.grid, "sm:grid-cols-2 lg:grid-cols-4")}>
          {COMMERCE_FEATURES.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <RevealOnScroll key={item.title} delay={i * 0.04}>
                <SurfaceCard>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-400/15 text-green-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className={cn("mt-1.5", landing.body)}>{item.description}</p>
                </SurfaceCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
