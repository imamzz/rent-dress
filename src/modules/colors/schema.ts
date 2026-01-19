import { z } from "zod";

export const createColorSchema = z.object({
    name: z.string().min(1, "Name is required"),
    hexCode: z.string().min(1, "hexCode is required"),
})

export type CreateColorInput = z.infer<typeof createColorSchema>;