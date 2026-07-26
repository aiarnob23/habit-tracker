import type { ReactNode } from "react";

export function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#07172e] text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-[130px]" />

        <div className="absolute right-0 top-20 h-[380px] w-[380px] rounded-full bg-indigo-500/20 blur-[140px]" />

        <div className="absolute bottom-0 right-40 h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-[120px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.08),transparent_35%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />
      </div>

      {/* Left */}
      <div className="relative hidden w-1/2 lg:flex items-center justify-center px-20">
        <div className="max-w-md">
          <h1 className="text-9xl font-black leading-none tracking-tight">
            Habit
            <br />
            Tracker
          </h1>

          <p className="mt-8 text-lg leading-8 text-slate-300">
            Build consistency, one day at a time.
            Track your habits and watch your
            streaks grow.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="relative flex flex-1 items-center justify-center px-6">
        {children}
      </div>
    </div>
  );
}