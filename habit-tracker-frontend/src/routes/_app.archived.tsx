import { createFileRoute } from "@tanstack/react-router";
import { useArchivedHabits } from "@/hooks/use-archived-habits";
import { ArchivedHabitCard } from "@/components/habit/habit-archived-card";

export const Route = createFileRoute("/_app/archived")({
  component: ArchivedPage,
});

function ArchivedPage() {
  const { data, isPending, error } = useArchivedHabits();

  if (isPending) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            Archived Habits
          </h1>
          <p className="mt-1 text-muted-foreground">
            Restore habits or permanently delete them.
          </p>
        </div>

        <div className="rounded-2xl border-2 border-white/20 bg-habitcard p-10 text-center">
          Loading archived habits...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            Archived Habits
          </h1>
          <p className="mt-1 text-muted-foreground">
            Restore habits or permanently delete them.
          </p>
        </div>

        <div className="rounded-2xl border-2 border-white/20 bg-habitcard p-10 text-center text-destructive">
          Failed to load archived habits.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Archived Habits
        </h1>

        <p className="mt-1 text-muted-foreground">
          Restore habits or permanently delete them.
        </p>
      </div>

      {data?.length === 0 ? (
        <div className="rounded-2xl border-2 border-white/20 bg-habitcard/30 p-12 text-center">
          <p className="text-lg font-medium">
            No archived habits.
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Archived habits will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {data.map((habit) => (
            <ArchivedHabitCard
              key={habit.id}
              habit={habit}
            />
          ))}
        </div>
      )}
    </div>
  );
}