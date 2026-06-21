import { Suspense } from "react";
import Loader from "@/components/common/Loader";
import OrderSuccess from "@/components/shopui/checkout/OrderSuccess";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <OrderSuccess />
    </Suspense>
  );
}
