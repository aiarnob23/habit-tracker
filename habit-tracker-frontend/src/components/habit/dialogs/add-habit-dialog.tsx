import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateHabit } from "@/hooks/use-create-habit";
import { createHabitSchema, type CreateHabitFormValues } from "@/lib/validations/habit.schema";

interface CreateHabitDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateHabitDialog({ open, onOpenChange }: CreateHabitDialogProps) {
    const createHabit = useCreateHabit();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateHabitFormValues>({
        resolver: zodResolver(createHabitSchema),
    });


    const onSubmit = (values: CreateHabitFormValues) => {
        createHabit.mutate(values, {
            onSuccess: () => {
                reset();
                onOpenChange(false);
            },
        });
    };

    const serverError = isAxiosError(createHabit.error)
        ? createHabit.error.response?.data?.message ?? "Failed to create habit."
        : null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className=" sm:max-w-md rounded-2xl border border-white/15 bg-linear-to-br from-white/10 via-white/5 to-white/2  backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] supports-backdrop-filter:bg-white/5">
                <DialogHeader>
                    <DialogTitle>Create a new habit</DialogTitle>
                    <DialogDescription>
                        Add something you want to track daily.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="Read 20 minutes" {...register("title")} />
                        {errors.title && (
                            <p className="text-sm text-destructive">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="description">Description (optional)</Label>
                        <Textarea
                            id="description"
                            placeholder="Read any book before bed"
                            rows={2}
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="text-sm text-destructive">{errors.description.message}</p>
                        )}
                    </div>

                    {serverError && (
                        <p className="text-sm text-destructive bg-destructive/10 rounded-md p-2">
                            {serverError}
                        </p>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" className="cursor-pointer " onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button className="cursor-pointer" type="submit" disabled={createHabit.isPending}>
                            {createHabit.isPending ? "Creating..." : "Create habit"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}