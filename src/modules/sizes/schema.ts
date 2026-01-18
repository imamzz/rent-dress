import { z } from "zod";

export const createSizeSchema = z.object({
  label: z.string().min(1, "Size label is required"),
  bust: z.string(),
  waist: z.string(),
  hips: z.string(),
});

export type CreateSizeInput = z.infer<typeof createSizeSchema>;
