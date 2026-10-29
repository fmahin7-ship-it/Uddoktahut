"use client";

import {
  ORDER_STATUSES,
  RETURN_STATUSES,
  REFUND_STATUSES,
} from "@/features/orders/constants";
import { Button } from "@/shared/ui/button";
import type { OrderReturn, OrderStatus, UpdateReturnPayload } from "@/shared/api/types";

interface StatusAction {
  status: OrderStatus;
  label: string;
  variant?: "default" | "destructive";
}

export default function OrderStatusActions({ status, onUpdate, isPending }: {
  status: OrderStatus;
  onUpdate: (status: OrderStatus) => void;
  isPending?: boolean;
}) {
  const actions: StatusAction[] = [];

  if (status === ORDER_STATUSES.PENDING) {
    actions.push(
      { status: ORDER_STATUSES.CONFIRMED, label: "Confirm" },
      { status: ORDER_STATUSES.CANCELLED, label: "Cancel", variant: "destructive" }
    );
  } else if (status === ORDER_STATUSES.CONFIRMED) {
    actions.push(
      { status: ORDER_STATUSES.SHIPPED, label: "Mark shipped" },
      { status: ORDER_STATUSES.CANCELLED, label: "Cancel", variant: "destructive" }
    );
  } else if (status === ORDER_STATUSES.SHIPPED) {
    actions.push({ status: ORDER_STATUSES.DELIVERED, label: "Mark delivered" });
  }

  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <Button
          key={action.status}
          size="sm"
          variant={action.variant || "default"}
          disabled={isPending}
          onClick={() => onUpdate(action.status)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}

export function ReturnStatusActions({ returnRecord, onUpdate, isPending }: {
  returnRecord: OrderReturn | null | undefined;
  onUpdate: (payload: UpdateReturnPayload) => void;
  isPending?: boolean;
}) {
  if (!returnRecord) return null;

  if (returnRecord.status === RETURN_STATUSES.REQUESTED) {
    return (
      <div className="flex gap-2">
        <Button
          size="sm"
          disabled={isPending}
          onClick={() => onUpdate({ status: RETURN_STATUSES.APPROVED })}
        >
          Approve
        </Button>
        <Button
          size="sm"
          variant="destructive"
          disabled={isPending}
          onClick={() => onUpdate({ status: RETURN_STATUSES.REJECTED })}
        >
          Reject
        </Button>
      </div>
    );
  }

  if (returnRecord.status === RETURN_STATUSES.APPROVED) {
    return (
      <Button
        size="sm"
        disabled={isPending}
        onClick={() =>
          onUpdate({
            status: RETURN_STATUSES.COMPLETED,
            refundStatus: REFUND_STATUSES.REFUNDED,
          })
        }
      >
        Complete return & mark refunded
      </Button>
    );
  }

  return null;
}
