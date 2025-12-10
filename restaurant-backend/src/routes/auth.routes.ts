import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { z } from "zod";

const router = Router();

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

router.post("/login", validate(loginSchema), AuthController.login);

export default router;
