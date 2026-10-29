import { cache } from "react";
import { redirect } from "next/navigation";
import { apiRequest } from "@/shared/api/server";
import type { SubscriptionStatusResponse } from "@/shared/api/types";

/**
 * Server-only: the signed-in seller's user + subscription status.
 * Used by dashboard layouts/pages and the billing action.
 */
export const getAuthenticUser = async ({
  id,
}: {
  id: string | number | null;
}): Promise<SubscriptionStatusResponse> => {
  const result = await apiRequest<SubscriptionStatusResponse>("/subscription/status", {
    method: "POST",
    body: { userId: Number(id) },
    cache: "no-store",
  });
  if (result.ok) return result.data;
  // Backend unreachable: send the seller to log in again, as before.
  if (result.status === 503) redirect("/login");
  return { success: false, message: result.error };
};

/** One subscription status fetch per request (layout + dashboard pages). */
export const getCachedAuthenticUser = cache(async ({ id }: { id: string | number | null }) =>
  getAuthenticUser({ id })
);
