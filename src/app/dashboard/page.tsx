import {
  FileText,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react";

import { AdminShell } from "@/components/app-shell/admin-shell";
import { PageContent } from "@/components/page/page-content";
import { PageHeading } from "@/components/page/page-heading";

const dashboardCards = [
  {
    title: "Total Accounts",
    value: "1,248",
    icon: WalletCards,
  },
  {
    title: "Active Users",
    value: "86",
    icon: Users,
  },
  {
    title: "Applications",
    value: "324",
    icon: FileText,
  },
  {
    title: "Roles",
    value: "12",
    icon: ShieldCheck,
  },
];

export default function DashboardPage() {
  return (
    <AdminShell>
      <PageHeading
        title="Dashboard"
        description="Overview of AFOS administration activity."
        breadcrumbs={[
          {
            label: "Home",
          },
          {
            label: "Dashboard",
          },
        ]}
      />

      <PageContent>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <section
                key={card.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {card.title}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-foreground">
                      {card.value}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ed1b64]/10">
                    <Icon className="h-6 w-6 text-[#ed1b64]" />
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-6 min-h-80 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">
            Recent activity
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Recent administration activity will be displayed here.
          </p>
        </section>
      </PageContent>
    </AdminShell>
  );
}