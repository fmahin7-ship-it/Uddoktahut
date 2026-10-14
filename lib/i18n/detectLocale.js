import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from "@/i18n/config";

/** Primary subtag (lowercased) of the highest-q entry in an Accept-Language header. */
export function topAcceptLanguage(header) {
  if (!header) return null;

  let best = null;
  let bestQ = -1;
  for (const part of header.split(",")) {
    const [tag, ...params] = part.trim().split(";");
    if (!tag || tag === "*") continue;
    const qParam = params.find((p) => p.trim().startsWith("q="));
    const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
    if (Number.isNaN(q) || q <= bestQ) continue;
    best = tag.split("-")[0].toLowerCase();
    bestQ = q;
  }
  return best;
}

/**
 * Explicit choice (cookie) wins, then browser language, then country.
 * Only decides where "/" redirects — /bn and /en always render as requested.
 */
export function detectLocale({ cookieLocale, acceptLanguage, country }) {
  if (isLocale(cookieLocale)) return cookieLocale;
  if (topAcceptLanguage(acceptLanguage) === "bn") return "bn";
  if (country?.toUpperCase() === "BD") return "bn";
  return DEFAULT_LOCALE;
}

export function detectLocaleFromRequest(req) {
  return detectLocale({
    cookieLocale: req.cookies.get(LOCALE_COOKIE)?.value,
    acceptLanguage: req.headers.get("accept-language"),
    country: req.headers.get("x-vercel-ip-country"),
  });
}
