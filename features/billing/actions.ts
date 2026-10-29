"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getAuthenticUser } from "@/features/auth/session";
import { apiRequest } from "@/shared/api/server";
import type {
  CheckoutSessionResponse,
  PlanSlug,
  SubscriptionStatusResponse,
} from "@/shared/api/types";

const readUserId = async (): Promise<number | null> => {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify<{ id?: number }>(token, secret);
    return payload.id ?? null;
  } catch {
    return null;
  }
};

export async function startCheckout(
  plan: PlanSlug
): Promise<{ url?: string; error?: string }> {
  const result = await apiRequest<CheckoutSessionResponse>("/subscription/checkout", {
    method: "POST",
    auth: true,
    body: { plan },
    cache: "no-store",
    fallbackError: "Could not start checkout.",
  });
  if (!result.ok) return { error: result.error };
  return { url: result.data?.url };
}

/** Reloads the signed-in seller's plan. Does not change it. */
export async function reloadSubscription(): Promise<
  SubscriptionStatusResponse & { error?: string }
> {
  const userId = await readUserId();
  if (!userId) return { error: "Please log in again." };
  return getAuthenticUser({ id: userId });
}
