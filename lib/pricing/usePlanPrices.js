"use client";

import { useLocale } from "next-intl";
import { PLAN_PRICES } from "@/constants/pricing";
import { formatPrice } from "./formatPrice";

/** Formatted plan prices for a market, e.g. { trial: "A$0", basic: "A$15", ... }. */
export function usePlanPrices(market) {
  const locale = useLocale();
  const { currency, amounts } = PLAN_PRICES[market];

  const prices = Object.fromEntries(
    Object.entries(amounts).map(([planId, amount]) => [planId, formatPrice(amount, currency, locale)])
  );

  return { currency, prices };
}
