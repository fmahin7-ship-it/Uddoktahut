import LandingRoute, {
  buildLandingMetadata,
  generateLandingMarketParams,
  marketFromParam,
} from "@/features/landing/components/LandingRoute";

export const dynamicParams = false;
export const generateStaticParams = generateLandingMarketParams;

export function generateMetadata() {
  return buildLandingMetadata("en");
}

export default async function EnglishHome({ params }: PageProps<"/en/[market]">) {
  const { market } = await params;
  return <LandingRoute locale="en" market={marketFromParam(market)} />;
}
