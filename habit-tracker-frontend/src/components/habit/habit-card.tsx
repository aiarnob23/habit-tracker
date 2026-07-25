import { Link } from '@tanstack/react-router'
import { Flame, MoreVertical } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { HabitListItem } from '@/types/habit.types'

interface HabitCardProps {
  habit: HabitListItem
  onToggleToday: (habitId: number, nextValue: boolean) => void
}

export function HabitCard({ habit, onToggleToday }: HabitCardProps) {
  return (
    <Card className="p-4 bg-habitcard">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={habit.todayCompleted}
            onCheckedChange={(checked) => onToggleToday(habit.id, checked === true)}
            className="mt-1 h-5 w-5"
          />
          <div>
            <h3 className="font-semibold leading-tight">{habit.title}</h3>
            {habit.description && (
              <p className="text-sm text-muted-foreground line-clamp-1">{habit.description}</p>
            )}
            <div className="flex items-center gap-2 mt-1.5">
              <Badge variant="secondary" className="gap-1">
                <Flame className="h-3 w-3" />
                {habit.currentStreak} day{habit.currentStreak !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="shrink-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-muted-foreground">
          {habit.todayCompleted ? "Done today ✓" : "Not done yet today"}
        </span>
        <Link
          to="/habits/$habitId"
          params={{ habitId: habit.id.toString() }}
          className="text-sm text-primary hover:underline"
        >
          Details →
        </Link>
      </div>
    </Card>
  )
}