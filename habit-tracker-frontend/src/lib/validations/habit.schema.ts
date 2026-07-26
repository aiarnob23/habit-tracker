import { z } from "zod";

export const createHabitSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).optional(),
  color: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Must be a valid hex color")
    .optional(),
});

export type CreateHabitFormValues = z.infer<typeof createHabitSchema>;