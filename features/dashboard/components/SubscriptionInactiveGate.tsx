"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/shared/providers/user-provider";
import UpgradePrompt from "@/features/dashboard/components/UpgradePrompt";

export default function SubscriptionInactiveGate({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const pathname = usePathname();
  const onBillingPage = pathname.startsWith("/dashboard/billing");

  if (user?.isActive || onBillingPage) {
    return children;
  }

  return (
    <UpgradePrompt
      icon="billing"
      title="Subscription inactive"
      description="Your trial or paid plan has ended. Renew or upgrade to manage products, use AI analytics, and keep your store online."
      ctaHref="/dashboard/billing"
      ctaLabel="Renew subscription"
    />
  );
}
