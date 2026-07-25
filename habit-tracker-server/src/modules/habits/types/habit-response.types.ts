export interface HabitListItem {
  id: number;
  title: string;
  description: string | null;
  color: string | null;
  status: 'ACTIVE' | 'ARCHIVED';
  todayCompleted: boolean;
  currentStreak: number;
}

export interface HabitDetail {
  id: number;
  title: string;
  description: string | null;
  color: string | null;
  status: 'ACTIVE' | 'ARCHIVED';
  createdAt: Date;
  currentStreak: number;
  longestStreak: number;
  checkIns: string[]; 
}