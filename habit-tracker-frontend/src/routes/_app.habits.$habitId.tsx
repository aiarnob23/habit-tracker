import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Flame, Palette, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { HabitHeatmap } from "@/components/habit/habit-heatmap";
import { EditHabitDialog } from "@/components/habit/dialogs/edit-habit-dialog";

import { useHabit } from "@/hooks/use-habit";
import { useArchiveHabit } from "@/hooks/use-archive-habit";
import { useRestoreHabit } from "@/hooks/use-restore-habit";

export const Route = createFileRoute("/_app/habits/$habitId")({
  component: HabitDetailsPage,
});

function HabitDetailsPage() {
  const { habitId } = Route.useParams();

  const { data: habit, isPending, isError } = useHabit(habitId);

  const archiveHabit = useArchiveHabit();
  const restoreHabit = useRestoreHabit();

  // Loading State - Updated with glassmorphism placeholders
  if (isPending) {
    return (
      <div className="container mx-auto max-w-5xl space-y-6 py-8">
        <div className="h-10 w-28 animate-pulse rounded-xl bg-white/10" />

        <Card className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,.45)]">
          <CardContent className="space-y-6 p-8">
            <div className="h-10 w-64 animate-pulse rounded-xl bg-white/10" />
            <div className="h-4 w-full animate-pulse rounded-lg bg-white/5" />
            <div className="h-4 w-2/3 animate-pulse rounded-lg bg-white/5" />

            <div className="grid gap-4 pt-6 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-2xl bg-white/5 border border-white/10"
                />
              ))}
            </div>

            <div className="mt-6 h-56 animate-pulse rounded-2xl bg-white/5 border border-white/10" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error State - Updated for dark theme
  if (isError || !habit) {
    return (
      <div className="container mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center gap-4 text-white">
        <h2 className="text-3xl font-bold tracking-tight">Habit not found</h2>

        <p className="text-slate-300">
          The requested habit could not be loaded.
        </p>

        <Button
          className="mt-4 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/20 text-white backdrop-blur-md"
        >
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Habits
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl space-y-6 py-8 text-white">
      {/* Navigate back */}
      <Button
        variant="ghost"
        className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
      >
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>

      {/* Main Glassmorphism Card */}
      <Card className="rounded-3xl border border-white/15 bg-white/10 text-white backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,.45)]">
        <CardHeader className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between p-8">
          <div className="space-y-4">
            <div>
              <CardTitle className="text-3xl font-bold tracking-tight">
                {habit.title}
              </CardTitle>

              {habit.description && (
                <p className="mt-2 max-w-2xl text-slate-300">
                  {habit.description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                className={`border-white/20 ${
                  habit.status === "ACTIVE"
                    ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                {habit.status}
              </Badge>

              {habit.color && (
                <Badge className="bg-white/5 border-white/10 text-slate-200 hover:bg-white/10">
                  <Palette
                    className="mr-2 h-3 w-3"
                    style={{ color: habit.color }}
                  />
                  {habit.color}
                </Badge>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <EditHabitDialog habit={habit} />
            
            {habit.status === "ACTIVE" ? (
              <Button
                disabled={archiveHabit.isPending}
                onClick={() => archiveHabit.mutate(habit.id)}
                className="rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                Archive
              </Button>
            ) : (
              <Button
                disabled={restoreHabit.isPending}
                onClick={() => restoreHabit.mutate(habit.id.toString())}
                className="rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                Restore
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-8 px-8 pb-8">
          {/* Statistics Grid - Nested Glass Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-md shadow-none">
              <CardContent className="flex items-center gap-4 p-5">
                <Flame className="h-10 w-10 text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.5)]" />
                <div>
                  <p className="text-sm text-slate-400">Current Streak</p>
                  <p className="text-2xl font-bold">{habit.currentStreak}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-md shadow-none">
              <CardContent className="flex items-center gap-4 p-5">
                <Trophy className="h-10 w-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                <div>
                  <p className="text-sm text-slate-400">Longest Streak</p>
                  <p className="text-2xl font-bold">{habit.longestStreak}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-md shadow-none">
              <CardContent className="flex items-center gap-4 p-5">
                <Calendar className="h-10 w-10 text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
                <div>
                  <p className="text-sm text-slate-400">Created</p>
                  <p className="font-semibold text-slate-200">
                    {new Date(habit.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Heatmap Section - Nested Glass Card */}
          <Card className="rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-md shadow-none">
            <CardHeader>
              <CardTitle className="text-lg font-semibold tracking-tight">
                Activity (Last 90 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Note: Ensure your HabitHeatmap component uses dark/transparent colors internally too! */}
              <HabitHeatmap checkIns={habit.checkIns} weeksCount={13} />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}