import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HabitService } from "@/services/habit.service";

export function useRestoreHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => HabitService.restoreHabit(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["habit"],
      });
    },
  });
}