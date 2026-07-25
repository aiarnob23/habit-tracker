import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HabitService } from "@/services/habit.service";

export function useToggleCheckIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, done }: { id: string; done: boolean }) =>
      done ? HabitService.markDoneToday(id) : HabitService.unmarkToday(id),

    onMutate: async ({ id, done }) => {
      await queryClient.cancelQueries({ queryKey: ["habits"] });
      const previousHabits = queryClient.getQueryData(["habits"]);

      queryClient.setQueryData(["habits"], (old: any) =>
        old?.map((habit: any) =>
          habit.id.toString() === id
            ? {
                ...habit,
                todayCompleted: done,
                currentStreak: done ? habit.currentStreak + 1 : Math.max(0, habit.currentStreak - 1),
              }
            : habit
        )
      );

      return { previousHabits };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousHabits) {
        queryClient.setQueryData(["habits"], context.previousHabits);
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["habit", variables.id] });
    },
  });
}