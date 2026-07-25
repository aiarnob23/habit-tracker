// components/habit-heatmap.tsx
import { buildHeatmapGrid, getMonthLabels } from '@/lib/heatmap'
import { cn } from '@/lib/utils'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface HabitHeatmapProps {
  checkIns: string[]
  weeksCount?: number
}

export function HabitHeatmap({ checkIns, weeksCount = 13 }: HabitHeatmapProps) {
  const weeks = buildHeatmapGrid(checkIns, weeksCount)
  const monthLabels = getMonthLabels(weeks)
  const todayKey = new Date().toISOString().slice(0, 10)

  return (
    <div className="overflow-x-auto pb-1">
      <div className="inline-flex flex-col gap-1.5 min-w-max">
        {/* month labels row */}
        <div className="flex gap-1 pl-7 text-[11px] font-medium text-muted-foreground/70">
          {weeks.map((_, i) => {
            const label = monthLabels.find((m) => m.weekIndex === i)
            return (
              <div key={i} className="w-3 shrink-0">
                {label?.label}
              </div>
            )
          })}
        </div>

        <div className="flex gap-1">
          {/* day labels column */}
          <div className="flex flex-col gap-1 pr-1.5 text-[10px] font-medium text-muted-foreground/70">
            {DAY_LABELS.map((day, i) => (
              <div key={day} className="h-3 leading-3">
                {i % 2 === 1 ? day.slice(0, 3) : ''}
              </div>
            ))}
          </div>

          {/* grid */}
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((cell, di) => {
                const isToday = cell?.dateKey === todayKey

                return (
                  <div
                    key={di}
                    title={
                      cell
                        ? `${cell.date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}${cell.completed ? ' — done' : ''}`
                        : undefined
                    }
                    className={cn(
                      'group relative w-3 h-3 rounded-[3px] transition-all duration-150',
                      !cell && 'bg-transparent',
                      cell && !cell.completed && 'bg-muted hover:bg-muted-foreground/20',
                      cell?.completed &&
                        'bg-emerald-500 hover:bg-emerald-400 hover:scale-110 shadow-[0_0_0_1px_rgba(16,185,129,0.15)]',
                      isToday && 'ring-2 ring-offset-1 ring-offset-background ring-primary/60',
                    )}
                  />
                )
              })}
            </div>
          ))}
        </div>

        {/* legend */}
        <div className="flex items-center gap-1.5 pl-7 text-[11px] text-muted-foreground/70 mt-0.5">
          <span>Less</span>
          <div className="w-3 h-3 rounded-[3px] bg-muted" />
          <div className="w-3 h-3 rounded-[3px] bg-emerald-500/40" />
          <div className="w-3 h-3 rounded-[3px] bg-emerald-500/70" />
          <div className="w-3 h-3 rounded-[3px] bg-emerald-500" />
          <span>More</span>
        </div>
      </div>
    </div>
  )
}