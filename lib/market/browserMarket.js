import { MARKET_COOKIE, MARKET_COOKIE_MAX_AGE } from "./config";

export function rememberMarket(market) {
  document.cookie = `${MARKET_COOKIE}=${market}; path=/; max-age=${MARKET_COOKIE_MAX_AGE}; samesite=lax`;
}
