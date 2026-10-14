import { getTranslations, setRequestLocale } from "next-intl/server";
import { MARKETS } from "@/lib/market/config";
import LandingPage from "./LandingPage";
import "./landing.css";

const OG_LOCALE = { bn: "bn_BD", en: "en_US" };

/**
 * One static page per market (/en/au, /en/bd, ...). Middleware rewrites /en and /bn
 * to the visitor's market, so the address bar and canonical URL stay /en and /bn.
 */
export function generateLandingMarketParams() {
  return MARKETS.map((market) => ({ market: market.toLowerCase() }));
}

export function marketFromParam(param) {
  return param.toUpperCase();
}

export async function buildLandingMetadata(locale) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const otherLocale = locale === "bn" ? "en" : "bn";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { bn: "/bn", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url: `/${locale}`,
      siteName: "UddoktaHut",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "UddoktaHut" }],
      locale: OG_LOCALE[locale],
      alternateLocale: [OG_LOCALE[otherLocale]],
      type: "website",
    },
  };
}

export default function LandingRoute({ locale, market }) {
  setRequestLocale(locale);

  return (
    <main className="overflow-x-clip bg-background text-foreground">
      <LandingPage market={market} />
    </main>
  );
}
