import type { SidebarNavigationGroup } from "@/components/app-shell/app-sidebar";

export const navigationConfig: SidebarNavigationGroup[] = [
  {
    label: "Main",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: "dashboard",
      },
      {
        label: "Accounts",
        href: "/accounts",
        icon: "accounts",
      },
      {
        label: "User Management",
        icon: "users",
        children: [
          {
            label: "Users",
            href: "/users",
          },
          {
            label: "Create User",
            href: "/users/create",
          },
          {
            label: "Password Reset",
            href: "/users/password-reset",
          },
        ],
      },
      {
        label: "Applications",
        href: "/applications",
        icon: "applications",
      },
      {
        label: "Roles & Permissions",
        href: "/roles",
        icon: "roles",
      },
      {
        label: "Audit Logs",
        href: "/audit-logs",
        icon: "auditLogs",
      },
      {
        label: "Settings",
        href: "/settings",
        icon: "settings",
      },
    ],
  },
];
