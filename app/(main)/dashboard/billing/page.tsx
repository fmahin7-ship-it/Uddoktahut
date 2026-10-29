import { Suspense } from "react";
import BillingPanel from "@/features/billing/components/BillingPanel";

export default function BillingPage() {
  return (
    <Suspense>
      <BillingPanel />
    </Suspense>
  );
}
