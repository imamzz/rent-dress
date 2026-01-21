import { z } from "zod";

export const createProductInputSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  categoryId: z.string(),
  description: z.string().optional(),
  variants: z.array(
    z.object({
      sizeId: z.string(),
      colorId: z.string().nullable(),
      stock: z.number().int().nonnegative(),
    })
  ),
  media: z.object({
    images: z.array(z.instanceof(File)).max(4),
    video: z.instanceof(File).optional().nullable(),
  }),
});


export type CreateProductInput = z.infer<typeof createProductInputSchema>;
