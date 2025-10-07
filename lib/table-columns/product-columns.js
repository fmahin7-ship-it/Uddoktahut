import {
  createImageColumn,
  createTextColumn,
  createCurrencyColumn,
  createStatusColumn,
  createActionsColumn,
} from "./base-columns";

const PRODUCT_STATUS_MAP = {
  Active: {
    className: "font-semibold text-green-600 dark:text-green-400",
  },
  Inactive: {
    className: "font-semibold text-gray-400 dark:text-gray-500",
  },
  default: {
    className: "font-semibold text-gray-400 dark:text-gray-500",
  },
};

export const createProductColumns = ({ onEdit, onDelete }) => [
  // Product Image
  createImageColumn({
    accessorKey: "image",
    altKey: "name",
    header: "Image",
  }),

  // Product Name
  createTextColumn({
    accessorKey: "name",
    header: "Name",
    className: "font-medium",
  }),

  // Category
  createTextColumn({
    accessorKey: "category",
    header: "Category",
  }),

  // SKU
  createTextColumn({
    accessorKey: "sku",
    header: "SKU",
  }),

  // Price
  createCurrencyColumn({
    accessorKey: "price",
    header: "Price",
    currency: "$",
    decimals: 2,
  }),

  // Stock
  createTextColumn({
    accessorKey: "stock",
    header: "Stock",
  }),

  // Status
  createStatusColumn({
    accessorKey: "status",
    header: "Status",
    statusMap: PRODUCT_STATUS_MAP,
  }),

  // Actions
  createActionsColumn({
    header: "Actions",
    actions: [
      {
        label: "Edit",
        variant: "outline",
        onClick: onEdit,
      },
      {
        label: "Delete",
        variant: "destructive",
        onClick: onDelete,
      },
    ],
  }),
];
