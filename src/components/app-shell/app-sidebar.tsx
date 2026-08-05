"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  FileText,
  LayoutDashboard,
  ScrollText,
  Settings,
  ShieldCheck,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";

export type SidebarIconName =
  | "dashboard"
  | "accounts"
  | "users"
  | "userManagement"
  | "applications"
  | "roles"
  | "settings"
  | "auditLogs"
  | "support";

export type SidebarNavigationChild = {
  label: string;
  href: string;
  badge?: string | number;
  disabled?: boolean;
};

export type SidebarNavigationItem = {
  label: string;
  href?: string;
  icon: SidebarIconName;
  badge?: string | number;
  disabled?: boolean;
  children?: SidebarNavigationChild[];
};

export type SidebarNavigationGroup = {
  label: string;
  items: SidebarNavigationItem[];
};

type AppSidebarProps = {
  appName: string;
  logoSrc: string;
  navigation: SidebarNavigationGroup[];
  collapsed?: boolean;
  footerText?: string;
  footerVersion?: string;
  onNavigate?: () => void;
};

const iconMap: Record<SidebarIconName, LucideIcon> = {
  dashboard: LayoutDashboard,
  accounts: Building2,
  users: Users,
  userManagement: UserCog,
  applications: FileText,
  roles: ShieldCheck,
  settings: Settings,
  auditLogs: ScrollText,
  support: CircleHelp,
};

function isRouteActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function createSubmenuId(label: string) {
  return `sidebar-submenu-${label
    .trim()
    .toLowerCase()
    .replaceAll(" ", "-")}`;
}

