import type { CurrencyCode, MarketCode, PlanSlug } from "@/shared/api/types";

/**
 * Plan prices per market, in the currency's minor unit (cents / poisha).
 * Mirrors the backend plan_prices table — change both together.
 * (Built into the static landing pages, so it is not fetched at runtime.)
 */
export const PLAN_PRICES: Record<
  MarketCode,
  { currency: CurrencyCode; amounts: Record<PlanSlug, number> }
> = {
  BD: {
    currency: "BDT",
    amounts: { trial: 0, basic: 50000, pro: 150000, business: 400000 },
  },
  AU: {
    currency: "AUD",
    amounts: { trial: 0, basic: 1500, pro: 3900, business: 9900 },
  },
};

export function getPlanPrice(market: MarketCode, planId: PlanSlug) {
  const { currency, amounts } = PLAN_PRICES[market];
  return { currency, amount: amounts[planId] };
}
