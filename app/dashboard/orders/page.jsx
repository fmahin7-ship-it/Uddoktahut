import dynamic from "next/dynamic";

const OrderList = dynamic(
  () => import("@/components/dashboard/orders/OrderList"),
  {
    loading: () => (
      <div className="animate-pulse h-64 bg-muted rounded-lg m-6" />
    ),
  }
);

export default function OrdersPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0 bg-gradient-to-br from-gray-50 to-green-50 dark:from-[var(--color-dark-300)] dark:to-[var(--color-dark-500)] min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Order Management
      </h1>
      <p className="text-muted-foreground text-sm -mt-4">
        Confirm, ship, deliver orders and process returns.
      </p>
      <OrderList />
    </div>
  );
}
