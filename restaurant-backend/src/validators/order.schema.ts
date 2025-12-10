import { z } from "zod";

const orderItemSchema = z.object({
  item_id: z.number().int().positive(),
  quantity: z.number().int().positive().default(1),
});

export const createOrderSchema = z.object({
  body: z.object({
    table_id: z.number().int(),
    employee_id: z.number().int(),
    order_time: z.string().datetime().optional().default(() => new Date().toISOString()),
    orderItems: z.array(orderItemSchema).nonempty({ message: "Order must have at least one item" }),
  }),
});

export const updateOrderSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "in_progress", "served", "paid", "cancelled"]).optional(),
    table_id: z.number().int().optional(),
    employee_id: z.number().int().optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
});
