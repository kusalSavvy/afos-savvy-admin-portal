import type { ReactNode } from "react";

import {
  PageNavigation,
  type PageNavigationItem,
} from "@/components/page/page-navigation";

type PageTopBarProps = {
  title: string;
  navigation?: PageNavigationItem[];
  actions?: ReactNode;
};

export function PageTopBar({
  title,
  navigation = [],
  actions,
}: PageTopBarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-4">
        {navigation.length > 0 ? (
          <PageNavigation items={navigation} />
        ) : null}

        {actions}
      </div>
    </div>
  );
}