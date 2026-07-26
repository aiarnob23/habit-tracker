import { useQuery } from "@tanstack/react-query";
import { HabitService } from "@/services/habit.service";

export function useArchivedHabits() {
  return useQuery({
    queryKey: ["archived-habits"],
    queryFn: HabitService.getArchivedHabits,
  });
}