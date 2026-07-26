import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  MoreVertical,
  Trash2,
  ArrowRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { HabitListItem } from "@/types/habit.types";
import { HabitHeatmap } from "./habit-heatmap";
import { useArchiveHabit } from "@/hooks/use-archive-habit";

interface HabitCardProps {
  habit: HabitListItem;
  onToggleToday: (habitId: number, nextValue: boolean) => void;
}

export function HabitCard({
  habit,
  onToggleToday,
}: HabitCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const archiveHabit = useArchiveHabit();

  const handleArchive = () => {
    archiveHabit.mutate(habit.id, {
      onSuccess: () => {
        setConfirmOpen(false);
      },
    });
  };

  return (
    <>
      <div className="p-8 bg-habitcard border-white/20 border-2 rounded-2xl overflow-hidden flex flex-col">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={habit.todayCompleted}
              onCheckedChange={(checked) =>
                onToggleToday(habit.id, checked === true)
              }
              className="mt-1 h-5 w-5"
            />
            <div className="">
              <h3 className="font-semibold text-xl leading-tight">
                {habit.title}
              </h3>

              {habit.description && (
                <p className="text-sm mt-1 text-muted-foreground line-clamp-2">
                  {habit.description}
                </p>
              )}

              <div className="mt-3 flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  🔥 <span/>
                  {habit.currentStreak} day
                  {habit.currentStreak !== 1 ? "s" : ""}
                </Badge>

                <Badge variant="outline" className="gap-1">
                  🏆
                  Best: {habit.longestStreak}
                </Badge>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setConfirmOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-4 rounded-lg border bg-muted/10 p-3 overflow-x-auto">
          <HabitHeatmap
            checkIns={habit.checkIns}
            weeksCount={13}
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-neutral-300 font-semibold px-2 py-1">
            {habit.todayCompleted
              ? "Done today ✓"
              : "Not done yet today"}
          </span>

          <Link
            to="/habits/$habitId"
            params={{ habitId: habit.id.toString() }}
            className="text-sm border px-2 py-1 bg-accent-foreground/20 font-semibold text-primary hover:scale-95"
          >
           <span className="flex  items-center gap-1">Details <ArrowRight className="h-4 w-3"/></span> 
          </Link>
        </div>
      </div>

      <AlertDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Archive "{habit.title}"?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This habit will be removed from your dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={archiveHabit.isPending}
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={archiveHabit.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                handleArchive();
              }}
            >
              {archiveHabit.isPending
                ? "Archiving..."
                : "Archive"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}