import { DEFAULT_MARKET_BY_LOCALE, isMarket, marketFromCountry } from "./config";

/**
 * Which prices a visitor sees. Never chosen by the visitor and never by language:
 * a signed-in seller's store country wins (so travelling changes nothing),
 * then the IP country, then the page language when location is unknown.
 */
export function detectMarket({ storeCountry, country, locale }) {
  if (isMarket(storeCountry)) return storeCountry;
  if (country) return marketFromCountry(country);
  return DEFAULT_MARKET_BY_LOCALE[locale] ?? "AU";
}

export function detectMarketFromRequest(req, { locale, storeCountry }) {
  return detectMarket({
    storeCountry,
    country: req.headers.get("x-vercel-ip-country"),
    locale,
  });
}
