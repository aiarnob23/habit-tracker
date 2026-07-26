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
  // Retrieve the habit identifier from the route.
  const { habitId } = Route.useParams();

  // Fetch the habit details.
  const { data: habit, isPending, isError } = useHabit(habitId);

  const archiveHabit = useArchiveHabit();
  const restoreHabit = useRestoreHabit();
  // Display a loading placeholder while fetching data.
  if (isPending) {
    return (
      <div className="container mx-auto max-w-5xl space-y-6 py-8">
        <div className="h-8 w-40 animate-pulse rounded bg-muted" />

        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="h-8 w-64 animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />

            <div className="grid gap-4 pt-6 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>

            <div className="mt-6 h-56 animate-pulse rounded-xl bg-muted" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Display an error message when the request fails.
  if (isError || !habit) {
    return (
      <div className="container mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold">
          Habit not found
        </h2>

        <p className="text-muted-foreground">
          The requested habit could not be loaded.
        </p>

        <Button>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Habits
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl space-y-6 py-8">
      {/* Navigate back to the habit list. */}
      <Button
        variant="ghost"
      >
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>

      <Card>
        <CardHeader className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <div>
              <CardTitle className="text-3xl">
                {habit.title}
              </CardTitle>

              {habit.description && (
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  {habit.description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant={
                  habit.status === "ACTIVE"
                    ? "default"
                    : "secondary"
                }
              >
                {habit.status}
              </Badge>

              {habit.color && (
                <Badge variant="outline">
                  <Palette
                    className="mr-1 h-3 w-3"
                    style={{
                      color: habit.color,
                    }}
                  />
                  {habit.color}
                </Badge>
              )}
            </div>
          </div>

          {/* Display available actions for the habit. */}
          <div className="flex flex-wrap gap-2">
            <EditHabitDialog habit={habit} />
                        {habit.status === "ACTIVE" ? (
              <Button
                variant="secondary"
                disabled={archiveHabit.isPending}
                onClick={() =>
                  archiveHabit.mutate(habit.id)
                }
              >
                Archive
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  disabled={restoreHabit.isPending}
                  onClick={() =>
                    restoreHabit.mutate(habit.id.toString())
                  }
                >
                  Restore
                </Button>
              </>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Display the habit statistics. */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <Flame className="h-10 w-10 text-orange-500" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Current Streak
                  </p>

                  <p className="text-2xl font-bold">
                    {habit.currentStreak}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <Trophy className="h-10 w-10 text-yellow-500" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Longest Streak
                  </p>

                  <p className="text-2xl font-bold">
                    {habit.longestStreak}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <Calendar className="h-10 w-10 text-sky-500" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Created
                  </p>

                  <p className="font-semibold">
                    {new Date(
                      habit.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Render the recent activity heatmap. */}
          <Card>
            <CardHeader>
              <CardTitle>
                Activity (Last 90 Days)
              </CardTitle>
            </CardHeader>

            <CardContent>
              <HabitHeatmap
                checkIns={habit.checkIns}
                weeksCount={13}
              />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}