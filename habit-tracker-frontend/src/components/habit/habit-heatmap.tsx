import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { buildHeatmapGrid, getMonthLabels, getTodayUTCKey } from '@/lib/heatmap'
import { cn } from '@/lib/utils'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface HabitHeatmapProps {
  checkIns: string[]
  weeksCount?: number
}

export function HabitHeatmap({ checkIns, weeksCount = 13 }: HabitHeatmapProps) {
  const weeks = buildHeatmapGrid(checkIns, weeksCount)
  const monthLabels = getMonthLabels(weeks)
  const todayKey = getTodayUTCKey()

  return (
    <TooltipProvider>
      <div className="overflow-x-auto pb-1">
        <div className="inline-flex flex-col gap-1.5 min-w-max">
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
            <div className="flex flex-col gap-1 pr-1.5 text-[10px] font-medium text-muted-foreground/70">
              {DAY_LABELS.map((day, i) => (
                <div key={day} className="h-3 leading-3">
                  {i % 2 === 1 ? day.slice(0, 3) : ''}
                </div>
              ))}
            </div>

            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((cell, di) => {
                  const isToday = cell?.dateKey === todayKey

                  const box = (
                    <div
                      className={cn(
                        'group relative w-3 h-3 rounded-[3px] transition-all duration-150',
                        !cell && 'bg-transparent',
                        cell && !cell.completed && 'bg-chart-2/70 hover:bg-muted-foreground/20',
                        cell?.completed &&
                        'bg-emerald-500 hover:bg-emerald-400 hover:scale-110 shadow-[0_0_0_1px_rgba(16,185,129,0.15)]',
                        isToday && 'ring-2 ring-offset-1 ring-offset-background ring-primary/60',
                      )}
                    />
                  )

                  if (!cell) return <div key={di}>{box}</div>

                  return (
                    <Tooltip key={di}>
                      <TooltipTrigger>{box}</TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        {cell.date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          timeZone: 'UTC',
                        })}
                        {cell.completed ? ' — done' : ' — not done'}
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            ))}
          </div>

          <div className="flex items-center mt-2 gap-4 pl-7 text-[11px] text-muted-foreground/70">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-[3px] bg-emerald-500" />
              <span>Completed</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-[3px] bg-muted" />
              <span>Missed</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-[3px] border-2 border-primary/60" />
              <span>Today</span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}