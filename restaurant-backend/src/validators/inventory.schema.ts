import { z } from "zod";

export const createInventorySchema = z.object({
  body: z.object({
    item_name: z
      .string()
      .min(1)
      .max(120),
    quantity: z
      .number()
      .int()
      .min(0),
    unit: z
      .string()
      .min(1)
      .max(20),
    min_quantity: z
      .number()
      .int()
      .min(0)
      .optional()
      .default(0),
  }),
});

export const updateInventorySchema = z.object({
  body: z.object({
    item_name: z.string().min(1).max(120).optional(),
    quantity: z.number().int().min(0).optional(),
    unit: z.string().min(1).max(20).optional(),
    min_quantity: z.number().int().min(0).optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
});
