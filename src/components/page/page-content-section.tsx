import type { ReactNode } from "react";

type PageContentSectionProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function PageContentSection({
  title,
  description,
  children,
  actions,
}: PageContentSectionProps) {
  const hasHeader = title || description || actions;

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm">
      {hasHeader ? (
        <div className="flex flex-col gap-3 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title ? (
              <h2 className="text-xl font-semibold text-foreground">
                {title}
              </h2>
            ) : null}

            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>

          {actions}
        </div>
      ) : null}

      <div className="p-6">
        {children}
      </div>
    </section>
  );
}