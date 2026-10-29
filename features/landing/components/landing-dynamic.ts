import dynamic from "next/dynamic";

/** Below-the-fold sections — separate JS chunks, loaded after first paint. */
export const AICopilotSection = dynamic(
  () => import("@/features/landing/components/sections/AICopilotSection").then((m) => ({ default: m.AICopilotSection })),
  { loading: () => null, ssr: true }
);
export const CommerceSection = dynamic(
  () => import("@/features/landing/components/sections/CommerceSection").then((m) => ({ default: m.CommerceSection })),
  { loading: () => null, ssr: true }
);
export const HowItWorksSection = dynamic(
  () => import("@/features/landing/components/sections/HowItWorksSection").then((m) => ({ default: m.HowItWorksSection })),
  { loading: () => null, ssr: true }
);
export const PricingSection = dynamic(
  () => import("@/features/landing/components/sections/PricingSection").then((m) => ({ default: m.PricingSection })),
  { loading: () => null, ssr: true }
);
export const FAQSection = dynamic(
  () => import("@/features/landing/components/sections/FAQSection").then((m) => ({ default: m.FAQSection })),
  { loading: () => null, ssr: true }
);
export const CTASection = dynamic(
  () => import("@/features/landing/components/sections/CTASection").then((m) => ({ default: m.CTASection })),
  { loading: () => null, ssr: true }
);
export const LandingFooter = dynamic(
  () => import("@/features/landing/components/sections/LandingFooter").then((m) => ({ default: m.LandingFooter })),
  { loading: () => null, ssr: true }
);
