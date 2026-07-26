import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { RotateCcw, Trash2, Flame, Trophy } from "lucide-react";

import { Card } from "@/components/ui/card";
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
      <Card className="flex flex-col p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">
              {habit.title}
            </h3>

            {habit.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {habit.description}
              </p>
            )}

            <div className="mt-3 flex gap-2">
              <Badge variant="secondary">
                <Flame className="mr-1 h-3 w-3" />
                {habit.currentStreak}
              </Badge>

              <Badge variant="outline">
                <Trophy className="mr-1 h-3 w-3" />
                Best {habit.longestStreak}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border bg-muted/20 p-3 overflow-x-auto">
          <HabitHeatmap
            checkIns={habit.checkIns}
            weeksCount={13}
          />
        </div>

        <div className="mt-5 flex gap-2">
          <Button
            className="flex-1"
            onClick={() =>
              restoreHabit.mutate(habit.id.toString())
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
            className="flex-1"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>

        <Link
          to="/habits/$habitId"
          params={{
            habitId: habit.id.toString(),
          }}
          className="mt-4 text-sm text-primary hover:underline"
        >
          View Details →
        </Link>
      </Card>

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Permanently delete "{habit.title}"?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. The habit and all
              of its check-ins will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
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
                    onSuccess() {
                      setOpen(false);
                    },
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