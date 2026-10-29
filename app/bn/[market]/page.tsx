import LandingRoute, {
  buildLandingMetadata,
  generateLandingMarketParams,
  marketFromParam,
} from "@/features/landing/components/LandingRoute";

export const dynamicParams = false;
export const generateStaticParams = generateLandingMarketParams;

export function generateMetadata() {
  return buildLandingMetadata("bn");
}

export default async function BanglaHome({ params }: PageProps<"/bn/[market]">) {
  const { market } = await params;
  return <LandingRoute locale="bn" market={marketFromParam(market)} />;
}
