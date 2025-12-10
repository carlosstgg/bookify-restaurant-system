import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name must not be empty" })
      .max(80, { message: "Name must be less than 80 characters" }),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name must not be empty" })
      .max(80, { message: "Name must be less than 80 characters" }),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
});
