import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HabitService } from "@/services/habit.service";

export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => HabitService.deleteHabit(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["archived-habits"],
      });
    },
  });
}