import type { ReactNode } from "react";

type PageContentProps = {
  children: ReactNode;
};

export function PageContent({
  children,
}: PageContentProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-muted/30">
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}