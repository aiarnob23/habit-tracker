export type HabitStatus = "ACTIVE" | "ARCHIVED";

export interface HabitListItem {
  id: number;
  title: string;
  description: string | null;
  color: string | null;
  status: HabitStatus;
  todayCompleted: boolean;
  currentStreak: number;
}

export interface HabitDetail {
  id: number;
  title: string;
  description: string | null;
  color: string | null;
  status: HabitStatus;
  createdAt: string;
  currentStreak: number;
  longestStreak: number;
  checkIns: string[]; // 'YYYY-MM-DD'
}

export interface CreateHabitPayload {
  title: string;
  description?: string;
  color?: string;
}

export interface UpdateHabitPayload extends Partial<CreateHabitPayload> {
  status?: HabitStatus;
}