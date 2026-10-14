import { MARKET_COOKIE, MARKET_COOKIE_MAX_AGE, isMarket } from "./config";

export function readMarketCookie() {
  const match = document.cookie.match(new RegExp(`(?:^|; )${MARKET_COOKIE}=([^;]*)`));
  return isMarket(match?.[1]) ? match[1] : null;
}

export function rememberMarket(market) {
  document.cookie = `${MARKET_COOKIE}=${market}; path=/; max-age=${MARKET_COOKIE_MAX_AGE}; samesite=lax`;
}

/** Cookie set by the landing page, else a time-zone guess for visitors who skipped it. */
export function getBrowserMarket() {
  const fromCookie = readMarketCookie();
  if (fromCookie) return fromCookie;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timeZone === "Asia/Dhaka" ? "BD" : "AU";
}
