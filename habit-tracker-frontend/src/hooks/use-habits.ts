import { useQuery } from "@tanstack/react-query";
import { HabitService } from "@/services/habit.service";

export function useHabits() {
  return useQuery({
    queryKey: ["habits"],
    queryFn: HabitService.getHabits,
  });
}