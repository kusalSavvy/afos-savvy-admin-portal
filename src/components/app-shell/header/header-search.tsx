"use client";

import { type FormEvent, useState } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type HeaderSearchProps = {
  placeholder?: string;
  initialValue?: string;
  shortcutLabel?: string;
  disabled?: boolean;
  onSearch?: (value: string) => void;
  onValueChange?: (value: string) => void;
};

export function HeaderSearch({
  placeholder = "Search users, applications, lenders, and more...",
  initialValue = "",
  shortcutLabel = "⌘ K",
  disabled = false,
  onSearch,
  onValueChange,
}: HeaderSearchProps) {
  const [searchValue, setSearchValue] = useState(initialValue);

  function handleValueChange(value: string) {
    setSearchValue(value);
    onValueChange?.(value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedValue = searchValue.trim();

    if (!normalizedValue) {
      return;
    }

    onSearch?.(normalizedValue);
  }

  function clearSearch() {
    setSearchValue("");
    onValueChange?.("");
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="relative hidden w-full max-w-xl md:block"
    >
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        type="search"
        value={searchValue}
        disabled={disabled}
        placeholder={placeholder}
        aria-label="Search portal"
        onChange={(event) => handleValueChange(event.target.value)}
        className="h-11 rounded-xl border-border bg-background pl-12 pr-24 text-sm text-foreground shadow-none placeholder:text-muted-foreground"
      />

      {searchValue ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Clear search"
          onClick={clearSearch}
          className="absolute right-11 top-1/2 h-8 w-8 -translate-y-1/2 rounded-lg"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </Button>
      ) : null}

      <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border bg-muted px-2 py-1 text-xs text-muted-foreground lg:block">
        {shortcutLabel}
      </span>
    </form>
  );
}