import { Suspense } from "react";
import Loader from "@/components/common/Loader";
import OrderSuccess from "@/components/shopui/checkout/OrderSuccess";

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
