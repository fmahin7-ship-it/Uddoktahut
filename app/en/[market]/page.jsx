import LandingRoute, {
  buildLandingMetadata,
  generateLandingMarketParams,
  marketFromParam,
} from "@/components/landing/LandingRoute";

export const dynamicParams = false;
export const generateStaticParams = generateLandingMarketParams;

export function generateMetadata() {
  return buildLandingMetadata("en");
}

export default async function EnglishHome({ params }) {
  const { market } = await params;
  return <LandingRoute locale="en" market={marketFromParam(market)} />;
}
