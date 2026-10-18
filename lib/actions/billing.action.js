"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getAuthenticUser } from "@/lib/actions/auth.action";

const readUserId = async () => {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload.id ?? null;
  } catch {
    return null;
  }
};

export async function startCheckout(plan) {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return { error: "Please log in again." };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/subscription/checkout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ plan }),
    }
  );
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    return { error: data.message || "Could not start checkout." };
  }
  return { url: data.url };
}

/** Reloads the signed-in seller's plan. Does not change it. */
export async function reloadSubscription() {
  const userId = await readUserId();
  if (!userId) return { error: "Please log in again." };
  return getAuthenticUser({ id: userId });
}
