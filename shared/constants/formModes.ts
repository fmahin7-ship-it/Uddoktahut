// Form modes for product operations
export const FORM_MODES = {
  ADD: "add",
  EDIT: "edit",
} as const;

export type FormMode = (typeof FORM_MODES)[keyof typeof FORM_MODES];

// Modal types for product operations
export const MODAL_TYPES = {
  ADD_PRODUCT: "addProduct",
  EDIT_PRODUCT: "editProduct",
  DELETE_PRODUCT: "deleteProduct",
} as const;
