import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HabitService } from "@/services/habit.service";
import { getTodayUTCKey } from "@/lib/heatmap";
import type { HabitListItem } from "@/types/habit.types";

export function useToggleCheckIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, done }: { id: string; done: boolean }) =>
      done ? HabitService.markDoneToday(id) : HabitService.unmarkToday(id),

    onMutate: async ({ id, done }) => {
      await queryClient.cancelQueries({ queryKey: ["habits"] });
      const previousHabits = queryClient.getQueryData<HabitListItem[]>(["habits"]);
      const todayKey = getTodayUTCKey();

      queryClient.setQueryData<HabitListItem[]>(["habits"], (old) =>
        old?.map((habit) => {
          if (habit.id.toString() !== id) return habit;

          const checkIns = done
            ? Array.from(new Set([...habit.checkIns, todayKey]))
            : habit.checkIns.filter((d) => d !== todayKey);

          return {
            ...habit,
            todayCompleted: done,
            checkIns,
            currentStreak: done
              ? habit.currentStreak + 1
              : Math.max(0, habit.currentStreak - 1),
          };
        })
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