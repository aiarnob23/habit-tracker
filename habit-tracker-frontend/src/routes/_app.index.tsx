import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useHabits } from "@/hooks/use-habits";
import { useToggleCheckIn } from "@/hooks/use-toggle-checkin";
import { HabitCard } from "@/components/habit/habit-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateHabitDialog } from "@/components/habit/add-habit-dialog";

const dashboardSearchSchema = z.object({
  modal: z.enum(["create-habit"]).optional(),
});

export const Route = createFileRoute("/_app/")({
  validateSearch: dashboardSearchSchema,
  component: DashboardPage,
});

function DashboardPage() {
  const { modal } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const { data: habits, isPending, error } = useHabits();
  const toggleCheckIn = useToggleCheckIn();

  const openCreateModal = () => navigate({ search: { modal: "create-habit" } });
  const closeModal = () => navigate({ search: {} });

  if (isPending) return <div className="p-4 text-muted-foreground">Loading habits...</div>;
  if (error) return <div className="p-4 text-destructive">Failed to load habits.</div>;

  return (
    <div className="grid gap-4 md:grid-cols-1 xl:grid-cols-1">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Habits Overview</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Build consistency, one day at a time. Track your habits and watch your
            streaks grow.
          </p>
        </div>
        <Button
          className="rounded-full cursor-pointer hover:scale-105 px-4 font-semibold"
          onClick={openCreateModal}
        >
          <Plus /> Add Habit
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-1 xl:grid-cols-3">
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

      <CreateHabitDialog
        open={modal === "create-habit"}
        onOpenChange={(open) => !open && closeModal()}
      />
    </div>
  );
}