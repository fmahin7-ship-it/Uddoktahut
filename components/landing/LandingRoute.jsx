import { getTranslations, setRequestLocale } from "next-intl/server";
import LandingPage from "./LandingPage";
import "./landing.css";

const OG_LOCALE = { bn: "bn_BD", en: "en_US" };

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

export default function LandingRoute({ locale }) {
  setRequestLocale(locale);

  return (
    <main className="overflow-x-clip bg-background text-foreground">
      <LandingPage />
    </main>
  );
}
