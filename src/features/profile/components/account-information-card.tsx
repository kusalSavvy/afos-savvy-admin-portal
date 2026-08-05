import {
  BadgeCheck,
  Fingerprint,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { UserProfile } from "@/features/profile/profile.types";

type AccountInformationCardProps = {
  profile: UserProfile;
};

type InformationItemProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  valueClassName?: string;
};

function InformationItem({
  label,
  value,
  icon: Icon,
  valueClassName,
}: InformationItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ed1b64]/10">
        <Icon
          aria-hidden="true"
          className="h-5 w-5 text-[#ed1b64]"
        />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">
          {label}
        </p>

        <p
          className={[
            "mt-1 truncate text-sm font-semibold text-foreground",
            valueClassName ?? "",
          ].join(" ")}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export function AccountInformationCard({
  profile,
}: AccountInformationCardProps) {
  const accountStatus =
    profile.status.charAt(0).toUpperCase() +
    profile.status.slice(1);

  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardContent className="p-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Account Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your account status, role and security information.
          </p>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <InformationItem
            label="Role"
            value={profile.role}
            icon={UserRound}
          />

          <InformationItem
            label="Status"
            value={accountStatus}
            icon={BadgeCheck}
            valueClassName={
              profile.status === "active"
                ? "text-emerald-600 dark:text-emerald-400"
                : profile.status === "locked"
                  ? "text-red-600 dark:text-red-400"
                  : "text-muted-foreground"
            }
          />

          <InformationItem
            label="Account ID"
            value={profile.id}
            icon={Fingerprint}
          />

          <InformationItem
            label="MFA Status"
            value={profile.mfaEnabled ? "Enabled" : "Disabled"}
            icon={ShieldCheck}
            valueClassName={
              profile.mfaEnabled
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-amber-600 dark:text-amber-400"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}