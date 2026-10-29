import {
  createImageColumn,
  createTextColumn,
  createCurrencyColumn,
  createStatusColumn,
  createActionsColumn,
} from "@/shared/components/table/base-columns";
import { PRODUCT_STATUS } from "@/features/products/constants";
import type { Product } from "@/shared/api/types";

const capitalizeStatus = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const PRODUCT_STATUS_MAP = {
  [capitalizeStatus(PRODUCT_STATUS.ACTIVE)]: {
    className: "font-semibold text-green-600 dark:text-green-400",
  },
  [capitalizeStatus(PRODUCT_STATUS.INACTIVE)]: {
    className: "font-semibold text-gray-400 dark:text-gray-500",
  },
  default: {
    className: "font-semibold text-gray-400 dark:text-gray-500",
  },
};

export const createProductColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}) => [
  // Product Image
  createImageColumn<Product>({
    accessorKey: "image",
    altKey: "name",
    header: "Image",
  }),

  // Product Name
  createTextColumn<Product>({
    accessorKey: "name",
    header: "Name",
    className: "font-medium",
  }),

  // Category
  createTextColumn<Product>({
    accessorKey: "category",
    header: "Category",
  }),

  // SKU
  createTextColumn<Product>({
    accessorKey: "sku",
    header: "SKU",
  }),

  // Price
  createCurrencyColumn<Product>({
    accessorKey: "price",
    header: "Price",
    currency: "$",
    decimals: 2,
  }),

  // Stock
  createTextColumn<Product>({
    accessorKey: "stock",
    header: "Stock",
  }),

  // Status
  createStatusColumn<Product>({
    accessorKey: "status",
    header: "Status",
    statusMap: PRODUCT_STATUS_MAP,
  }),

  // Actions
  createActionsColumn<Product>({
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
