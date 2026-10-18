"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";
import { startCheckout, reloadSubscription } from "@/lib/actions/billing.action";
import { marketFromCountry } from "@/lib/market/config";
import { formatPrice } from "@/lib/pricing/formatPrice";
import { getPlanPrice } from "@/constants/pricing";

const formatDate = (value) => {
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
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(checkout === "success");

  const market = marketFromCountry(user?.country);
  const proPrice = getPlanPrice(market, "pro");
  const onPro = user?.planSlug === "pro" && user?.isActive;
  const canUpgrade = market === "AU" && !onPro;
  const paidUntil = formatDate(user?.endDate);

  useEffect(() => {
    if (checkout !== "success") return;
    let stopped = false;
    let timer;
    let attempts = 0;

    const tick = async () => {
      const data = await reloadSubscription();
      if (stopped) return;
      if (data?.user) setUser(data.user);
      attempts += 1;
      const upgraded = data?.user?.planSlug === "pro" && data?.user?.isActive;
      if (upgraded || attempts >= 5) {
        setWaiting(false);
        return;
      }
      timer = setTimeout(tick, 2000);
    };

    tick();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [checkout, setUser]);

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

  let statusLine = "This plan has ended.";
  if (user?.subscriptionStatus === "trialing" && user?.isActive) {
    statusLine = paidUntil ? `Free trial until ${paidUntil}.` : "Free trial is active.";
  } else if (user?.subscriptionStatus === "active" && user?.isActive && user?.cancelAtPeriodEnd) {
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
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Billing</h1>
          <p className="mt-2 text-sm text-muted-foreground">{user?.planName}</p>
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-200">{statusLine}</p>

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

          {canUpgrade && (
            <div className="mt-6">
              <Button onClick={onUpgrade} disabled={pending}>
                {pending
                  ? "Opening checkout…"
                  : `Upgrade to Pro · ${formatPrice(proPrice.amount, proPrice.currency, "en")} / month`}
              </Button>
              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
