import LandingRoute, { buildLandingMetadata } from "@/components/landing/LandingRoute";

export function generateMetadata() {
  return buildLandingMetadata("bn");
}

export default function BanglaHome() {
  return <LandingRoute locale="bn" />;
}
