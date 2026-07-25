import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HabitService } from "@/services/habit.service";
import type { UpdateHabitPayload } from "@/types/habit.types";

export function useUpdateHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateHabitPayload }) =>
      HabitService.updateHabit(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["habit", variables.id] });
    },
  });
}