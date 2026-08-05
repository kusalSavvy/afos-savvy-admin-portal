"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  description?: string;
  searchColumn?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  toolbarActions?: ReactNode;
  pageSize?: number;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
  description,
  searchColumn,
  searchPlaceholder = "Search...",
  emptyMessage = "No records found.",
  toolbarActions,
  pageSize = 25,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

// TanStack Table returns mutable functions that React Compiler
// cannot safely memoize. The component remains valid and functional.
// eslint-disable-next-line react-hooks/incompatible-library
const table = useReactTable({
  data,
  columns,
  state: {
    sorting,
    columnFilters,
    rowSelection,
    globalFilter,
    pagination,
  },
  enableRowSelection: true,
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  onRowSelectionChange: setRowSelection,
  onGlobalFilterChange: setGlobalFilter,
  onPaginationChange: setPagination,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});

  const searchValue = useMemo(() => {
    if (searchColumn) {
      return (
        (table
          .getColumn(searchColumn)
          ?.getFilterValue() as string | undefined) ?? ""
      );
    }

    return globalFilter;
  }, [globalFilter, searchColumn, table]);

  function handleSearch(value: string) {
    if (searchColumn) {
      table.getColumn(searchColumn)?.setFilterValue(value);
      return;
    }

    table.setGlobalFilter(value);
  }

  const filteredRowCount =
    table.getFilteredRowModel().rows.length;

  const firstVisibleRow =
    filteredRowCount === 0
      ? 0
      : pagination.pageIndex * pagination.pageSize + 1;

  const lastVisibleRow = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    filteredRowCount,
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          {title ? (
            <h2 className="text-lg font-semibold text-foreground">
              {title}
            </h2>
          ) : null}

          <p className="mt-1 text-sm text-muted-foreground">
            {description ??
              `${filteredRowCount} record${
                filteredRowCount === 1 ? "" : "s"
              }`}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
          <div className="relative w-full lg:w-80">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              value={searchValue}
              onChange={(event) =>
                handleSearch(event.target.value)
              }
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="h-10 pl-10"
            />
          </div>

          {toolbarActions}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-border"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="whitespace-nowrap px-4 py-3 text-left font-semibold text-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={
                    row.getIsSelected()
                      ? "selected"
                      : undefined
                  }
                  className="border-b border-border transition-colors last:border-b-0 hover:bg-muted/40 data-[state=selected]:bg-muted"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap px-4 py-3"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-16 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {firstVisibleRow}–{lastVisibleRow} of{" "}
          {filteredRowCount}
        </p>

        <div className="flex items-center gap-3">
          <select
            value={pagination.pageSize}
            onChange={(event) =>
              table.setPageSize(Number(event.target.value))
            }
            aria-label="Rows per page"
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} rows
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-2 text-sm text-muted-foreground">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {Math.max(table.getPageCount(), 1)}
            </span>

            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}