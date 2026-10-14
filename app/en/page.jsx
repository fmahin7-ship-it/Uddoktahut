import LandingRoute, { buildLandingMetadata } from "@/components/landing/LandingRoute";

export function generateMetadata() {
  return buildLandingMetadata("en");
}

export default function EnglishHome() {
  return <LandingRoute locale="en" />;
}
