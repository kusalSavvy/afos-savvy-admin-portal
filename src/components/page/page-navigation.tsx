import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type PageNavigationItem = {
  label: string;
  href?: string;
};

type PageNavigationProps = {
  items: PageNavigationItem[];
};

export function PageNavigation({
  items,
}: PageNavigationProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-2"
            >
              {item.href && !isLastItem ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLastItem ? "page" : undefined}
                  className={
                    isLastItem
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }
                >
                  {item.label}
                </span>
              )}

              {!isLastItem ? (
                <ChevronRight
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}