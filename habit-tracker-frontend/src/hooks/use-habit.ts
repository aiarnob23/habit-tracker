import { useQuery } from "@tanstack/react-query";
import { HabitService } from "@/services/habit.service";

export function useHabit(id: string, days = 90) {
  return useQuery({
    queryKey: ["habit", id, days],
    queryFn: () => HabitService.getHabit(id, days),
    enabled: !!id,
  });
}