import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  RotateCcw,
  Trash2,
  ArrowRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

import { HabitHeatmap } from "./habit-heatmap";
import { useRestoreHabit } from "@/hooks/use-restore-habit";
import { useDeleteHabit } from "@/hooks/use-delete-habit";

import type { HabitListItem } from "@/types/habit.types";

interface ArchivedHabitCardProps {
  habit: HabitListItem;
}

export function ArchivedHabitCard({
  habit,
}: ArchivedHabitCardProps) {
  const restoreHabit = useRestoreHabit();
  const deleteHabit = useDeleteHabit();

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="p-8 bg-habitcard/40 border-2 border-white/20 rounded-2xl overflow-hidden flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-xl leading-tight">
              {habit.title}
            </h3>

            {habit.description && (
              <p className="text-sm mt-1 text-muted-foreground line-clamp-2">
                {habit.description}
              </p>
            )}

            <div className="mt-3 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="gap-1"
              >
                🔥 <span />
                {habit.currentStreak} day
                {habit.currentStreak !== 1
                  ? "s"
                  : ""}
              </Badge>

              <Badge
                variant="outline"
                className="gap-1"
              >
                🏆 Best: {habit.longestStreak}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border bg-muted/10 p-3 overflow-x-auto">
          <HabitHeatmap
            checkIns={habit.checkIns}
            weeksCount={13}
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <Link
            to="/habits/$habitId"
            params={{
              habitId: habit.id.toString(),
            }}
            className="text-sm border px-3 rounded-xl py-1 bg-accent-foreground/20 font-semibold text-primary hover:scale-95 transition-transform"
          >
            <span className="flex items-center gap-1">
              Details
              <ArrowRight className="h-4 w-3" />
            </span>
          </Link>

          <div className="flex gap-2">
            <Button
              className="cursor-pointer"
              onClick={() =>
                restoreHabit.mutate(
                  habit.id.toString()
                )
              }
              disabled={restoreHabit.isPending}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {restoreHabit.isPending
                ? "Restoring..."
                : "Restore"}
            </Button>

            <Button
              variant="destructive"
              onClick={() => setOpen(true)}
              className="cursor-pointer"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Permanently delete "
              {habit.title}"?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone.
              The habit and all of its
              check-ins will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={deleteHabit.isPending}
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteHabit.isPending}
              onClick={(e) => {
                e.preventDefault();

                deleteHabit.mutate(
                  habit.id.toString(),
                  {
                    onSuccess: () =>
                      setOpen(false),
                  }
                );
              }}
            >
              {deleteHabit.isPending
                ? "Deleting..."
                : "Delete Permanently"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}