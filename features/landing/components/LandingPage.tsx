import type { MarketCode } from "@/shared/api/types";
import { LandingMotionShell } from "@/features/landing/components/LandingMotionShell";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";
import { HeroSection } from "@/features/landing/components/sections/HeroSection";
import { TrustStrip } from "@/features/landing/components/sections/TrustStrip";
import {
  AICopilotSection,
  CommerceSection,
  HowItWorksSection,
  PricingSection,
  FAQSection,
  CTASection,
  LandingFooter,
} from "@/features/landing/components/landing-dynamic";

/**
 * Server composer — hero loads first; below-fold sections are lazy chunks.
 * Copy: messages/{bn,en}.json · structure: constants/landing/content.js
 */
export default function LandingPage({ market }: { market: MarketCode }) {
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
