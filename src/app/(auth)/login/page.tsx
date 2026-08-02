"use client";

import Image from "next/image";
import { type FormEvent, useState } from "react";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginFormErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [formMessage, setFormMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const nextErrors: LoginFormErrors = {};

    if (!email) {
      nextErrors.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Enter your password.";
    } else if (password.length < 8) {
      nextErrors.password =
        "Your password must contain at least 8 characters.";
    }

    setErrors(nextErrors);
    setFormMessage("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Temporary UI-only delay.
      // Replace this with the backend authentication request later.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFormMessage(
        "Login form validated successfully. Backend authentication is not connected yet.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function clearEmailError() {
    setErrors((currentErrors) => ({
      ...currentErrors,
      email: undefined,
    }));

    setFormMessage("");
  }

  function clearPasswordError() {
    setErrors((currentErrors) => ({
      ...currentErrors,
      password: undefined,
    }));

    setFormMessage("");
  }

  return (
    <main className="min-h-dvh w-full bg-white text-slate-950">
      <div className="grid min-h-dvh w-full grid-cols-1 lg:grid-cols-[42%_58%]">
        {/* Desktop branding panel */}
        <aside className="relative hidden min-h-dvh overflow-hidden bg-[#071d3d] px-10 py-10 text-white lg:flex lg:flex-col xl:px-14 xl:py-12">
          {/* Decorative shapes */}
          <div
            aria-hidden="true"
            className="absolute -right-32 top-8 h-80 w-80 rotate-45 rounded-[5rem] bg-white/[0.04]"
          />

          <div
            aria-hidden="true"
            className="absolute -right-20 bottom-20 h-72 w-72 rotate-45 rounded-[5rem] bg-[#ed1b64]/10"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-40 left-10 h-32 w-40 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ed1b64 1.5px, transparent 1.5px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex h-20 w-48 items-center justify-center rounded-2xl bg-white px-5 shadow-lg">
              <Image
                src="/savvy-logo.png"
                alt="Savvy"
                width={200}
                height={100}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          {/* Branding content */}
          <div className="relative z-10 my-auto max-w-lg">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#ff5b94]">
              Administration
            </p>

            <h1 className="text-4xl font-bold tracking-tight xl:text-5xl">
              AFOS Admin Portal
            </h1>

            <div className="my-7 h-1 w-16 rounded-full bg-[#ed1b64]" />

            <p className="max-w-md text-lg leading-8 text-slate-300">
              Securely manage users, applications and system configuration from
              one central platform.
            </p>
          </div>

          {/* Security information */}
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-[#ed1b64]/40 bg-[#ed1b64]/10">
              <ShieldCheck
                aria-hidden="true"
                className="h-7 w-7 text-[#ff5b94]"
              />
            </div>

            <div>
              <p className="font-semibold">Secure administrator access</p>

              <p className="mt-1 text-sm text-slate-400">
                Protected access for authorised users
              </p>
            </div>
          </div>
        </aside>

        {/* Login section */}
        <section className="flex min-h-dvh w-full items-center justify-center overflow-y-auto px-5 py-8 sm:px-8 lg:px-12 xl:px-20">
          <div className="w-full max-w-[460px]">
            {/* Form logo */}
            <div className="mb-8 flex justify-center lg:justify-start">
              <div className="flex h-20 w-44 items-center justify-center bg-white px-2">
                <Image
                  src="/savvy-logo.png"
                  alt="Savvy"
                  width={200}
                  height={100}
                  priority
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            {/* Form heading */}
            <div className="mb-8 text-center lg:text-left">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ed1b64] lg:hidden">
                AFOS Admin Portal
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Welcome back
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                Sign in to access the AFOS Admin Portal.
              </p>
            </div>

            {/* Login form */}
            <form
              noValidate
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-800"
                >
                  Email address
                </Label>

                <div className="relative">
                  <Mail
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="name@company.com"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "email-error" : undefined
                    }
                    onChange={clearEmailError}
                    className={[
                      "h-12 rounded-lg border-slate-300 bg-white pl-12 text-base",
                      "placeholder:text-slate-400",
                      "focus-visible:border-[#ed1b64] focus-visible:ring-[#ed1b64]/20",
                      errors.email
                        ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                        : "",
                    ].join(" ")}
                  />
                </div>

                {errors.email ? (
                  <p
                    id="email-error"
                    role="alert"
                    className="text-sm font-medium text-red-600"
                  >
                    {errors.email}
                  </p>
                ) : null}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-800"
                >
                  Password
                </Label>

                <div className="relative">
                  <LockKeyhole
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    onChange={clearPasswordError}
                    className={[
                      "h-12 rounded-lg border-slate-300 bg-white px-12 text-base",
                      "placeholder:text-slate-400",
                      "focus-visible:border-[#ed1b64] focus-visible:ring-[#ed1b64]/20",
                      errors.password
                        ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                        : "",
                    ].join(" ")}
                  />

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() =>
                      setShowPassword((currentValue) => !currentValue)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ed1b64]/40 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    ) : (
                      <Eye
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    )}
                  </button>
                </div>

                {errors.password ? (
                  <p
                    id="password-error"
                    role="alert"
                    className="text-sm font-medium text-red-600"
                  >
                    {errors.password}
                  </p>
                ) : null}
              </div>

              {/* Remember and forgot password */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    disabled={isSubmitting}
                    className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-[#ed1b64] disabled:cursor-not-allowed"
                  />

                  <Label
                    htmlFor="remember-me"
                    className="cursor-pointer text-sm font-normal text-slate-700"
                  >
                    Remember me
                  </Label>
                </div>

                <span
                  aria-disabled="true"
                  title="Forgot password is not available yet"
                  className="cursor-not-allowed text-sm font-medium text-slate-400"
                >
                  Forgot password?
                </span>
              </div>

              {/* UI-only success message */}
              {formMessage ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800"
                >
                  {formMessage}
                </div>
              ) : null}

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-lg bg-[#ed1b64] text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#cf1556] focus-visible:ring-[#ed1b64]/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle
                      aria-hidden="true"
                      className="mr-2 h-5 w-5 animate-spin"
                    />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            {/* Security divider */}
            <div className="mt-9 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <ShieldCheck
                aria-hidden="true"
                className="h-5 w-5 text-slate-400"
              />

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="mt-4 text-center text-sm text-slate-500">
              Secure administrator access
            </p>

            <p className="mt-10 text-center text-xs text-slate-400">
              © {new Date().getFullYear()} Savvy. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}