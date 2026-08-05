import type { ReactNode } from "react";

import {
  type BreadcrumbItem,
  PageBreadcrumb,
} from "@/components/page/page-breadcrumb";

type PageHeadingProps = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
};

export function PageHeading({
  title,
  description,
  breadcrumbs = [],
  actions,
}: PageHeadingProps) {
  return (
    <section className="border-b border-border bg-background">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {breadcrumbs.length > 0 ? (
          <PageBreadcrumb items={breadcrumbs} />
        ) : null}

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {title}
            </h1>

            {description ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>

          {actions ? (
            <div className="shrink-0">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}