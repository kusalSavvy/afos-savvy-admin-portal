"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import { AppHeader } from "@/components/app-shell/app-header";
import { AppShell } from "@/components/app-shell/app-shell";
import { AppSidebar } from "@/components/app-shell/app-sidebar";
import { SignOutDialog } from "@/components/auth/sign-out-dialog";
import { navigationConfig } from "@/config/navigation.config";

type AdminShellProps = {
  children: ReactNode;
};

const notifications = [
  {
    id: "notification-1",
    title: "New user created",
    description:
      "A new administrator account was created successfully.",
    createdAt: "5 minutes ago",
    type: "user" as const,
    isRead: false,
  },
  {
    id: "notification-2",
    title: "Application submitted",
    description:
      "A new finance application is ready for review.",
    createdAt: "20 minutes ago",
    type: "application" as const,
    isRead: false,
  },
];

export function AdminShell({
  children,
}: AdminShellProps) {
  const router = useRouter();

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [signOutOpen, setSignOutOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] =
    useState(false);

  function toggleSidebar() {
    setSidebarCollapsed((current) => !current);
  }

  function handleSignOutRequest() {
    setSignOutOpen(true);
  }

  function handleConfirmSignOut() {
    setIsSigningOut(true);

    localStorage.removeItem("afos-admin-session");

    router.replace("/login");
    router.refresh();
  }

  function handleProfileClick() {
  router.push("/profile");
}

  return (
    <>
      <AppShell
        sidebar={
          <AppSidebar
            appName="AFOS"
            logoSrc="/savvy-logo.png"
            navigation={navigationConfig}
            collapsed={sidebarCollapsed}
            footerText="© 2026 Savvy"
            footerVersion="v1.0.0"
          />
        }
        header={
          <AppHeader
            user={{
              name: "Super Admin",
              role: "Administrator",
              email: "superadmin@savvy.com.au",
            }}
            notifications={notifications}
            searchPlaceholder="Search users, applications, lenders, and more..."
            onMenuClick={toggleSidebar}
            onProfileClick={handleProfileClick}
            onLogoutClick={handleSignOutRequest}
          />
        }
      >
        {children}
      </AppShell>

      <SignOutDialog
        open={signOutOpen}
        isSigningOut={isSigningOut}
        onOpenChange={setSignOutOpen}
        onConfirm={handleConfirmSignOut}
      />
    </>
  );
}