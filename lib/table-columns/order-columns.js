import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_BADGE_CLASS,
} from "@/constants/order";
import {
  createTextColumn,
  createCurrencyColumn,
  createActionsColumn,
} from "./base-columns";
import { formatPrice } from "@/lib/utils/formatPrice";

const OrderStatusCell = ({ status }) => {
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

export const createOrderColumns = ({ onView }) => [
  createTextColumn({
    accessorKey: "order_number",
    header: "Order #",
    className: "font-mono text-sm",
  }),
  createTextColumn({
    accessorKey: "customer_name",
    header: "Customer",
  }),
  createTextColumn({
    accessorKey: "customer_phone",
    header: "Phone",
  }),
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => formatPrice(row.original.total),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <OrderStatusCell status={row.original.status} />,
  },
  createTextColumn({
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) =>
      row.original.created_at
        ? new Date(row.original.created_at).toLocaleString()
        : "—",
  }),
  createActionsColumn({
    actions: [{ label: "Manage", onClick: onView }],
  }),
];

export { OrderStatusCell };
