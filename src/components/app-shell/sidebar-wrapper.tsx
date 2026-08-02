"use client";

import { AppSidebar } from "@/components/app-shell/app-sidebar";
import { navigationConfig } from "@/config/navigation.config";

type SidebarWrapperProps = {
  collapsed?: boolean;
  onNavigate?: () => void;
};

export function SidebarWrapper({
  collapsed = false,
  onNavigate,
}: SidebarWrapperProps) {
  return (
    <AppSidebar
      appName="AFOS"
      logoSrc="/savvy-logo.png"
      navigation={navigationConfig}
      collapsed={collapsed}
      onNavigate={onNavigate}
    />
  );
}