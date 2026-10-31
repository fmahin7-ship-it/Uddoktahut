"use client";

import type {
  CreateReturnPayload,
  OrderStatus,
  UpdateReturnPayload,
} from "@/shared/api/types";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  useOrder,
  useUpdateOrderStatus,
  useCreateOrderReturn,
  useUpdateReturnStatus,
} from "@/features/orders/hooks";
import { OrderStatusCell } from "@/features/orders/columns";
import OrderStatusActions, {
  ReturnStatusActions,
} from "@/features/orders/components/OrderStatusActions";
import ReturnFormModal from "@/features/orders/components/ReturnFormModal";
import { Button } from "@/shared/ui/button";
import { formatPrice } from "@/shared/lib/formatPrice";
import {
  ORDER_STATUSES,
  RETURN_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUSES,
} from "@/features/orders/constants";
import Loader from "@/shared/components/Loader";
import { useUser } from "@/shared/providers/user-provider";
import { currencyFromCountry } from "@/shared/market/config";

export default function OrderDetailPanel({ orderId }: { orderId: number | string }) {
  const { user } = useUser();
  const currency = currencyFromCountry(user?.country);
  const { data: order, isLoading, isError } = useOrder(orderId);
  const updateStatus = useUpdateOrderStatus();
  const createReturn = useCreateOrderReturn();
  const updateReturn = useUpdateReturnStatus();
  const [returnModalOpen, setReturnModalOpen] = useState(false);

  if (isLoading) return <Loader />;
  if (isError || !order) {
    return (
      <div className="p-6">
        <p className="text-destructive">Order not found.</p>
        <Button asChild variant="link" className="px-0 mt-2">
          <Link href="/dashboard/orders">Back to orders</Link>
        </Button>
      </div>
    );
  }

  const canCreateReturn =
    order.status === ORDER_STATUSES.DELIVERED ||
    order.status === ORDER_STATUSES.PARTIALLY_RETURNED;

  const totalRefunded = Number(order.total_refunded ?? 0);
  const netTotal = Number(order.net_total ?? order.total);
  const displayPaymentStatus =
    totalRefunded > 0 && order.payment_status === PAYMENT_STATUSES.UNPAID
      ? netTotal <= 0
        ? PAYMENT_STATUSES.REFUNDED
        : PAYMENT_STATUSES.PARTIALLY_REFUNDED
      : order.payment_status;

  const handleStatusUpdate = async (status: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ orderId: order.id, status });
      toast.success(`Order marked as ${status}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update order");
    }
  };

  const handleCreateReturn = async (payload: CreateReturnPayload) => {
    try {
      await createReturn.mutateAsync({ orderId: order.id, payload });
      toast.success("Return created");
      setReturnModalOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create return");
    }
  };

  const handleReturnStatusUpdate = async ({
    returnId,
    ...payload
  }: UpdateReturnPayload & { returnId: number }) => {
    try {
      await updateReturn.mutateAsync({ returnId, payload });
      toast.success("Return updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update return");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <Button asChild variant="link" className="px-0 h-auto">
            <Link href="/dashboard/orders">← Back to orders</Link>
          </Button>
          <h1 className="text-2xl font-bold mt-1">{order.order_number}</h1>
          <div className="mt-2">
            <OrderStatusCell status={order.status} />
          </div>
        </div>
        <OrderStatusActions
          status={order.status}
          onUpdate={handleStatusUpdate}
          isPending={updateStatus.isPending}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4 space-y-2">
          <h2 className="font-semibold">Customer</h2>
          <p>{order.customer_name}</p>
          <p className="text-sm text-muted-foreground">{order.customer_phone}</p>
          <p className="text-sm">{order.customer_address}</p>
          {order.note && (
            <p className="text-sm text-muted-foreground">Note: {order.note}</p>
          )}
        </div>

        <div className="rounded-xl border p-4 space-y-2">
          <h2 className="font-semibold">Payment</h2>
          <p className="text-sm">Method: {order.payment_method?.toUpperCase()}</p>
          <p className="text-sm">
            Status:{" "}
            {PAYMENT_STATUS_LABELS[displayPaymentStatus] || displayPaymentStatus}
          </p>
          <div className="pt-2 space-y-1 text-sm">
            <p>
              Order total:{" "}
              <span className="font-semibold">
                {formatPrice(order.total, currency)}
              </span>
            </p>
            {totalRefunded > 0 && (
              <p className="text-muted-foreground">
                Refunded:{" "}
                <span className="font-medium text-foreground">
                  {formatPrice(totalRefunded, currency)}
                </span>
              </p>
            )}
            <p className="text-base font-semibold pt-1">
              Net amount (COD): {formatPrice(netTotal, currency)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="font-semibold mb-3">Items</h2>
        <ul className="divide-y">
          {(order.OrderItems || []).map((item) => (
            <li
              key={item.id}
              className="py-2 flex justify-between text-sm gap-4"
            >
              <span>
                {item.product_name} × {item.quantity}
              </span>
              <span className="font-medium">
                {formatPrice(item.line_total, currency)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Returns</h2>
          {canCreateReturn && (
            <Button size="sm" onClick={() => setReturnModalOpen(true)}>
              Create return
            </Button>
          )}
        </div>

        {(order.OrderReturns || []).length === 0 ? (
          <p className="text-sm text-muted-foreground">No returns yet.</p>
        ) : (
          <ul className="space-y-3">
            {(order.OrderReturns ?? []).map((ret) => (
              <li key={ret.id} className="rounded-lg border p-3 text-sm">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-medium">
                      {RETURN_STATUS_LABELS[ret.status] || ret.status}
                    </p>
                    {ret.reason && (
                      <p className="text-muted-foreground mt-1">{ret.reason}</p>
                    )}
                    {ret.refund_amount != null && (
                      <p className="mt-1">
                        Refund: {formatPrice(ret.refund_amount, currency)} (
                        {ret.refund_status})
                      </p>
                    )}
                  </div>
                  <ReturnStatusActions
                    returnRecord={ret}
                    isPending={updateReturn.isPending}
                    onUpdate={(payload) =>
                      handleReturnStatusUpdate({
                        returnId: ret.id,
                        ...payload,
                      })
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ReturnFormModal
        order={order}
        open={returnModalOpen}
        onClose={() => setReturnModalOpen(false)}
        onSubmit={handleCreateReturn}
        isPending={createReturn.isPending}
      />
    </div>
  );
}
