import dynamic from "next/dynamic";

/** Below-the-fold sections — separate JS chunks, loaded after first paint. */
export const AIPillarsSection = dynamic(
  () => import("./sections/AIPillarsSection").then((m) => ({ default: m.AIPillarsSection })),
  { loading: () => null, ssr: true }
);
export const AISpotlightSection = dynamic(
  () => import("./sections/AISpotlightSection").then((m) => ({ default: m.AISpotlightSection })),
  { loading: () => null, ssr: true }
);
export const AICapabilitiesSection = dynamic(
  () => import("./sections/AICapabilitiesSection").then((m) => ({ default: m.AICapabilitiesSection })),
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
export const RoadmapSection = dynamic(
  () => import("./sections/RoadmapSection").then((m) => ({ default: m.RoadmapSection })),
  { loading: () => null, ssr: true }
);
export const TestimonialsSection = dynamic(
  () => import("./sections/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
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
