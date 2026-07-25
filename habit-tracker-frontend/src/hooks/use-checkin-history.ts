import { useQuery } from "@tanstack/react-query";
import { HabitService } from "@/services/habit.service";

export function useCheckInsHistory(id: string, days = 90) {
  return useQuery({
    queryKey: ["checkins", id, days],
    queryFn: () => HabitService.getCheckIns(id, days),
    enabled: !!id,
  });
}