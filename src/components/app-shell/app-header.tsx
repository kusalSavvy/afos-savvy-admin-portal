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
    <header className="relative flex h-[72px] w-full items-center gap-3 border-b border-[#cbd5e1] bg-[#eef3f8] px-4 text-[#0f2747] shadow-sm dark:border-white/10 dark:bg-[#102a4c] dark:text-white sm:px-6">
      {/* Savvy accent line */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#ed1b64]" />

      {/* Sidebar toggle */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Toggle navigation menu"
        onClick={onMenuClick}
        className="h-11 w-11 shrink-0 rounded-xl border-[#b8c5d3] bg-white/80 text-[#0f2747] shadow-none hover:border-[#ed1b64]/50 hover:bg-white hover:text-[#ed1b64] dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:border-[#ed1b64]/60 dark:hover:bg-white/15 dark:hover:text-[#ff7eaa]"
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

        <div className="hidden h-9 w-px bg-[#b8c5d3] dark:bg-white/15 sm:block" />

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