import Checkout from "@/app/components/shopui/Checkout";
import Loader from "@/app/components/ui/Loader";
import { Suspense } from "react";

async function CheckoutPage({ params }) {
  const { productId } = await params;
  return (
    <Suspense fallback={<Loader />}>
      <Checkout productId={productId} />
    </Suspense>
  );
}

export default CheckoutPage;
