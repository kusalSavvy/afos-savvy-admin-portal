"use client";

import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
};

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const selectedRowCount =
    table.getFilteredSelectedRowModel().rows.length;
  const totalRowCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="flex flex-col gap-4 px-1 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        {selectedRowCount > 0
          ? `${selectedRowCount} of ${totalRowCount} row(s) selected`
          : `${totalRowCount} record(s)`}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-sm text-slate-600">
            Rows per page
          </span>

          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) =>
              table.setPageSize(Number(value))
            }
          >
            <SelectTrigger className="h-9 w-[78px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent side="top">
              {[10, 20, 30, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="min-w-28 text-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {Math.max(table.getPageCount(), 1)}
          </span>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="hidden h-9 w-9 sm:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              aria-label="Go to first page"
            >
              <ChevronsLeft
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Go to previous page"
            >
              <ChevronLeft
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Go to next page"
            >
              <ChevronRight
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="hidden h-9 w-9 sm:flex"
              onClick={() =>
                table.setPageIndex(
                  Math.max(table.getPageCount() - 1, 0),
                )
              }
              disabled={!table.getCanNextPage()}
              aria-label="Go to last page"
            >
              <ChevronsRight
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}