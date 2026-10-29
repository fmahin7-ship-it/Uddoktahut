import type { ReactNode } from "react";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/shared/ui/button";

/**
 * Small factories for TanStack Table columns. `TData` is the row type;
 * keys are checked against it.
 */

type Key<TData> = Extract<keyof TData, string>;

export const createImageColumn = <TData,>({
  accessorKey,
  altKey,
  className = "w-12 h-12 object-cover rounded border",
  header = "Image",
}: {
  accessorKey: Key<TData>;
  altKey: Key<TData>;
  className?: string;
  header?: string;
}): ColumnDef<TData> => ({
  accessorKey,
  header,
  cell: ({ row }: { row: Row<TData> }) => (
    // eslint-disable-next-line @next/next/no-img-element -- seller images come from arbitrary hosts
    <img
      src={String(row.original[accessorKey] ?? "")}
      alt={String(row.original[altKey] ?? "")}
      className={className}
    />
  ),
  enableSorting: false,
});

export const createTextColumn = <TData,>({
  accessorKey,
  header,
  className = "",
  formatter,
}: {
  accessorKey: Key<TData>;
  header: string;
  className?: string;
  formatter?: (value: TData[Key<TData>]) => ReactNode;
}): ColumnDef<TData> => ({
  accessorKey,
  header,
  cell: ({ row }: { row: Row<TData> }) => {
    const value = row.original[accessorKey];
    const formattedValue = formatter ? formatter(value) : (value as ReactNode);

    return className ? <span className={className}>{formattedValue}</span> : formattedValue;
  },
});

export const createCurrencyColumn = <TData,>({
  accessorKey,
  header = "Price",
  currency = "$",
  decimals = 2,
}: {
  accessorKey: Key<TData>;
  header?: string;
  currency?: string;
  decimals?: number;
}): ColumnDef<TData> => ({
  accessorKey,
  header,
  cell: ({ row }: { row: Row<TData> }) =>
    `${currency}${Number(row.original[accessorKey]).toFixed(decimals)}`,
});

export interface StatusStyle {
  className?: string;
}

export const createStatusColumn = <TData,>({
  accessorKey,
  header = "Status",
  statusMap = {},
}: {
  accessorKey: Key<TData>;
  header?: string;
  /** Keyed by the capitalised status ("Active"), plus an optional "default". */
  statusMap?: Record<string, StatusStyle>;
}): ColumnDef<TData> => ({
  accessorKey,
  header,
  cell: ({ row }: { row: Row<TData> }) => {
    const status = String(row.original[accessorKey] ?? "");
    const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);
    const statusConfig = statusMap[capitalizedStatus] ?? statusMap.default ?? {};

    return <span className={statusConfig.className || ""}>{capitalizedStatus}</span>;
  },
});

export interface RowAction<TData> {
  label: ReactNode;
  onClick: (row: TData) => void;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}

export const createActionsColumn = <TData,>({
  actions = [],
  header = "Actions",
}: {
  actions?: RowAction<TData>[];
  header?: string;
}): ColumnDef<TData> => ({
  id: "actions",
  header,
  cell: ({ row }: { row: Row<TData> }) => (
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
