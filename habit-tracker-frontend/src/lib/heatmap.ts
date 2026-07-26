export interface HeatmapCell {
  date: Date
  dateKey: string
  completed: boolean
}

// All date math stays in UTC
function toUTCDateKey(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function todayUTC(): Date {
  const now = new Date()
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
}

export function buildHeatmapGrid(
  checkInDates: string[],
  weeksCount = 13,
): (HeatmapCell | null)[][] {
  const completedSet = new Set(checkInDates)
  const today = todayUTC()

  const start = new Date(today)
  start.setUTCDate(start.getUTCDate() - (weeksCount - 1) * 7)
  start.setUTCDate(start.getUTCDate() - start.getUTCDay())

  const daysFromStartToToday = Math.floor(
    (today.getTime() - start.getTime()) / 86_400_000
  )
  const actualWeeksCount = Math.ceil((daysFromStartToToday + 1) / 7)

  const weeks: (HeatmapCell | null)[][] = []
  const cursor = new Date(start)

  for (let w = 0; w < actualWeeksCount; w++) {
    const week: (HeatmapCell | null)[] = []
    for (let d = 0; d < 7; d++) {
      if (cursor > today) {
        week.push(null)
      } else {
        const dateKey = toUTCDateKey(cursor)
        week.push({
          date: new Date(cursor),
          dateKey,
          completed: completedSet.has(dateKey),
        })
      }
      cursor.setUTCDate(cursor.getUTCDate() + 1)
    }
    weeks.push(week)
  }

  return weeks
}

export function getMonthLabels(weeks: (HeatmapCell | null)[][]): { weekIndex: number; label: string }[] {
  const labels: { weekIndex: number; label: string }[] = []
  let lastMonth = -1

  weeks.forEach((week, i) => {
    const firstValidDay = week.find((d) => d !== null)
    if (!firstValidDay) return
    const month = firstValidDay.date.getUTCMonth()
    if (month !== lastMonth) {
      labels.push({
        weekIndex: i,
        label: firstValidDay.date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }),
      })
      lastMonth = month
    }
  })

  return labels
}

export function getTodayUTCKey(): string {
  return toUTCDateKey(todayUTC())
}