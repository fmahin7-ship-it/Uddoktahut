"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useOrders } from "@/hooks/use-orders";
import { createOrderColumns } from "@/lib/table-columns/order-columns";
import TableSkeleton from "@/components/common/TableSkeleton";
import { Button } from "@/components/ui/button";
import { ORDER_STATUSES } from "@/constants/order";

const DataTable = dynamic(
  () =>
    import("@/components/ui/data-table").then((mod) => ({
      default: mod.DataTable,
    })),
  { ssr: false }
);

const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: ORDER_STATUSES.PENDING, label: "Pending" },
  { value: ORDER_STATUSES.CONFIRMED, label: "Confirmed" },
  { value: ORDER_STATUSES.SHIPPED, label: "Shipped" },
  { value: ORDER_STATUSES.DELIVERED, label: "Delivered" },
  { value: ORDER_STATUSES.CANCELLED, label: "Cancelled" },
];

const skeletonColumns = [
  { header: "Order #", skeletonClassName: "h-4 w-24" },
  { header: "Customer", skeletonClassName: "h-4 w-full" },
  { header: "Phone", skeletonClassName: "h-4 w-full" },
  { header: "Total", skeletonClassName: "h-4 w-full" },
  { header: "Status", skeletonClassName: "h-4 w-full" },
  { header: "Date", skeletonClassName: "h-4 w-full" },
  { header: "Actions", skeletonClassName: "h-4 w-full" },
];

export default function OrderList() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const { data, isLoading, isError } = useOrders({
    page: pageIndex + 1,
    pageSize,
    status,
  });

  const columns = createOrderColumns({
    onView: (order) => router.push(`/dashboard/orders/${order.id}`),
  });

  const orders = data?.data || [];
  const total = data?.total || 0;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((filter) => (
          <Button
            key={filter.value || "all"}
            size="sm"
            variant={status === filter.value ? "default" : "outline"}
            onClick={() => {
              setStatus(filter.value);
              setPageIndex(0);
            }}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <TableSkeleton columns={skeletonColumns} />
      ) : isError ? (
        <p className="text-destructive">Failed to load orders.</p>
      ) : (
        <DataTable
          columns={columns}
          data={orders}
          pageIndex={pageIndex}
          pageCount={pageCount}
          onPageChange={setPageIndex}
        />
      )}
    </div>
  );
}
