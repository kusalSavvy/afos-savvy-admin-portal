import { Skeleton } from "@/components/ui/skeleton";

type DataTableSkeletonProps = {
  columnCount?: number;
  rowCount?: number;
};

export function DataTableSkeleton({
  columnCount = 5,
  rowCount = 8,
}: DataTableSkeletonProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-10 w-full max-w-sm" />
        <Skeleton className="h-10 w-28" />
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">
        <div
          className="grid gap-4 border-b bg-slate-50 px-4 py-4"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(120px, 1fr))`,
          }}
        >
          {Array.from({ length: columnCount }).map((_, index) => (
            <Skeleton
              key={`header-${index + 1}`}
              className="h-4 w-24"
            />
          ))}
        </div>

        {Array.from({ length: rowCount }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex + 1}`}
            className="grid gap-4 border-b px-4 py-4 last:border-b-0"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, minmax(120px, 1fr))`,
            }}
          >
            {Array.from({ length: columnCount }).map(
              (_, columnIndex) => (
                <Skeleton
                  key={`cell-${rowIndex + 1}-${columnIndex + 1}`}
                  className="h-4 w-full max-w-32"
                />
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}