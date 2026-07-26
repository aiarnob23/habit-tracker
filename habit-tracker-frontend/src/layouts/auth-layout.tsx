import type { ReactNode } from 'react'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/5 items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-3">Habit Tracker</h1>
          <p className="text-muted-foreground">
            Build consistency, one day at a time. Track your habits and watch
            your streaks grow.
          </p>
        </div>
      </div>

      {/* right side */}
      <div className="flex flex-1 items-center justify-center p-4 bg-muted/30">
        {children}
      </div>
    </div>
  )
}