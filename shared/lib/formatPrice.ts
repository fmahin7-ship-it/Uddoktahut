import type { CurrencyCode } from "@/shared/api/types";
import { currencySymbol } from "@/shared/market/config";

const NUMBER_LOCALES: Record<CurrencyCode, string> = {
  BDT: "en-BD",
  AUD: "en-AU",
};

/**
 * Product/order money (decimal, from the backend as string or number) for display.
 * Pass BDT or AUD from the store's country — do not default to taka for AU stores.
 */
const formatPrice = (
  amount: number | string | null | undefined,
  currency: CurrencyCode = "BDT"
): string => {
  const value = Number(amount);
  const symbol = currencySymbol(currency);
  if (Number.isNaN(value)) return `${symbol}0`;
  return `${symbol}${value.toLocaleString(NUMBER_LOCALES[currency] ?? "en-AU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

export { formatPrice };
