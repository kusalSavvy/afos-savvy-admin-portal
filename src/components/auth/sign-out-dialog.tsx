"use client";

import { useEffect } from "react";
import { LogOut, X } from "lucide-react";

import { Button } from "@/components/ui/button";

type SignOutDialogProps = {
  open: boolean;
  isSigningOut?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function SignOutDialog({
  open,
  isSigningOut = false,
  onOpenChange,
  onConfirm,
}: SignOutDialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSigningOut) {
        onOpenChange(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isSigningOut, onOpenChange, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071d3d]/55 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isSigningOut
        ) {
          onOpenChange(false);
        }
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="sign-out-title"
        aria-describedby="sign-out-description"
        className="relative w-full max-w-sm rounded-2xl border border-border bg-background p-6 text-foreground shadow-2xl"
      >
        <button
          type="button"
          aria-label="Close sign out dialog"
          disabled={isSigningOut}
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ed1b64]/10">
            <LogOut
              aria-hidden="true"
              className="h-8 w-8 text-[#ed1b64]"
            />
          </div>

          <h2
            id="sign-out-title"
            className="mt-5 text-xl font-bold"
          >
            Sign out
          </h2>

          <p
            id="sign-out-description"
            className="mt-3 text-sm leading-6 text-muted-foreground"
          >
            Are you sure you want to sign out?
            <br />
            You will need to sign in again to access the portal.
          </p>
        </div>

        <div className="mt-7 flex justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isSigningOut}
            onClick={() => onOpenChange(false)}
            className="min-w-28 rounded-xl"
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={isSigningOut}
            onClick={onConfirm}
            className="min-w-32 gap-2 rounded-xl bg-[#ed1b64] text-white hover:bg-[#cf1556]"
          >
            <LogOut aria-hidden="true" className="h-4 w-4" />

            {isSigningOut ? "Signing out..." : "Sign out"}
          </Button>
        </div>
      </div>
    </div>
  );
}