import ProductDetails from "@/features/storefront/components/product/ProductDetails";

export const metadata = {
  title: "Product",
};

export default async function ProductPage({ params }: PageProps<"/store/[shopSlug]/[productId]">) {
  const { productId } = await params;
  return <ProductDetails productId={productId} />;
}
