import { Suspense } from "react";
import ProductDetails from "@/app/components/ProductDetails";
import Loader from "@/app/components/Loader";

async function ProductPage({ params }) {
  const { productId } = await params;
  return (
    <Suspense fallback={<Loader />}>
      <ProductDetails productId={productId} />
    </Suspense>
  );
}

export default ProductPage;
