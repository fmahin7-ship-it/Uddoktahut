/**
 * Shapes of the UddoktaHut backend's JSON responses, as the frontend uses them.
 * Source of truth: UddoktaHut-Backend (plans.service, subscriptions.service,
 * orders.service, db/schema). Keep in sync when the backend changes.
 *
 * Money: plan prices are integer minor units (poisha / cents).
 * Product and order money is still decimal on the backend; product prices
 * arrive as strings, order totals as numbers.
 */

// ---------------------------------------------------------------- markets ---

export type MarketCode = "BD" | "AU";
export type CurrencyCode = "BDT" | "AUD";
export type PlanSlug = "trial" | "basic" | "pro" | "business";

// ------------------------------------------------------------------ plans ---

/** GET /plans?market= */
export interface PublicPlan {
  slug: PlanSlug;
  name: string;
  billingCycle: string;
  /** Minor units (poisha / cents). */
  amount: number;
  maxProducts: number;
  includesAi: boolean;
  aiTokenLimitMonthly: number;
}

export interface PlansResponse {
  market: MarketCode;
  currency: CurrencyCode;
  plans: PublicPlan[];
}

// ------------------------------------------------- user and subscription ---

export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "expired"
  | (string & {});

/** POST /subscription/status → { user }. Store fields are absent before onboarding. */
export interface SessionUser {
  name: string;
  email: string | null;
  phoneNumber: string | null;
  onboarded?: boolean;
  role?: number;

  template_name?: string;
  storeName?: string;
  storeUrl?: string;
  country?: MarketCode;
  isActive?: boolean;
  planSlug?: PlanSlug;
  planName?: string;
  includesAi?: boolean;
  maxProducts?: number;
  productCount?: number;
  productsRemaining?: number;
  aiTokenLimitMonthly?: number;
  aiTokensUsed?: number;
  aiTokensRemaining?: number;
  subscriptionStatus?: SubscriptionStatus;
  endDate?: string | null;
  cancelAtPeriodEnd?: boolean;
}

export interface SubscriptionStatusResponse {
  user?: SessionUser;
  success?: boolean;
  message?: string;
}

// ---------------------------------------------------------------- products ---

export type ProductStatus = "active" | "inactive" | (string & {});

export interface Product {
  id: number;
  name: string;
  image: string | null;
  /** Decimal string, e.g. "1250.00". */
  price: string;
  stock: number;
  status: ProductStatus;
  category: string;
  sku: string;
  store_id: number;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ------------------------------------------------------------------ orders ---

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "partially_returned"
  | "returned";

export type PaymentStatus = "unpaid" | "paid" | "partially_refunded" | "refunded";
export type ReturnStatus = "requested" | "approved" | "rejected" | "completed";
export type RefundStatus = "none" | "pending" | "refunded";

export interface OrderItem {
  id: number;
  product_id: number | null;
  product_name: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}

export interface OrderReturnItem {
  id: number;
  order_item_id: number;
  quantity_returned: number;
  restock: boolean;
}

export interface OrderReturn {
  id: number;
  order_id: number;
  status: ReturnStatus;
  reason: string | null;
  merchant_note: string | null;
  refund_status: RefundStatus;
  refund_amount: number | null;
  created_at: string;
  OrderReturnItems?: OrderReturnItem[];
}

export interface Order {
  id: number;
  store_id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  note: string | null;
  status: OrderStatus;
  payment_method: "cod" | (string & {});
  payment_status: PaymentStatus;
  subtotal: number;
  total: number;
  total_refunded?: number;
  net_total?: number;
  created_at: string;
  updated_at: string;
  OrderItems?: OrderItem[];
  OrderReturns?: OrderReturn[];
}

export interface PlaceOrderPayload {
  customer: { name: string; phone: string; address: string };
  items: Array<{ productId: number; quantity: number }>;
  paymentMethod: "cod";
  note?: string;
}

export interface CreateReturnPayload {
  reason?: string;
  items: Array<{ orderItemId: number; quantityReturned: number; restock: boolean }>;
}

export interface UpdateReturnPayload {
  status?: ReturnStatus;
  refundStatus?: RefundStatus;
  refundAmount?: number;
  merchantNote?: string;
}

// ----------------------------------------------------------------- billing ---

export interface CheckoutSessionResponse {
  url: string;
}

// ------------------------------------------------------------ generic body ---

/** Error body the backend's errorHandler sends. */
export interface BackendErrorBody {
  success: false;
  error: string;
  message: string;
  details?: unknown;
}
