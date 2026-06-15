"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { landing } from "../landing-tokens";

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduceMotion;
}

/** CSS + one observer per element — lighter than framer whileInView × 40. */
export function RevealOnScroll({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-5% 0px -5% 0px", threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      className={cn("landing-reveal", visible && "landing-reveal-visible", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
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
