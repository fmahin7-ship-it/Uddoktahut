import ProductDetails from "@/components/shopui/product/ProductDetails";

export default async function ProductPage({ params }) {
  const { productId } = await params;
  return <ProductDetails productId={productId} />;
}
