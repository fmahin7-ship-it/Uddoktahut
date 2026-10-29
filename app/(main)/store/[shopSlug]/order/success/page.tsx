import { Suspense } from "react";
import Loader from "@/shared/components/Loader";
import OrderSuccess from "@/features/storefront/components/checkout/OrderSuccess";

export const metadata = {
  title: "Order confirmed",
};

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <OrderSuccess />
    </Suspense>
  );
}
