"use client";

import { useState, type ReactNode } from "react";
import { AppHeader } from "@/components/app-shell/app-header";
import { AppShell } from "@/components/app-shell/app-shell";
import { AppSidebar } from "@/components/app-shell/app-sidebar";
import { navigationConfig } from "@/config/navigation.config";

type AdminShellProps = {
  children: ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  function toggleSidebar() {
    setSidebarCollapsed((current) => !current);
  }

  return (
    <AppShell
      sidebar={
        <AppSidebar
          appName="AFOS"
          logoSrc="/savvy-logo.png"
          navigation={navigationConfig}
          collapsed={sidebarCollapsed}
        />
      }
      header={
        <AppHeader
          user={{
            name: "Super Admin",
            role: "Administrator",
            email: "superadmin@savvy.com.au",
          }}
          notifications={[
            {
              id: "notification-1",
              title: "New user created",
              description:
                "A new administrator account was created successfully.",
              createdAt: "5 minutes ago",
              type: "user",
              isRead: false,
            },
            {
              id: "notification-2",
              title: "Application submitted",
              description:
                "A new finance application is ready for review.",
              createdAt: "20 minutes ago",
              type: "application",
              isRead: false,
            },
          ]}
          searchPlaceholder="Search users, applications, lenders, and more..."
          onMenuClick={toggleSidebar}
        />
      }
    >
      {children}
    </AppShell>
  );
}