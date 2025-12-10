import { z } from "zod";

export const createMenuItemSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1)
      .max(120),
    description: z.string().optional(),
    price: z
      .number()
      .positive({ message: "Price must be positive" }),
    category_id: z
      .number()
      .int({ message: "Category ID must be an integer" }),
    available: z.boolean().optional(),
    recipes: z.array(z.object({
      inventory_id: z.number().int(),
      quantity_needed: z.number().int().positive()
    })).optional()
  }),
});

export const updateMenuItemSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(120).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    category_id: z.number().int().optional(),
    available: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
});
