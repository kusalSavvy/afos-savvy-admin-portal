"use client";

import { useMemo } from "react";

import { DataTable } from "@/components/data-table/data-table";
import { createAccountColumns } from "@/features/accounts/components/accounts-columns";
import type { Account } from "@/features/accounts/accounts.types";

type AccountsTableProps = {
  accounts: Account[];
  onAccountClick?: (account: Account) => void;
  onEditAccount?: (account: Account) => void;
};

export function AccountsTable({
  accounts,
  onAccountClick,
  onEditAccount,
}: AccountsTableProps) {
  const columns = useMemo(
    () =>
      createAccountColumns({
        onAccountClick,
        onEditAccount,
      }),
    [onAccountClick, onEditAccount],
  );

  return (
    <DataTable
      columns={columns}
      data={accounts}
      title="All Accounts"
      description={`${accounts.length} account${
        accounts.length === 1 ? "" : "s"
      }`}
      searchPlaceholder="Search accounts..."
      emptyMessage="No accounts found."
      pageSize={25}
    />
  );
}