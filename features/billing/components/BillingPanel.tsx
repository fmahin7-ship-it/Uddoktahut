"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/shared/providers/user-provider";
import { Button } from "@/shared/ui/button";
import {
  startCheckout,
  confirmCheckout,
  openBillingPortal,
  reloadSubscription,
} from "@/features/billing/actions";
import { marketFromCountry } from "@/shared/market/config";
import { formatPrice } from "@/shared/pricing/formatPrice";
import { getPlanPrice } from "@/shared/pricing/constants";

const formatDate = (value: string | null | undefined): string | null => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export default function BillingPanel() {
  const { user, setUser } = useUser();
  const searchParams = useSearchParams();
  const checkout = searchParams.get("checkout");
  const sessionId = searchParams.get("session_id");
  const [pending, setPending] = useState(false);
  const [portalPending, setPortalPending] = useState(false);
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(checkout === "success");

  const market = marketFromCountry(user?.country);
  const proPrice = getPlanPrice(market, "pro");
  const onPro =
    user?.planSlug === "pro" &&
    Boolean(user?.isActive) &&
    (user?.subscriptionStatus === "active" ||
      user?.subscriptionStatus === "past_due");
  const canUpgrade = market === "AU" && !onPro;
  // Keep portal available after expiry so the seller can update the card.
  const canManageBilling = user?.billingProvider === "stripe";
  const paidUntil = formatDate(user?.endDate);

  useEffect(() => {
    if (checkout !== "success") return;
    let stopped = false;

    const finish = async () => {
      if (sessionId?.startsWith("cs_")) {
        const confirmed = await confirmCheckout(sessionId);
        if (stopped) return;
        if (confirmed.error) {
          setError(confirmed.error);
        }
      }

      const data = await reloadSubscription();
      if (stopped) return;
      if (data?.user) setUser(data.user);
      setWaiting(false);
    };

    finish();
    return () => {
      stopped = true;
    };
  }, [checkout, sessionId, setUser]);

  const onUpgrade = async () => {
    setError("");
    setPending(true);
    const result = await startCheckout("pro");
    if (result.url) {
      window.location.href = result.url;
      return;
    }
    setError(result.error || "Could not start checkout.");
    setPending(false);
  };

  const onManageBilling = async () => {
    setError("");
    setPortalPending(true);
    const result = await openBillingPortal();
    if (result.url) {
      window.location.href = result.url;
      return;
    }
    setError(result.error || "Could not open billing portal.");
    setPortalPending(false);
  };

  let statusLine = "This plan has ended.";
  if (user?.subscriptionStatus === "trialing" && user?.isActive) {
    statusLine = paidUntil
      ? `Free trial until ${paidUntil}.`
      : "Free trial is active.";
  } else if (user?.subscriptionStatus === "past_due" && user?.isActive) {
    statusLine = paidUntil
      ? `Payment failed. Your plan stays active until ${paidUntil}. Update your card in Manage billing.`
      : "Payment failed. Update your card in Manage billing.";
  } else if (
    user?.subscriptionStatus === "active" &&
    user?.isActive &&
    user?.cancelAtPeriodEnd
  ) {
    statusLine = paidUntil
      ? `${user.planName} until ${paidUntil}. It will not renew.`
      : `${user.planName} will not renew.`;
  } else if (user?.subscriptionStatus === "active" && user?.isActive) {
    statusLine = paidUntil
      ? `${user.planName} renews on ${paidUntil}.`
      : `${user.planName} is active.`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-[var(--color-dark-300)] dark:to-[var(--color-dark-500)]">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="rounded-2xl border border-white/20 bg-white/80 p-8 shadow-lg dark:border-[var(--color-dark-500)] dark:bg-[var(--color-dark-400)]/80">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Billing
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{user?.planName}</p>
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-200">
            {statusLine}
          </p>

          {checkout === "cancel" && (
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-200">
              Payment cancelled. You have not been charged.
            </p>
          )}
          {waiting && (
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-200">
              Payment received. Updating your plan…
            </p>
          )}
          {checkout === "success" && !waiting && onPro && (
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-200">
              You are on Pro. Thank you.
            </p>
          )}
          {checkout === "success" && !waiting && !onPro && (
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-200">
              Payment is still processing. Refresh this page in a moment.
            </p>
          )}

          {market !== "AU" && (
            <p className="mt-6 text-sm text-muted-foreground">
              Card checkout is not available for Bangladesh stores yet.
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {canUpgrade && (
              <Button onClick={onUpgrade} disabled={pending}>
                {pending
                  ? "Opening checkout…"
                  : `Upgrade to Pro · ${formatPrice(proPrice.amount, proPrice.currency, "en")} / month`}
              </Button>
            )}
            {canManageBilling && (
              <Button
                variant="outline"
                onClick={onManageBilling}
                disabled={portalPending}
              >
                {portalPending ? "Opening…" : "Manage billing"}
              </Button>
            )}
          </div>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
