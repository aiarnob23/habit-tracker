export function toDateOnlyUTC(date: Date | string): Date {
  const d = new Date(date);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

export function toDateKey(date: Date): string {
  return toDateOnlyUTC(date).toISOString().slice(0, 10);
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

export function todayUTC(): Date {
  return toDateOnlyUTC(new Date());
}

export function daysAgoUTC(days: number): Date {
  return addDays(todayUTC(), -days);
}