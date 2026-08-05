"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Account } from "@/features/accounts/accounts.types";

type CreateAccountColumnsOptions = {
  onAccountClick?: (account: Account) => void;
  onEditAccount?: (account: Account) => void;
};

export function createAccountColumns({
  onAccountClick,
  onEditAccount,
}: CreateAccountColumnsOptions): ColumnDef<Account>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          aria-label="Select all accounts"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected()
              ? true
              : false)
          }
          onChange={(event) =>
            table.toggleAllPageRowsSelected(
              event.target.checked,
            )
          }
          className="h-4 w-4 rounded border-border"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          aria-label={`Select ${row.original.accountName}`}
          checked={row.getIsSelected()}
          onChange={(event) =>
            row.toggleSelected(event.target.checked)
          }
          className="h-4 w-4 rounded border-border"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "accountType",
      header: ({ column }) => (
        <button
          type="button"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc",
            )
          }
          className="flex items-center gap-2"
        >
          Account type
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ),
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() =>
            onAccountClick?.(row.original)
          }
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          {row.original.accountType}
        </button>
      ),
    },
    {
      accessorKey: "accountName",
      header: ({ column }) => (
        <button
          type="button"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc",
            )
          }
          className="flex items-center gap-2"
        >
          Account name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ),
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() =>
            onAccountClick?.(row.original)
          }
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          {row.original.accountName}
        </button>
      ),
    },
    {
      accessorKey: "billingState",
      header: "Billing state",
      cell: ({ row }) =>
        row.original.billingState ?? "—",
    },
    {
      accessorKey: "mobile",
      header: "Mobile",
      cell: ({ row }) => row.original.mobile ?? "—",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span
          title={row.original.email}
          className="block max-w-56 truncate"
        >
          {row.original.email ?? "—"}
        </span>
      ),
    },
    {
      accessorKey: "ownerFirstName",
      header: "Owner first name",
      cell: ({ row }) =>
        row.original.ownerFirstName ?? "—",
    },
    {
      accessorKey: "ownerLastName",
      header: "Owner last name",
      cell: ({ row }) =>
        row.original.ownerLastName ?? "—",
    },
    {
      accessorKey: "createdDate",
      header: ({ column }) => (
        <button
          type="button"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc",
            )
          }
          className="flex items-center gap-2"
        >
          Created date
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ),
    },
    {
      accessorKey: "lastModifiedDate",
      header: ({ column }) => (
        <button
          type="button"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc",
            )
          }
          className="flex items-center gap-2"
        >
          Last modified date
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ),
    },
    {
      id: "actions",
      header: () => (
        <span className="sr-only">Actions</span>
      ),
      cell: ({ row }) => (
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={`Open actions for ${row.original.accountName}`}
          onClick={() =>
            onEditAccount?.(row.original)
          }
          className="h-8 w-8"
        >
          <MoreHorizontal
            aria-hidden="true"
            className="h-4 w-4"
          />
        </Button>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
}