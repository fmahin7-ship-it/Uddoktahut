/** Sales markets — must match the backend's plan_prices.market and stores.country. */
export const MARKETS = ["BD", "AU"];
export const MARKET_COOKIE = "market";
export const MARKET_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Used only when neither a cookie nor the visitor's country decides the market. */
export const DEFAULT_MARKET_BY_LOCALE = { bn: "BD", en: "AU" };

export function isMarket(value) {
  return MARKETS.includes(value);
}

/** Any country without its own market sees the AU (international) prices. */
export function marketFromCountry(country) {
  const code = country?.toUpperCase();
  return isMarket(code) ? code : "AU";
}
