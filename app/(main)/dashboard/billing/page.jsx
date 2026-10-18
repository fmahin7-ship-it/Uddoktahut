import { Suspense } from "react";
import BillingPanel from "@/components/dashboard/billing/BillingPanel";

export default function BillingPage() {
  return (
    <Suspense>
      <BillingPanel />
    </Suspense>
  );
}
