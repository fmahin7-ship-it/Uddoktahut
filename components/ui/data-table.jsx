"use client";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/common/TableSkeleton";

export function DataTable({
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
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [clientPagination, setClientPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const handleServerPaginationChange = (updater) => {
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
        <Input
          placeholder={filterPlaceholder}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="max-w-sm"
        />
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
