import { Inbox } from "lucide-react";

type DataTableEmptyProps = {
  title?: string;
  description?: string;
};

export function DataTableEmpty({
  title = "No records found",
  description = "There are no records available to display.",
}: DataTableEmptyProps) {
  return (
    <div className="flex h-full min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
        <Inbox
          aria-hidden="true"
          className="h-7 w-7 text-slate-400"
        />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}