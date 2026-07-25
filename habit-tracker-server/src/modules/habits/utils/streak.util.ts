import { toDateKey, addDays, todayUTC } from './date.util';

export interface StreakResult {
  currentStreak: number;
  longestStreak: number;
}

export function computeStreaks(checkInDates: Date[]): StreakResult {
  if (checkInDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const dateSet = new Set(checkInDates.map((d) => toDateKey(d)));
  const sortedKeys = Array.from(dateSet).sort();

  let longestStreak = 1;
  let run = 1;
  for (let i = 1; i < sortedKeys.length; i++) {
    const prev = new Date(sortedKeys[i - 1]);
    const curr = new Date(sortedKeys[i]);
    const diffDays = Math.round((curr.getTime() - prev.getTime()) / 86_400_000);
    run = diffDays === 1 ? run + 1 : 1;
    longestStreak = Math.max(longestStreak, run);
  }

  const today = toDateKey(todayUTC());
  const yesterday = toDateKey(addDays(todayUTC(), -1));

  let cursor: Date;
  if (dateSet.has(today)) {
    cursor = todayUTC();
  } else if (dateSet.has(yesterday)) {
    cursor = addDays(todayUTC(), -1);
  } else {
    return { currentStreak: 0, longestStreak };
  }

  let currentStreak = 0;
  while (dateSet.has(toDateKey(cursor))) {
    currentStreak++;
    cursor = addDays(cursor, -1);
  }

  return { currentStreak, longestStreak };
}