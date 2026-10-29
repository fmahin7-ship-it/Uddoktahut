"use client";
import type React from "react";
import { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type Updater,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import TableSkeleton from "@/shared/components/TableSkeleton";

export interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  filterPlaceholder?: string;
  /** Omit both to hide the search box. */
  search?: string;
  setSearch?: (value: string) => void;
  loading?: boolean;
  skeletonColumns?: Array<{ header?: React.ReactNode; skeletonClassName?: string }>;
  /** Pagination is done by the backend; pass pageIndex/pageCount/totalRows. */
  serverSide?: boolean;
  pageIndex?: number;
  pageSize?: number;
  pageCount?: number;
  totalRows?: number;
  onPageChange?: (pageIndex: number) => void;
}

export function DataTable<TData>({
  columns,
  data,
  filterPlaceholder = "Filter...",
  search,
  setSearch,
  loading = false,
  skeletonColumns = [],
  serverSide = false,
  pageIndex = 0,
  pageSize = 5,
  pageCount,
  totalRows,
  onPageChange,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [clientPagination, setClientPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const handleServerPaginationChange = (updater: Updater<PaginationState>) => {
    const current = { pageIndex, pageSize };
    const next =
      typeof updater === "function" ? updater(current) : updater;
    onPageChange?.(next.pageIndex);
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    ...(serverSide
      ? {
          manualPagination: true,
          pageCount,
          rowCount: totalRows,
        }
      : { getPaginationRowModel: getPaginationRowModel() }),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: serverSide
      ? handleServerPaginationChange
      : setClientPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: serverSide
        ? { pageIndex, pageSize }
        : clientPagination,
    },
  });

  const { pageIndex: activePageIndex, pageSize: activePageSize } =
    table.getState().pagination;

  const totalCount = serverSide
    ? table.getRowCount()
    : table.getFilteredRowModel().rows.length;

  const rowStart =
    totalCount === 0 ? 0 : activePageIndex * activePageSize + 1;
  const rowEnd = Math.min(
    (activePageIndex + 1) * activePageSize,
    totalCount
  );

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {setSearch && (
          <Input
            placeholder={filterPlaceholder}
            value={search ?? ""}
            onChange={(event) => setSearch(event.target.value)}
            className="max-w-sm"
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        {loading ? (
          <TableSkeleton columns={skeletonColumns} rows={pageSize} />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          Page {activePageIndex + 1} of {table.getPageCount()} | Rows{" "}
          {rowStart} - {rowEnd} of {totalCount}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={
              table.getCanPreviousPage()
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            }
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={
              table.getCanNextPage()
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
