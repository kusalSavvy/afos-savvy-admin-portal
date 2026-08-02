"use client";

import {
  Bell,
  CheckCheck,
  CircleAlert,
  FileText,
  ShieldCheck,
  UserRoundPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type NotificationType =
  | "user"
  | "application"
  | "security"
  | "system";

export type HeaderNotification = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  type: NotificationType;
  isRead?: boolean;
};

type NotificationMenuProps = {
  notifications: HeaderNotification[];
  onNotificationClick?: (notification: HeaderNotification) => void;
  onMarkAllAsRead?: () => void;
  onViewAll?: () => void;
};

const notificationIconMap = {
  user: UserRoundPlus,
  application: FileText,
  security: ShieldCheck,
  system: CircleAlert,
};

const notificationIconStyles = {
  user: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  application:
    "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  security:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  system:
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
};

export function NotificationMenu({
  notifications,
  onNotificationClick,
  onMarkAllAsRead,
  onViewAll,
}: NotificationMenuProps) {
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={
              unreadCount > 0
                ? `${unreadCount} unread notifications`
                : "Notifications"
            }
            className="relative h-11 w-11 rounded-xl"
          />
        }
      >
        <Bell aria-hidden="true" className="h-5 w-5" />

        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ed1b64] px-1 text-[10px] font-bold text-white ring-2 ring-background">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        ) : null}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[calc(100vw-2rem)] max-w-sm p-0 sm:w-96"
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <DropdownMenuLabel className="p-0">
            <span className="text-sm font-semibold text-foreground">
              Notifications
            </span>

            <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
              {unreadCount > 0
                ? `${unreadCount} unread notification${
                    unreadCount === 1 ? "" : "s"
                  }`
                : "You are all caught up"}
            </span>
          </DropdownMenuLabel>

          {unreadCount > 0 ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onMarkAllAsRead}
              className="h-8 gap-1.5 px-2 text-xs"
            >
              <CheckCheck
                aria-hidden="true"
                className="h-4 w-4"
              />
              Mark all read
            </Button>
          ) : null}
        </div>

        <DropdownMenuSeparator className="m-0" />

        <div className="max-h-[420px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const Icon = notificationIconMap[notification.type];

              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() =>
                    onNotificationClick?.(notification)
                  }
                  className={[
                    "relative flex w-full gap-3 border-b border-border px-4 py-3 text-left",
                    "transition-colors last:border-b-0 hover:bg-muted/60",
                    notification.isRead
                      ? "bg-background"
                      : "bg-[#ed1b64]/[0.035]",
                  ].join(" ")}
                >
                  {!notification.isRead ? (
                    <span
                      aria-hidden="true"
                      className="absolute left-1.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#ed1b64]"
                    />
                  ) : null}

                  <span
                    className={[
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                      notificationIconStyles[notification.type],
                    ].join(" ")}
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">
                      {notification.title}
                    </span>

                    <span className="mt-1 line-clamp-2 block text-xs leading-5 text-muted-foreground">
                      {notification.description}
                    </span>

                    <span className="mt-1.5 block text-[11px] text-muted-foreground">
                      {notification.createdAt}
                    </span>
                  </span>
                </button>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Bell
                  aria-hidden="true"
                  className="h-6 w-6 text-muted-foreground"
                />
              </div>

              <p className="mt-4 text-sm font-semibold text-foreground">
                No notifications
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                New activity and system updates will appear here.
              </p>
            </div>
          )}
        </div>

        <DropdownMenuSeparator className="m-0" />

        <div className="p-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onViewAll}
            className="w-full justify-center text-sm font-medium text-[#ed1b64] hover:text-[#cf1556]"
          >
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}