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

/** Ask the backend to confirm a paid Checkout session with Stripe. */
export async function confirmCheckout(
  sessionId: string
): Promise<{ ok?: boolean; alreadyActive?: boolean; error?: string }> {
  const result = await apiRequest<{ ok: boolean; alreadyActive: boolean }>(
    "/subscription/checkout/confirm",
    {
      method: "POST",
      auth: true,
      body: { sessionId },
      cache: "no-store",
      fallbackError: "Could not confirm payment.",
    }
  );
  if (!result.ok) return { error: result.error };
  return result.data ?? { ok: true };
}

/** Open Stripe Customer Portal (cancel, card, invoices). */
export async function openBillingPortal(): Promise<{
  url?: string;
  error?: string;
}> {
  const result = await apiRequest<{ url: string }>("/subscription/billing-portal", {
    method: "POST",
    auth: true,
    cache: "no-store",
    fallbackError: "Could not open billing portal.",
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
