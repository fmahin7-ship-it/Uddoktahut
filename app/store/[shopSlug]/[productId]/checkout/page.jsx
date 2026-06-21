import LegacyCheckoutRedirect from "@/components/shopui/checkout/LegacyCheckoutRedirect";

export default async function CheckoutPage({ params }) {
  const { productId } = await params;
  return <LegacyCheckoutRedirect productId={productId} />;
}
