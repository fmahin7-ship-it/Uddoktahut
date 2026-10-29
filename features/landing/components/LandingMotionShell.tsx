"use client";

import type React from "react";
import { LazyMotion, domAnimation } from "framer-motion";

/** Slim framer-motion — only dom animation features, not the full library. */
export function LandingMotionShell({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
