type AppFooterProps = {
  companyName: string;
  version?: string;
  classification?: string;
};

export function AppFooter({
  companyName,
  version,
  classification = "Internal Use Only",
}: AppFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-12 flex-col items-center justify-between gap-2 border-t bg-white px-4 py-3 text-xs text-slate-500 sm:flex-row sm:px-6">
      <p>
        © {currentYear} {companyName}. All rights reserved.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <span>{classification}</span>

        {version ? (
          <>
            <span aria-hidden="true">•</span>
            <span>Version {version}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}