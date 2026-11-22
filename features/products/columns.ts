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
  createImageColumn<Product>({
    accessorKey: "image",
    altKey: "name",
    header: "Image",
  }),

  createTextColumn<Product>({
    accessorKey: "name",
    header: "Name",
    className: "font-medium",
  }),

  createTextColumn<Product>({
    accessorKey: "category",
    header: "Category",
  }),

  createTextColumn<Product>({
    accessorKey: "sku",
    header: "SKU",
  }),

  createCurrencyColumn<Product>({
    accessorKey: "price",
    header: "Price",
    currency: "$",
    decimals: 2,
  }),

  createTextColumn<Product>({
    accessorKey: "stock",
    header: "Stock",
  }),

  // Seller choice — for sale or paused.
  createStatusColumn<Product>({
    accessorKey: "status",
    header: "Status",
    statusMap: PRODUCT_STATUS_MAP,
  }),

  // Plan catalog cap — independent of seller status.
  createTextColumn<Product>({
    accessorKey: "hidden_by_plan",
    header: "Plan",
    className: "text-xs font-medium text-amber-700 dark:text-amber-400",
    formatter: (value) => (value ? "Hidden (upgrade to show)" : "—"),
  }),

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
