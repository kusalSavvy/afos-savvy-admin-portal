import { AdminShell } from "@/components/app-shell/admin-shell";
import { PageContent } from "@/components/page/page-content";
import { PageHeading } from "@/components/page/page-heading";
import { AccountInformationCard } from "@/features/profile/components/account-information-card";
import { ProfileInformationForm } from "@/features/profile/components/profile-information-form";
import { ProfileSummaryCard } from "@/features/profile/components/profile-summary-card";
import { mockProfile } from "@/features/profile/profile.mock";

export default function ProfilePage() {
  return (
    <AdminShell>
      <PageHeading
        title="My Profile"
        description="Manage your personal information and account details."
        breadcrumbs={[
          {
            label: "Home",
            href: "/dashboard",
          },
          {
            label: "My Profile",
          },
        ]}
      />

      <PageContent>
        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <ProfileSummaryCard profile={mockProfile} />

          <div className="min-w-0 space-y-6">
            <ProfileInformationForm profile={mockProfile} />

            <AccountInformationCard profile={mockProfile} />
          </div>
        </div>
      </PageContent>
    </AdminShell>
  );
}