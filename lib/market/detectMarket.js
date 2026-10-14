import { DEFAULT_MARKET_BY_LOCALE, MARKET_COOKIE, isMarket, marketFromCountry } from "./config";

/**
 * Price market follows where the visitor is, never the language they read.
 * Explicit choice (cookie) wins, then IP country, then the page language.
 */
export function detectMarket({ cookieMarket, country, locale }) {
  if (isMarket(cookieMarket)) return cookieMarket;
  if (country) return marketFromCountry(country);
  return DEFAULT_MARKET_BY_LOCALE[locale] ?? "AU";
}

export function detectMarketFromRequest(req, locale) {
  return detectMarket({
    cookieMarket: req.cookies.get(MARKET_COOKIE)?.value,
    country: req.headers.get("x-vercel-ip-country"),
    locale,
  });
}
