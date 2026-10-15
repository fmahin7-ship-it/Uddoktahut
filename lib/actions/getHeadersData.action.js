"use server";

import { headers } from "next/headers";
import { detectMarket, requestCountry } from "@/lib/market/detectMarket";

export async function getUserId() {
  const header = await headers();
  return header.get("x-user-id");
}

/**
 * Store country for a new seller: where they are signing up from (IP country),
 * never a client-supplied value.
 */
export async function getSignupCountry() {
  const header = await headers();
  return detectMarket({ country: requestCountry(header) });
}
