"use server";

import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE } from "@/i18n/config";
import { detectMarket } from "@/lib/market/detectMarket";

export async function getUserId() {
  const header = await headers();
  return header.get("x-user-id");
}

/**
 * Store country for a new seller: where they are signing up from (IP country),
 * never a client-supplied value. Locally there is no IP header, so the
 * language cookie decides (bn → BD, otherwise AU).
 */
export async function getSignupCountry() {
  const [header, cookieStore] = await Promise.all([headers(), cookies()]);
  return detectMarket({
    country: header.get("x-vercel-ip-country"),
    locale: cookieStore.get(LOCALE_COOKIE)?.value,
  });
}
