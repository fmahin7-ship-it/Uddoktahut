/** One cart entry as stored in localStorage (per shop). */
export interface CartItem {
  productId: number;
  quantity: number;
}

/** A cart entry joined with its catalog product, ready to display. */
export interface CartLine {
  productId: number;
  name: string;
  image: string | null;
  unitPrice: number;
  quantity: number;
  stock: number;
  lineTotal: number;
}

export interface ResolvedCart {
  lines: CartLine[];
  /** Items whose product is no longer in the catalog. */
  orphanLines: CartItem[];
  subtotal: number;
  resolvedCount: number;
  errors: string[];
  isValid: boolean;
}
