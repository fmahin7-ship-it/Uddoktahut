import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Only reached by routes that don't call setRequestLocale. Reading cookies makes those routes dynamic.
  if (!isLocale(locale)) {
    const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
    locale = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
