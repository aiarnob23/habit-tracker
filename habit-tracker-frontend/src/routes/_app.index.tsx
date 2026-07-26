import { createFileRoute } from "@tanstack/react-router";
import { useHabits } from "@/hooks/use-habits";
import { useToggleCheckIn } from "@/hooks/use-toggle-checkin";
import { HabitCard } from "@/components/habit/habit-card";

export const Route = createFileRoute("/_app/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { data: habits, isPending, error } = useHabits();
  const toggleCheckIn = useToggleCheckIn();
  console.log(habits);

  if (isPending) return <div className="p-4 text-muted-foreground">Loading habits...</div>;
  if (error) return <div className="p-4 text-destructive">Failed to load habits.</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggleToday={(id, next) =>
            toggleCheckIn.mutate({ id: id.toString(), done: next })
          }
        />
      ))}
    </div>
  );
}