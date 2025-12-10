import { z } from "zod";

export const createTableSchema = z.object({
  body: z.object({
    table_number: z
      .number()
      .int()
      .positive(),
    capacity: z
      .number()
      .int()
      .positive(),
  }),
});

export const updateTableSchema = z.object({
  body: z.object({
    table_number: z.number().int().positive().optional(),
    capacity: z.number().int().positive().optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
});
