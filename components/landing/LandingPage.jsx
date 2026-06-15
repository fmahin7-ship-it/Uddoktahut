import { LandingMotionShell } from "./LandingMotionShell";
import { LandingNavbar } from "./LandingNavbar";
import { HeroSection } from "./sections/HeroSection";
import { TrustStrip } from "./sections/TrustStrip";
import {
  AIPillarsSection,
  AISpotlightSection,
  AICapabilitiesSection,
  CommerceSection,
  HowItWorksSection,
  PricingSection,
  RoadmapSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  LandingFooter,
} from "./landing-dynamic";

/**
 * Server composer — hero loads first; below-fold sections are lazy chunks.
 * Copy: constants/landing/content.js
 */
export default function LandingPage() {
  return (
    <LandingMotionShell>
      <LandingNavbar />
      <HeroSection />
      <TrustStrip />
      <AIPillarsSection />
      <AISpotlightSection />
      <AICapabilitiesSection />
      <CommerceSection />
      <HowItWorksSection />
      <PricingSection />
      <RoadmapSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <LandingFooter />
    </LandingMotionShell>
  );
}
