"use client";

import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
};

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className = "",
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <span className={className}>{title}</span>;
  }

  const sortDirection = column.getIsSorted();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 gap-1.5 data-[state=open]:bg-slate-100"
            />
          }
        >
          <span>{title}</span>

          {sortDirection === "desc" ? (
            <ArrowDown aria-hidden="true" className="h-4 w-4" />
          ) : sortDirection === "asc" ? (
            <ArrowUp aria-hidden="true" className="h-4 w-4" />
          ) : (
            <ChevronsUpDown
              aria-hidden="true"
              className="h-4 w-4 text-slate-400"
            />
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp aria-hidden="true" className="mr-2 h-4 w-4" />
            Sort ascending
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown aria-hidden="true" className="mr-2 h-4 w-4" />
            Sort descending
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff aria-hidden="true" className="mr-2 h-4 w-4" />
            Hide column
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
