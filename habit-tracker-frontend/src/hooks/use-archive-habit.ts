import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HabitService } from "@/services/habit.service";

export function useArchiveHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => HabitService.archiveHabit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["archived-habits"],
      })

      queryClient.invalidateQueries({
        queryKey: ["habit"],
      });
    }
  });
}