import { createFileRoute } from "@tanstack/react-router";
import { useArchivedHabits } from "@/hooks/use-archived-habits";
import { ArchivedHabitCard } from "@/components/habit/habit-archived-card";

export const Route = createFileRoute("/_app/archived")({
  component: ArchivedPage,
});

function ArchivedPage() {
  const { data, isPending, error } = useArchivedHabits();

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Failed to load archived habits.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Archived Habits
        </h1>

        <p className="text-muted-foreground">
          Restore habits or permanently delete them.
        </p>
      </div>

      {data?.length === 0 && (
        <div className="rounded-xl border p-10 text-center">
          No archived habits.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {data?.map((habit) => (
          <ArchivedHabitCard
            key={habit.id}
            habit={habit}
          />
        ))}
      </div>
    </div>
  );
}