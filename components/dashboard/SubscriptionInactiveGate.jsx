"use client";

import { usePathname } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import UpgradePrompt from "@/components/dashboard/UpgradePrompt";

export default function SubscriptionInactiveGate({ children }) {
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
