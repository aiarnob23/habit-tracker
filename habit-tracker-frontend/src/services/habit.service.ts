import type {
  CreateHabitPayload,
  HabitDetail,
  HabitListItem,
  UpdateHabitPayload,
} from "@/layouts/habit.types";
import { api } from "@/lib/axios";

export const HabitService = {
  // Fetch all habits.
  async getHabits(): Promise<HabitListItem[]> {
    const { data } = await api.get<HabitListItem[]>("/habits");
    return data;
  },

  // Fetch a habit with its details.
  async getHabit(id: string, days = 90): Promise<HabitDetail> {
    const { data } = await api.get<HabitDetail>(`/habits/${id}`, {
      params: { days },
    });
    return data;
  },

  // Create a new habit.
  async createHabit(
    payload: CreateHabitPayload
  ): Promise<HabitListItem> {
    const { data } = await api.post<HabitListItem>("/habits", payload);
    return data;
  },

  // Update an existing habit.
  async updateHabit(
    id: string,
    payload: UpdateHabitPayload
  ): Promise<HabitListItem> {
    const { data } = await api.patch<HabitListItem>(
      `/habits/${id}`,
      payload
    );
    return data;
  },

  // Archive a habit.
  async archiveHabit(id: string): Promise<HabitListItem> {
    const { data } = await api.delete<HabitListItem>(`/habits/${id}`);
    return data;
  },

  // Mark today's check-in.
  async markDoneToday(id: string) {
    const { data } = await api.put(`/habits/${id}/checkins/today`);
    return data;
  },

  // Remove today's check-in.
  async unmarkToday(id: string) {
    const { data } = await api.delete(`/habits/${id}/checkins/today`);
    return data;
  },

  // Fetch recent check-ins.
  async getCheckIns(id: string, days = 90): Promise<string[]> {
    const { data } = await api.get<string[]>(`/habits/${id}/checkins`, {
      params: { days },
    });
    return data;
  },
};