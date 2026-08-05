"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Temporary frontend-only login.
    // Replace this with the backend authentication API later.
    localStorage.setItem(
      "afos-admin-session",
      JSON.stringify({
        isAuthenticated: true,
        email: email.trim(),
      }),
    );

    router.replace("/dashboard");
  }

  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      {/* Left panel */}
      <section className="relative hidden overflow-hidden bg-[#071d3d] px-12 py-10 text-white lg:flex lg:flex-col">
        <div className="absolute -right-36 top-0 h-96 w-96 rotate-45 rounded-[90px] bg-white/[0.03]" />
        <div className="absolute -bottom-16 right-[-70px] h-80 w-80 rotate-45 rounded-[80px] bg-[#ed1b64]/10" />

        <div className="relative z-10">
          <div className="inline-flex rounded-2xl bg-white px-8 py-6">
            <Image
              src="/savvy-logo.png"
              alt="Savvy"
              width={110}
              height={42}
              priority
              className="h-auto w-[110px] object-contain"
            />
          </div>
        </div>

        <div className="relative z-10 my-auto max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff4f8d]">
            Administration
          </p>

          <h1 className="mt-5 text-5xl font-bold tracking-tight">
            AFOS Admin Portal
          </h1>

          <div className="mt-7 h-1 w-16 rounded-full bg-[#ed1b64]" />

          <p className="mt-8 max-w-lg text-lg leading-8 text-slate-200">
            Securely manage users, applications and system configuration
            from one central platform.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#ed1b64]/50 bg-[#ed1b64]/10">
            <ShieldCheck className="h-6 w-6 text-[#ff4f8d]" />
          </div>

          <div>
            <p className="font-semibold">
              Secure administrator access
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Protected access for authorised users
            </p>
          </div>
        </div>
      </section>

      {/* Login form */}
      <section className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-14 flex justify-center">
            <Image
              src="/savvy-logo.png"
              alt="Savvy"
              width={90}
              height={36}
              priority
              className="h-auto w-[90px] object-contain"
            />
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            Welcome back
          </h2>

          <p className="mt-3 text-muted-foreground">
            Sign in to access the AFOS Admin Portal.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-foreground"
              >
                Email address
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  value={email}
                  required
                  autoComplete="email"
                  placeholder="name@company.com"
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-12 rounded-xl pl-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-foreground"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 rounded-xl pl-12 pr-12"
                />

                <button
                  type="button"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border"
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-[#ed1b64]"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-xl bg-[#ed1b64] font-semibold text-white hover:bg-[#cf1556]"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            <div className="h-px flex-1 bg-border" />
          </div>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Secure administrator access
          </p>

          <p className="mt-10 text-center text-xs text-muted-foreground">
            © 2026 Savvy. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}