import { useState } from "react";
import { isAxiosError } from "axios";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/validations/auth.schema";

import { useLogin } from "@/hooks/use-login";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authStyles } from "@/lib/validations/styles/auth.styles";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const login = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginFormValues) => {
    login.mutate(values);
  };

  const serverError = isAxiosError(login.error)
    ? login.error.response?.data?.message ??
      "Login failed. Please try again."
    : null;

  return (
    <Card className={authStyles.card}>
      <div className="mb-8">
        <h1 className={authStyles.title}>Welcome back</h1>

        <p className={authStyles.subtitle}>
          Sign in to your account
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Email */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className={authStyles.label}
          >
            Email
          </Label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`${authStyles.input} pl-10`}
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className="text-sm text-red-300">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className={authStyles.label}
          >
            Password
          </Label>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`${authStyles.input} pl-10 pr-10`}
              {...register("password")}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition-colors hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-red-300">
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          <div className={authStyles.error}>
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          disabled={login.isPending}
          className={`${authStyles.button} cursor-pointer`}
        >
          {login.isPending
            ? "Signing in..."
            : "Sign in"}
        </Button>
      </form>

      <p className={authStyles.footer}>
        Don't have an account?{" "}
        <Link
          to="/register"
          className={authStyles.footerLink}
        >
          Register
        </Link>
      </p>
    </Card>
  );
}