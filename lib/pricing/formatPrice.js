const CURRENCY_SYMBOLS = { AUD: "A$", BDT: "৳" };
const NUMBER_LOCALES = { bn: "bn-BD", en: "en-AU" };

/**
 * "A$39", "৳১,৫০০", "A$৩৯" — symbol first, digits in the page language.
 * Intl's own currency style puts the symbol after the number in Bangla ("১,৫০০৳").
 */
export function formatPrice(minorAmount, currency, locale) {
  const major = minorAmount / 100;
  const number = new Intl.NumberFormat(NUMBER_LOCALES[locale] ?? "en-AU", {
    maximumFractionDigits: Number.isInteger(major) ? 0 : 2,
    minimumFractionDigits: Number.isInteger(major) ? 0 : 2,
  }).format(major);
  return `${CURRENCY_SYMBOLS[currency] ?? `${currency} `}${number}`;
}
