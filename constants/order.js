export const ORDER_STATUSES = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  PARTIALLY_RETURNED: "partially_returned",
  RETURNED: "returned",
};

export const RETURN_STATUSES = {
  REQUESTED: "requested",
  APPROVED: "approved",
  REJECTED: "rejected",
  COMPLETED: "completed",
};

export const REFUND_STATUSES = {
  NONE: "none",
  PENDING: "pending",
  REFUNDED: "refunded",
};

export const PAYMENT_STATUSES = {
  UNPAID: "unpaid",
  PAID: "paid",
  PARTIALLY_REFUNDED: "partially_refunded",
  REFUNDED: "refunded",
};

export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUSES.UNPAID]: "Unpaid (COD)",
  [PAYMENT_STATUSES.PAID]: "Paid",
  [PAYMENT_STATUSES.PARTIALLY_REFUNDED]: "Partially refunded",
  [PAYMENT_STATUSES.REFUNDED]: "Fully refunded",
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUSES.PENDING]: "Pending",
  [ORDER_STATUSES.CONFIRMED]: "Confirmed",
  [ORDER_STATUSES.SHIPPED]: "Shipped",
  [ORDER_STATUSES.DELIVERED]: "Delivered",
  [ORDER_STATUSES.CANCELLED]: "Cancelled",
  [ORDER_STATUSES.PARTIALLY_RETURNED]: "Partially returned",
  [ORDER_STATUSES.RETURNED]: "Returned",
};

export const ORDER_STATUS_BADGE_CLASS = {
  [ORDER_STATUSES.PENDING]:
    "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  [ORDER_STATUSES.CONFIRMED]:
    "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
  [ORDER_STATUSES.SHIPPED]:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300",
  [ORDER_STATUSES.DELIVERED]:
    "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300",
  [ORDER_STATUSES.CANCELLED]:
    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  [ORDER_STATUSES.PARTIALLY_RETURNED]:
    "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300",
  [ORDER_STATUSES.RETURNED]:
    "bg-violet-100 text-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
};

/** Valid merchant status transitions from current status */
export const MERCHANT_STATUS_ACTIONS = {
  [ORDER_STATUSES.PENDING]: [
    { status: ORDER_STATUSES.CONFIRMED, label: "Confirm" },
    { status: ORDER_STATUSES.CANCELLED, label: "Cancel", variant: "destructive" },
  ],
  [ORDER_STATUSES.CONFIRMED]: [
    { status: ORDER_STATUSES.SHIPPED, label: "Mark shipped" },
    { status: ORDER_STATUSES.CANCELLED, label: "Cancel", variant: "destructive" },
  ],
  [ORDER_STATUSES.SHIPPED]: [
    { status: ORDER_STATUSES.DELIVERED, label: "Mark delivered" },
  ],
};

export const RETURN_STATUS_LABELS = {
  [RETURN_STATUSES.REQUESTED]: "Requested",
  [RETURN_STATUSES.APPROVED]: "Approved",
  [RETURN_STATUSES.REJECTED]: "Rejected",
  [RETURN_STATUSES.COMPLETED]: "Completed",
};

export const CART_STORAGE_PREFIX = "uddoktahut_cart";
export const MAX_CART_LINES = 20;
export const MAX_LINE_QUANTITY = 99;
