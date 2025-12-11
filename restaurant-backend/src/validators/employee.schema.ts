import { z } from "zod";

export const createEmployeeSchema = z.object({
  body: z.object({
    full_name: z
      .string()
      .min(1)
      .max(120),
    role: z.enum(["waiter", "chef", "cashier", "manager"]),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .max(120),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().max(20).optional(),
  }),
});

export const updateEmployeeSchema = z.object({
  body: z.object({
    full_name: z.string().min(1).max(120).optional(),
    role: z.enum(["waiter", "chef", "cashier", "manager"]).optional(),
    email: z.string().email().max(120).optional(),
    password: z.string().min(6).optional(),
    phone: z.string().max(20).optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
});
