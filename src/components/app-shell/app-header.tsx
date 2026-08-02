"use client";

import { Menu } from "lucide-react";

import { HeaderSearch } from "@/components/app-shell/header/header-search";
import {
  type HeaderNotification,
  NotificationMenu,
} from "@/components/app-shell/header/notification-menu";
import { ThemeToggle } from "@/components/app-shell/header/theme-toggle";
import {
  type HeaderUser,
  UserMenu,
} from "@/components/app-shell/header/user-menu";
import { Button } from "@/components/ui/button";

type AppHeaderProps = {
  user: HeaderUser;
  notifications?: HeaderNotification[];
  searchPlaceholder?: string;
  showSearch?: boolean;
  showThemeToggle?: boolean;
  showNotifications?: boolean;
  onMenuClick?: () => void;
  onSearch?: (value: string) => void;
  onNotificationClick?: (
    notification: HeaderNotification,
  ) => void;
  onMarkAllNotificationsRead?: () => void;
  onViewAllNotifications?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
};

export function AppHeader({
  user,
  notifications = [],
  searchPlaceholder = "Search users, applications, lenders, and more...",
  showSearch = true,
  showThemeToggle = true,
  showNotifications = true,
  onMenuClick,
  onSearch,
  onNotificationClick,
  onMarkAllNotificationsRead,
  onViewAllNotifications,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
}: AppHeaderProps) {
  return (
    <header className="flex h-[72px] w-full items-center gap-3 border-b border-border bg-background px-4 text-foreground sm:px-6">
      {/* Sidebar toggle */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Toggle navigation menu"
        onClick={onMenuClick}
        className="h-11 w-11 shrink-0 rounded-xl"
      >
        <Menu
          aria-hidden="true"
          className="h-5 w-5"
        />
      </Button>

      {/* Global search */}
      {showSearch ? (
        <HeaderSearch
          placeholder={searchPlaceholder}
          onSearch={onSearch}
        />
      ) : null}

      {/* Header actions */}
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {showThemeToggle ? <ThemeToggle /> : null}

        {showNotifications ? (
          <NotificationMenu
            notifications={notifications}
            onNotificationClick={onNotificationClick}
            onMarkAllAsRead={onMarkAllNotificationsRead}
            onViewAll={onViewAllNotifications}
          />
        ) : null}

        <div className="hidden h-9 w-px bg-border sm:block" />

        <UserMenu
          user={user}
          onProfileClick={onProfileClick}
          onSettingsClick={onSettingsClick}
          onLogoutClick={onLogoutClick}
        />
      </div>
    </header>
  );
}