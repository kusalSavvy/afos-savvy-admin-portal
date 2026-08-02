"use client";

import type { Table } from "@tanstack/react-table";
import { Search, Settings2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  searchColumn?: string;
  searchPlaceholder?: string;
  showColumnVisibility?: boolean;
};

export function DataTableToolbar<TData>({
  table,
  searchColumn,
  searchPlaceholder = "Search...",
  showColumnVisibility = true,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const searchableColumn = searchColumn
    ? table.getColumn(searchColumn)
    : undefined;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        {searchableColumn ? (
          <div className="relative w-full sm:max-w-sm">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />

            <Input
              value={(searchableColumn.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                searchableColumn.setFilterValue(event.target.value)
              }
              placeholder={searchPlaceholder}
              className="h-10 pl-9"
            />
          </div>
        ) : null}

        {isFiltered ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
            className="justify-start sm:justify-center"
          >
            Reset
            <X aria-hidden="true" className="ml-2 h-4 w-4" />
          </Button>
        ) : null}
      </div>

      {showColumnVisibility ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
              />
            }
          >
            <Settings2 aria-hidden="true" className="h-4 w-4" />
            Columns
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide(),
              )
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(Boolean(value))
                  }
                  className="capitalize"
                >
                  {column.id.replaceAll("_", " ")}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  );
}
