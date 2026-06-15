"use client";

import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { landing } from "../landing-tokens";

const fadeUp = { duration: 0.45, ease: [0.22, 1, 0.36, 1] };

export function RevealOnScroll({ children, className, delay = 0 }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ ...fadeUp, delay }}
    >
      {children}
    </m.div>
  );
}

export function SurfaceCard({ children, className, highlight = false }) {
  return (
    <div className={cn(highlight ? landing.cardHighlight : landing.card, "h-full", className)}>
      {children}
    </div>
  );
}

export const GlowCard = SurfaceCard;
