import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { validate } from "../middlewares/validate.middleware";
import { createOrderSchema, updateOrderSchema } from "../validators/order.schema";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, OrderController.getAll);
router.get("/:id", authenticate, OrderController.getById);
router.post("/", authenticate, validate(createOrderSchema), OrderController.create);
router.put("/:id", authenticate, validate(updateOrderSchema), OrderController.update);
router.delete("/:id", authenticate, OrderController.delete);

export default router;
