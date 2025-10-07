import { Button } from "@/components/ui/button";

export const createImageColumn = ({
  accessorKey = "image",
  altKey = "name",
  className = "w-12 h-12 object-cover rounded border",
  header = "Image",
} = {}) => ({
  accessorKey,
  header,
  cell: ({ row }) => (
    <img
      src={row.original[accessorKey]}
      alt={row.original[altKey]}
      className={className}
    />
  ),
  enableSorting: false,
});

export const createTextColumn = ({
  accessorKey,
  header,
  className = "",
  formatter,
} = {}) => ({
  accessorKey,
  header,
  cell: ({ row }) => {
    const value = row.original[accessorKey];
    const formattedValue = formatter ? formatter(value) : value;

    return className ? (
      <span className={className}>{formattedValue}</span>
    ) : (
      formattedValue
    );
  },
});

export const createCurrencyColumn = ({
  accessorKey = "price",
  header = "Price",
  currency = "$",
  decimals = 2,
} = {}) => ({
  accessorKey,
  header,
  cell: ({ row }) =>
    `${currency}${row.original[accessorKey].toFixed(decimals)}`,
});

export const createStatusColumn = ({
  accessorKey = "status",
  header = "Status",
  statusMap = {},
} = {}) => ({
  accessorKey,
  header,
  cell: ({ row }) => {
    const status = row.original[accessorKey];
    const statusConfig = statusMap[status] || statusMap.default || {};

    return <span className={statusConfig.className || ""}>{status}</span>;
  },
});

export const createActionsColumn = ({
  actions = [],
  header = "Actions",
} = {}) => ({
  id: "actions",
  header,
  cell: ({ row }) => (
    <div className="flex gap-2">
      {actions.map((action, index) => (
        <Button
          key={index}
          size={action.size || "sm"}
          variant={action.variant || "outline"}
          className={action.className || "cursor-pointer"}
          onClick={() => action.onClick(row.original)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  ),
  enableSorting: false,
});
