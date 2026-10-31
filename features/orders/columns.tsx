import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_BADGE_CLASS,
} from "@/features/orders/constants";
import {
  createTextColumn,
  createActionsColumn,
} from "@/shared/components/table/base-columns";
import { formatPrice } from "@/shared/lib/formatPrice";
import type { ColumnDef } from "@tanstack/react-table";
import type { Order } from "@/shared/api/types";

const OrderStatusCell = ({ status }: { status: string }) => {
  const label = ORDER_STATUS_LABELS[status] || status;
  const className =
    ORDER_STATUS_BADGE_CLASS[status] ||
    "bg-gray-100 text-gray-700 dark:bg-gray-800";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
};

export const createOrderColumns = ({
  onView,
  currency = "BDT",
}: {
  onView: (order: Order) => void;
  currency?: "BDT" | "AUD";
}): ColumnDef<Order>[] => [
  createTextColumn<Order>({
    accessorKey: "order_number",
    header: "Order #",
    className: "font-mono text-sm",
  }),
  createTextColumn<Order>({
    accessorKey: "customer_name",
    header: "Customer",
  }),
  createTextColumn<Order>({
    accessorKey: "customer_phone",
    header: "Phone",
  }),
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => formatPrice(row.original.total, currency),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <OrderStatusCell status={row.original.status} />,
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) =>
      row.original.created_at
        ? new Date(row.original.created_at).toLocaleString()
        : "—",
  },
  createActionsColumn<Order>({
    actions: [{ label: "Manage", onClick: onView }],
  }),
];

export { OrderStatusCell };
