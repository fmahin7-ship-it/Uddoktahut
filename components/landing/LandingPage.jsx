import { LandingMotionShell } from "./LandingMotionShell";
import { LandingNavbar } from "./LandingNavbar";
import { HeroSection } from "./sections/HeroSection";
import { TrustStrip } from "./sections/TrustStrip";
import {
  AICopilotSection,
  CommerceSection,
  HowItWorksSection,
  PricingSection,
  FAQSection,
  CTASection,
  LandingFooter,
} from "./landing-dynamic";

/**
 * Server composer — hero loads first; below-fold sections are lazy chunks.
 * Copy: messages/{bn,en}.json · structure: constants/landing/content.js
 */
export default function LandingPage({ market }) {
  return (
    <LandingMotionShell>
      <LandingNavbar />
      <HeroSection />
      <TrustStrip />
      <AICopilotSection />
      <CommerceSection />
      <HowItWorksSection />
      <PricingSection market={market} />
      <FAQSection market={market} />
      <CTASection />
      <LandingFooter />
    </LandingMotionShell>
  );
}