export function AppSidebar({
  appName,
  logoSrc,
  navigation,
  collapsed = false,
  footerText = "© 2026 Savvy",
  footerVersion = "v1.0.0",
  onNavigate,
}: AppSidebarProps) {
  const pathname = usePathname();

  const [expandedItems, setExpandedItems] = useState<
    Record<string, boolean>
  >({});

  function toggleExpandedItem(label: string) {
    setExpandedItems((currentItems) => ({
      ...currentItems,
      [label]: !currentItems[label],
    }));
  }

  return (
    <aside
      className={[
        "flex h-dvh shrink-0 flex-col",
        "border-r border-white/10 bg-[#071d3d] text-white",
        "transition-[width] duration-200 ease-in-out",
        collapsed ? "w-[72px]" : "w-[248px]",
      ].join(" ")}
    >
      {/* Branding */}
      <div
        className={[
          "flex h-[72px] shrink-0 items-center",
          "border-b border-white/10",
          collapsed ? "justify-center px-3" : "gap-3 px-5",
        ].join(" ")}
      >
        <Image
          src={logoSrc}
          alt={appName}
          width={120}
          height={44}
          priority
          className={[
            "shrink-0 object-contain",
            collapsed ? "h-9 w-9" : "h-10 w-[104px]",
          ].join(" ")}
        />

        {!collapsed ? (
          <div className="min-w-0 border-l border-white/15 pl-3">
            <p className="truncate text-sm font-semibold text-white">
              {appName}
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              Admin Portal
            </p>
          </div>
        ) : null}
      </div>

      {/* Navigation */}
      <nav
        aria-label="Primary navigation"
        className="min-h-0 flex-1 overflow-y-auto px-3 py-5"
      >
        {navigation.map((group) => (
          <section
            key={group.label}
            className="mb-6 last:mb-0"
          >
            {!collapsed ? (
              <h2 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {group.label}
              </h2>
            ) : (
              <div
                aria-hidden="true"
                className="mx-auto mb-3 h-px w-8 bg-white/10"
              />
            )}

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon];
                const hasChildren = Boolean(item.children?.length);

                const hasActiveChild =
                  item.children?.some((child) =>
                    isRouteActive(pathname, child.href),
                  ) ?? false;

                const isDirectlyActive = item.href
                  ? isRouteActive(pathname, item.href)
                  : false;

                const isActive =
                  isDirectlyActive || hasActiveChild;

                const isExpanded =
                  Boolean(expandedItems[item.label]) ||
                  hasActiveChild;

                if (item.disabled) {
                  return (
                    <div
                      key={item.label}
                      aria-disabled="true"
                      title={
                        collapsed
                          ? item.label
                          : undefined
                      }
                      className={[
                        "flex cursor-not-allowed items-center rounded-xl px-3 py-2.5",
                        "text-sm text-slate-500 opacity-60",
                        collapsed
                          ? "justify-center"
                          : "gap-3",
                      ].join(" ")}
                    >
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0"
                      />

                      {!collapsed ? (
                        <span className="min-w-0 flex-1 truncate">
                          {item.label}
                        </span>
                      ) : null}
                    </div>
                  );
                }

                if (hasChildren) {
                  const submenuId =
                    createSubmenuId(item.label);

                  return (
                    <div key={item.label}>
                      <button
                        type="button"
                        title={
                          collapsed
                            ? item.label
                            : undefined
                        }
                        aria-expanded={
                          collapsed
                            ? undefined
                            : isExpanded
                        }
                        aria-controls={submenuId}
                        onClick={() => {
                          if (collapsed) {
                            onNavigate?.();

                            setExpandedItems(
                              (currentItems) => ({
                                ...currentItems,
                                [item.label]: true,
                              }),
                            );

                            return;
                          }

                          toggleExpandedItem(item.label);
                        }}
                        className={[
                          "group relative flex w-full items-center",
                          "rounded-xl px-3 py-2.5 text-sm",
                          "transition-colors",
                          collapsed
                            ? "justify-center"
                            : "gap-3",
                          isActive
                            ? "bg-white/10 font-semibold text-white"
                            : "text-slate-300 hover:bg-white/[0.07] hover:text-white",
                        ].join(" ")}
                      >
                        {isActive ? (
                          <span
                            aria-hidden="true"
                            className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-[#ed1b64]"
                          />
                        ) : null}

                        <Icon
                          aria-hidden="true"
                          className={[
                            "h-5 w-5 shrink-0",
                            isActive
                              ? "text-[#ff6c9f]"
                              : "text-slate-300 group-hover:text-white",
                          ].join(" ")}
                        />

                        {!collapsed ? (
                          <>
                            <span className="min-w-0 flex-1 truncate text-left">
                              {item.label}
                            </span>

                            {item.badge !== undefined ? (
                              <span className="rounded-full bg-[#ed1b64] px-2 py-0.5 text-[10px] font-bold text-white">
                                {item.badge}
                              </span>
                            ) : null}

                            <ChevronDown
                              aria-hidden="true"
                              className={[
                                "h-4 w-4 shrink-0 text-slate-400",
                                "transition-transform duration-200",
                                isExpanded
                                  ? "rotate-180"
                                  : "",
                              ].join(" ")}
                            />
                          </>
                        ) : null}
                      </button>

                      {!collapsed && isExpanded ? (
                        <div
                          id={submenuId}
                          className="ml-5 mt-1 space-y-1 border-l border-white/10 pl-4"
                        >
                          {item.children?.map(
                            (child) => {
                              const isChildActive =
                                isRouteActive(
                                  pathname,
                                  child.href,
                                );

                              if (child.disabled) {
                                return (
                                  <div
                                    key={child.href}
                                    aria-disabled="true"
                                    className="flex cursor-not-allowed items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-500 opacity-60"
                                  >
                                    <span className="truncate">
                                      {child.label}
                                    </span>
                                  </div>
                                );
                              }

                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={onNavigate}
                                  aria-current={
                                    isChildActive
                                      ? "page"
                                      : undefined
                                  }
                                  className={[
                                    "flex items-center justify-between gap-3",
                                    "rounded-lg px-3 py-2 text-sm",
                                    "transition-colors",
                                    isChildActive
                                      ? "bg-[#ed1b64]/15 font-medium text-[#ff8fb5]"
                                      : "text-slate-400 hover:bg-white/[0.06] hover:text-white",
                                  ].join(" ")}
                                >
                                  <span className="min-w-0 truncate">
                                    {child.label}
                                  </span>

                                  {child.badge !==
                                  undefined ? (
                                    <span className="rounded-full bg-[#ed1b64] px-2 py-0.5 text-[10px] font-bold text-white">
                                      {child.badge}
                                    </span>
                                  ) : null}
                                </Link>
                              );
                            },
                          )}
                        </div>
                      ) : null}
                    </div>
                  );
                }

                if (!item.href) {
                  return null;
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={
                      collapsed
                        ? item.label
                        : undefined
                    }
                    onClick={onNavigate}
                    aria-current={
                      isActive ? "page" : undefined
                    }
                    className={[
                      "group relative flex items-center",
                      "rounded-xl px-3 py-2.5 text-sm",
                      "transition-colors",
                      collapsed
                        ? "justify-center"
                        : "gap-3",
                      isActive
                        ? "bg-white/10 font-semibold text-white"
                        : "text-slate-300 hover:bg-white/[0.07] hover:text-white",
                    ].join(" ")}
                  >
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-[#ed1b64]"
                      />
                    ) : null}

                    <Icon
                      aria-hidden="true"
                      className={[
                        "h-5 w-5 shrink-0",
                        isActive
                          ? "text-[#ff6c9f]"
                          : "text-slate-300 group-hover:text-white",
                      ].join(" ")}
                    />

                    {!collapsed ? (
                      <>
                        <span className="min-w-0 flex-1 truncate">
                          {item.label}
                        </span>

                        {item.badge !== undefined ? (
                          <span className="rounded-full bg-[#ed1b64] px-2 py-0.5 text-[10px] font-bold text-white">
                            {item.badge}
                          </span>
                        ) : (
                          <ChevronRight
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-slate-500"
                          />
                        )}
                      </>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </nav>

      {/* Sidebar footer */}
      <div
        className={[
          "mt-auto shrink-0 border-t border-white/10 text-slate-400",
          collapsed ? "px-2 py-4" : "px-5 py-4",
        ].join(" ")}
      >
        {collapsed ? (
          <div
            title={`${footerText} · Internal Use Only · ${footerVersion}`}
            className="flex justify-center"
          >
            <span className="text-xs font-semibold">
              ©
            </span>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs">
              {footerText}
            </p>

            <p className="text-[11px] text-slate-500">
              Internal Use Only
              &nbsp;&nbsp;•&nbsp;&nbsp;
              {footerVersion}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}