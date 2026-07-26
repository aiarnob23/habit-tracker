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

export function EditHabitDialog({
    habit,
}: EditHabitDialogProps) {
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
                <Button>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Habit</DialogTitle>

                    <DialogDescription>
                        Update your habit information.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <Label>Title</Label>

                        <Input
                            value={title}
                            maxLength={100}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>

                        <Textarea
                            rows={4}
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Color</Label>

                        <div className="flex flex-wrap gap-3">
                            {COLORS.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c)}
                                    className={`h-8 w-8 rounded-full border-2 transition ${color === c
                                            ? "border-primary scale-110"
                                            : "border-transparent"
                                        }`}
                                    style={{
                                        backgroundColor: c,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={
                                updateHabit.isPending ||
                                !title.trim()
                            }
                        >
                            {updateHabit.isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}

                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}