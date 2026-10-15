/** Sales markets — must match the backend's plan_prices.market and stores.country. */
export const MARKETS = ["BD", "AU"];

export function isMarket(value) {
  return MARKETS.includes(value);
}

/** Any country without its own market sees the AU (international) prices. */
export function marketFromCountry(country) {
  const code = country?.toUpperCase();
  return isMarket(code) ? code : "AU";
}
