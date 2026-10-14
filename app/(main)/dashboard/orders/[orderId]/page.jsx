import OrderDetailPanel from "@/components/dashboard/orders/OrderDetailPanel";

export default async function OrderDetailPage({ params }) {
  const { orderId } = await params;
  return <OrderDetailPanel orderId={orderId} />;
}
