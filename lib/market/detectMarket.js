import { isMarket, marketFromCountry } from "./config";

/**
 * Which prices a visitor sees. Never chosen by the visitor and never by language:
 * a signed-in seller's store country wins (so travelling changes nothing),
 * then the IP country, then AU when location is unknown.
 */
export function detectMarket({ storeCountry, country }) {
  if (isMarket(storeCountry)) return storeCountry;
  return marketFromCountry(country);
}

/**
 * Visitor's IP country from Vercel. Outside production there is no such header,
 * so DEV_IP_COUNTRY in .env.local stands in for it.
 */
export function requestCountry(headers) {
  const devCountry =
    process.env.NODE_ENV !== "production" ? process.env.DEV_IP_COUNTRY : null;
  return headers.get("x-vercel-ip-country") ?? devCountry ?? null;
}

export function detectMarketFromRequest(req, { storeCountry }) {
  return detectMarket({ storeCountry, country: requestCountry(req.headers) });
}
