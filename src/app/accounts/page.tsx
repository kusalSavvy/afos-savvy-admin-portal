import Link from "next/link";
import { Plus } from "lucide-react";

import { AdminShell } from "@/components/app-shell/admin-shell";
import { PageContent } from "@/components/page/page-content";
import { PageHeading } from "@/components/page/page-heading";
import { Button } from "@/components/ui/button";
import { mockAccounts } from "@/features/accounts/accounts.mock";
import { AccountsTable } from "@/features/accounts/components/accounts-table";

export default function AccountsPage() {
  return (
    <AdminShell>
      <PageHeading
        title="Accounts"
        breadcrumbs={[
          {
            label: "Home",
            href: "/dashboard",
          },
          {
            label: "Accounts",
          },
        ]}
        actions={
          <Button
            nativeButton={false}
            render={<Link href="/accounts/new" />}
            className="bg-[#ed1b64] text-white hover:bg-[#cf1556]"
          >
            <Plus
              aria-hidden="true"
              className="h-4 w-4"
            />
            New account
          </Button>
        }
      />

      <PageContent>
        <AccountsTable accounts={mockAccounts} />
      </PageContent>
    </AdminShell>
  );
}