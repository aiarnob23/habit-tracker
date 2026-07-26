import { useEffect, useState } from "react";
import { Loader2, Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useUpdateHabit } from "@/hooks/use-update-habit";
import type { HabitDetail } from "@/types/habit.types";

interface EditHabitDialogProps {
  habit: HabitDetail;
}

const COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#84cc16",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
];

export function EditHabitDialog({ habit }: EditHabitDialogProps) {
  const updateHabit = useUpdateHabit();

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(habit.title);
  const [description, setDescription] = useState(
    habit.description ?? ""
  );
  const [color, setColor] = useState(
    habit.color ?? COLORS[0]
  );

  useEffect(() => {
    if (!open) return;

    setTitle(habit.title);
    setDescription(habit.description ?? "");
    setColor(habit.color ?? COLORS[0]);
  }, [habit, open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    updateHabit.mutate(
      {
        id: habit.id.toString(),
        payload: {
          title: title.trim(),
          description: description.trim(),
          color,
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className="cursor-pointer rounded-2xl px-4 py-1"
          variant="outline"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-md rounded-2xl border border-white/15 bg-linear-to-br from-white/10 via-white/5 to-white/2 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] supports-backdrop-filter:bg-white/5"
      >
        <DialogHeader>
          <DialogTitle>Edit habit</DialogTitle>

          <DialogDescription>
            Update your habit information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>

            <Input
              id="title"
              value={title}
              maxLength={100}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">
              Description (optional)
            </Label>

            <Textarea
              id="description"
              rows={2}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>

          <div className="space-y-1.5">
            <Label>Color</Label>

            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`h-8 w-8 cursor-pointer rounded-full border-2 transition-all ${
                    color === c
                      ? "scale-110 border-primary ring-2 ring-primary/40"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              className="cursor-pointer"
              type="submit"
              disabled={
                updateHabit.isPending || !title.trim()
              }
            >
              {updateHabit.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}