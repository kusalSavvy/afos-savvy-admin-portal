"use client";

import {
  ChevronDown,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type HeaderUser = {
  name: string;
  role?: string;
  email?: string;
  imageUrl?: string;
};

type UserMenuProps = {
  user: HeaderUser;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function UserMenu({
  user,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Open user menu"
            className="flex min-w-0 items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        }
      >
        <Avatar className="h-10 w-10 border border-border">
          {user.imageUrl ? (
            <AvatarImage
              src={user.imageUrl}
              alt={user.name}
            />
          ) : null}

          <AvatarFallback className="bg-[#ed1b64] font-semibold text-white">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>

        <span className="hidden min-w-0 sm:block">
          <span className="block max-w-40 truncate text-sm font-semibold">
            {user.name}
          </span>

          {user.role ? (
            <span className="block max-w-40 truncate text-xs text-muted-foreground">
              {user.role}
            </span>
          ) : null}
        </span>

        <ChevronDown
          aria-hidden="true"
          className="hidden h-4 w-4 text-muted-foreground sm:block"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64"
      >
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-border">
              {user.imageUrl ? (
                <AvatarImage
                  src={user.imageUrl}
                  alt={user.name}
                />
              ) : null}

              <AvatarFallback className="bg-[#ed1b64] font-semibold text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {user.name}
              </p>

              {user.email ? (
                <p className="mt-0.5 truncate text-xs font-normal text-muted-foreground">
                  {user.email}
                </p>
              ) : user.role ? (
                <p className="mt-0.5 truncate text-xs font-normal text-muted-foreground">
                  {user.role}
                </p>
              ) : null}
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onProfileClick}>
          <UserRound
            aria-hidden="true"
            className="mr-2 h-4 w-4"
          />
          My profile
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onSettingsClick}>
          <Settings
            aria-hidden="true"
            className="mr-2 h-4 w-4"
          />
          Account settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onLogoutClick}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut
            aria-hidden="true"
            className="mr-2 h-4 w-4"
          />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}