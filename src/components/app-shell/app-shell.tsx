import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
};

export function AppShell({
  children,
  header,
  sidebar,
  footer,
}: AppShellProps) {
  return (
    <div className="flex min-h-dvh w-full bg-muted/30 text-foreground">
      {sidebar ? (
        <aside className="sticky top-0 hidden h-dvh shrink-0 lg:block">
          {sidebar}
        </aside>
      ) : null}

      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        {header ? (
          <div className="sticky top-0 z-40 shrink-0">
            {header}
          </div>
        ) : null}

        <main className="min-w-0 flex-1">
          {children}
        </main>

        {footer ? (
          <footer className="mt-auto shrink-0">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>
  );
}