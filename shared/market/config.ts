import type { CurrencyCode, MarketCode } from "@/shared/api/types";

/** Sales markets — must match the backend's plan_prices.market and stores.country. */
export const MARKETS = ["BD", "AU"] as const satisfies readonly MarketCode[];

export function isMarket(value: unknown): value is MarketCode {
  return typeof value === "string" && (MARKETS as readonly string[]).includes(value);
}

/** Any country without its own market sees the AU (international) prices. */
export function marketFromCountry(country: string | null | undefined): MarketCode {
  const code = country?.toUpperCase();
  return isMarket(code) ? code : "AU";
}

/** Storefront / dashboard money display from the store's country. */
export function currencyFromCountry(
  country: string | null | undefined
): CurrencyCode {
  return marketFromCountry(country) === "BD" ? "BDT" : "AUD";
}

export function currencySymbol(currency: CurrencyCode): string {
  return currency === "AUD" ? "A$" : "৳";
}
