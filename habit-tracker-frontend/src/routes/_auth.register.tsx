import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { registerSchema, type RegisterFormValues } from "@/lib/validations/auth.schema";
import { useRegister } from "@/hooks/use-register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { authStyles } from "@/lib/validations/styles/auth.styles";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const registerUser = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (values: RegisterFormValues) => {
    const { confirmPassword, ...payload } = values;
    registerUser.mutate(payload);
  };

  const serverError = isAxiosError(registerUser.error)
    ? registerUser.error.response?.data?.message ?? "Registration failed. Please try again."
    : null;

  return (
    <Card className={authStyles.card}>
      <div className="mb-8">
        <h1 className={authStyles.title}>Create an account</h1>

        <p className={authStyles.subtitle}>
          Start tracking your habits
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className={authStyles.label}
            >
              First name
            </Label>

            <Input
              id="firstName"
              placeholder="Aminul Islam"
              className={authStyles.input}
              {...register("firstName")}
            />

            {errors.firstName && (
              <p className="text-sm text-red-300">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className={authStyles.label}
            >
              Last name
            </Label>

            <Input
              id="lastName"
              placeholder="Arnob"
              className={authStyles.input}
              {...register("lastName")}
            />

            {errors.lastName && (
              <p className="text-sm text-red-300">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className={authStyles.label}
          >
            Email
          </Label>

          <Input
            id="email"
            type="email"
            placeholder="test@exmple.com"
            className={authStyles.input}
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-red-300">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className={authStyles.label}>
            Password
          </Label>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`${authStyles.input} pr-10`}
              {...register("password")}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-red-300">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className={authStyles.label}>
            Confirm password
          </Label>

          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`${authStyles.input} pr-10`}
              {...register("confirmPassword")}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-sm text-red-300">
              {errors.confirmPassword.message}
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
          disabled={registerUser.isPending}
          className={authStyles.button}
        >
          {registerUser.isPending
            ? "Creating account..."
            : "Create account"}
        </Button>
      </form>

      <p className={authStyles.footer}>
        Already have an account?{" "}
        <Link
          to="/login"
          className={authStyles.footerLink}
        >
          Sign in
        </Link>
      </p>
    </Card>
  );
}