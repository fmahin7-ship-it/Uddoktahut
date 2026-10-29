"use client";

import { useLocale } from "next-intl";
import type { MarketCode, PlanSlug } from "@/shared/api/types";
import { PLAN_PRICES } from "@/shared/pricing/constants";
import { formatPrice } from "@/shared/pricing/formatPrice";

/** Formatted plan prices for a market, e.g. { trial: "A$0", basic: "A$15", ... }. */
export function usePlanPrices(market: MarketCode) {
  const locale = useLocale();
  const { currency, amounts } = PLAN_PRICES[market];

  const prices = Object.fromEntries(
    Object.entries(amounts).map(([planId, amount]) => [
      planId,
      formatPrice(amount, currency, locale),
    ])
  ) as Record<PlanSlug, string>;

  return { currency, prices };
}
