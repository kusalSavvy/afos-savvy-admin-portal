"use client";

import {
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Pencil,
  Phone,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { UserProfile } from "@/features/profile/profile.types";

type ProfileSummaryCardProps = {
  profile: UserProfile;
  onEditPhoto?: () => void;
  onChangePassword?: () => void;
};

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function ProfileSummaryCard({
  profile,
  onEditPhoto,
  onChangePassword,
}: ProfileSummaryCardProps) {
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <Card className="h-fit rounded-2xl border-border shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <Avatar className="h-28 w-28 border-4 border-background shadow-md">
              {profile.imageUrl ? (
                <AvatarImage
                  src={profile.imageUrl}
                  alt={fullName}
                />
              ) : null}

              <AvatarFallback className="bg-[#ed1b64] text-3xl font-bold text-white">
                {getInitials(
                  profile.firstName,
                  profile.lastName,
                )}
              </AvatarFallback>
            </Avatar>

            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Change profile photo"
              onClick={onEditPhoto}
              className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full bg-background shadow-sm"
            >
              <Pencil
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Button>
          </div>

          <h2 className="mt-5 text-xl font-bold text-foreground">
            {fullName}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {profile.role}
          </p>

          <span
            className={[
              "mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize",
              profile.status === "active"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                : profile.status === "locked"
                  ? "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                  : "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300",
            ].join(" ")}
          >
            {profile.status}
          </span>
        </div>

        <div className="my-6 h-px bg-border" />

        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

            <span className="min-w-0 break-all text-foreground">
              {profile.email}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

            <span className="text-foreground">
              {profile.phone ?? "Not provided"}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

            <span className="text-foreground">
              Joined on {profile.joinedAt}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

            <span className="text-foreground">
              Last login: {profile.lastLoginAt ?? "Not available"}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

            <span className="text-foreground">
              {profile.timeZone ?? profile.location ?? "Not provided"}
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onChangePassword}
          className="mt-6 w-full rounded-xl border-[#ed1b64]/40 text-[#ed1b64] hover:bg-[#ed1b64]/10 hover:text-[#cf1556]"
        >
          Change password
        </Button>
      </CardContent>
    </Card>
  );
}