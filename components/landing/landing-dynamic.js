import dynamic from "next/dynamic";

/** Below-the-fold sections — separate JS chunks, loaded after first paint. */
export const AICopilotSection = dynamic(
  () => import("./sections/AICopilotSection").then((m) => ({ default: m.AICopilotSection })),
  { loading: () => null, ssr: true }
);
export const CommerceSection = dynamic(
  () => import("./sections/CommerceSection").then((m) => ({ default: m.CommerceSection })),
  { loading: () => null, ssr: true }
);
export const HowItWorksSection = dynamic(
  () => import("./sections/HowItWorksSection").then((m) => ({ default: m.HowItWorksSection })),
  { loading: () => null, ssr: true }
);
export const PricingSection = dynamic(
  () => import("./sections/PricingSection").then((m) => ({ default: m.PricingSection })),
  { loading: () => null, ssr: true }
);
export const FAQSection = dynamic(
  () => import("./sections/FAQSection").then((m) => ({ default: m.FAQSection })),
  { loading: () => null, ssr: true }
);
export const CTASection = dynamic(
  () => import("./sections/CTASection").then((m) => ({ default: m.CTASection })),
  { loading: () => null, ssr: true }
);
export const LandingFooter = dynamic(
  () => import("./sections/LandingFooter").then((m) => ({ default: m.LandingFooter })),
  { loading: () => null, ssr: true }
);
