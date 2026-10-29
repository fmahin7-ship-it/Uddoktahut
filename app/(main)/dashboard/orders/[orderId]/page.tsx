import OrderDetailPanel from "@/features/orders/components/OrderDetailPanel";

export default async function OrderDetailPage({ params }: PageProps<"/dashboard/orders/[orderId]">) {
  const { orderId } = await params;
  return <OrderDetailPanel orderId={orderId} />;
}
