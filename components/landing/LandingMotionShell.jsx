"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/** Slim framer-motion — only dom animation features, not the full library. */
export function LandingMotionShell({ children }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
