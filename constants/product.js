/** Canonical product status — must match backend PRODUCT_STATUS (lowercase in API/DB). */
export const PRODUCT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const PRODUCT_STATUS_OPTIONS = [
  { value: PRODUCT_STATUS.ACTIVE, label: "Active" },
  { value: PRODUCT_STATUS.INACTIVE, label: "Inactive" },
];
