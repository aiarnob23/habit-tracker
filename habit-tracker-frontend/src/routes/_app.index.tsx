import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { HabitCard } from "@/components/habit/habit-card";

export const Route = createFileRoute("/_app/")({
  component: DashboardPage,
});

const habits = [
  {
    id: 1,
    title: "Read 20 Minutes",
    description: "Read any book for at least 20 minutes",
    currentStreak: 12,
    longestStreak: 30,
    todayCompleted: true,
    checkIns: [
      "2026-07-20",
      "2026-07-21",
      "2026-07-22",
      "2026-07-23",
      "2026-07-24",
      "2026-07-25",
    ],
  },
  {
    id: 2,
    title: "Workout",
    description: "Morning workout",
    currentStreak: 5,
    longestStreak: 15,
    todayCompleted: false,
    checkIns: [
      "2026-07-18",
      "2026-07-19",
      "2026-07-21",
      "2026-07-23",
    ],
  },
  {
    id: 3,
    title: "Meditation",
    description: "10 minutes mindfulness",
    currentStreak: 18,
    longestStreak: 45,
    todayCompleted: true,
    checkIns: [
      "2026-07-10",
      "2026-07-11",
      "2026-07-12",
      "2026-07-13",
      "2026-07-14",
      "2026-07-15",
      "2026-07-16",
      "2026-07-17",
      "2026-07-18",
      "2026-07-19",
    ],
  },
];

function DashboardPage() {
  const handleToggleToday = (habitId: number, nextValue: boolean) => {
    console.log("Habit:", habitId, "Completed:", nextValue);

    // Later:
    // markDoneMutation.mutate(...)
    // unmarkDoneMutation.mutate(...)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">
            Track your daily habits and maintain your streaks.
          </p>
        </div>

        <Button>Create Habit</Button>
      </div>

      {/* Habit Cards */}
      <div className="space-y-4">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggleToday={handleToggleToday}
          />
        ))}
      </div>
    </div>
  );
}