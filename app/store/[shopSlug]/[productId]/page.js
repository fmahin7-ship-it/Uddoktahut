import ProductDetails from "@/app/components/shopui/ProductDetails";
import Loader from "@/app/components/ui/Loader";
import { Suspense } from "react";
async function ProductPage({ params }) {
  const { productId } = await params;
  return (
    <Suspense fallback={<Loader />}>
      <ProductDetails productId={productId} />
    </Suspense>
  );
}

export default ProductPage;
