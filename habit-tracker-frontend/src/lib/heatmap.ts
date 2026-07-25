export interface HeatmapCell {
  date: Date
  dateKey: string
  completed: boolean
}

export function buildHeatmapGrid(
  checkInDates: string[], 
  weeksCount = 13, 
): (HeatmapCell | null)[][] {
  const completedSet = new Set(checkInDates)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const totalDays = weeksCount * 7
  const start = new Date(today)
  start.setDate(start.getDate() - (totalDays - 1))
  start.setDate(start.getDate() - start.getDay()) 

  const weeks: (HeatmapCell | null)[][] = []
  const cursor = new Date(start)

  for (let w = 0; w < weeksCount; w++) {
    const week: (HeatmapCell | null)[] = []
    for (let d = 0; d < 7; d++) {
      if (cursor > today) {
        week.push(null) 
      } else {
        const dateKey = cursor.toISOString().slice(0, 10)
        week.push({
          date: new Date(cursor),
          dateKey,
          completed: completedSet.has(dateKey),
        })
      }
      cursor.setDate(cursor.getDate() + 1)
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
    const month = firstValidDay.date.getMonth()
    if (month !== lastMonth) {
      labels.push({
        weekIndex: i,
        label: firstValidDay.date.toLocaleDateString('en-US', { month: 'short' }),
      })
      lastMonth = month
    }
  })

  return labels
}