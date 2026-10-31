"use client";

import { useShop } from "@/shared/providers/shop-provider";
import { currencyFromCountry } from "@/shared/market/config";
import type { CurrencyCode } from "@/shared/api/types";

/** Display currency for the public storefront from the store's country. */
export function useStoreCurrency(): CurrencyCode {
  const { shop } = useShop();
  return currencyFromCountry(shop?.country);
}
