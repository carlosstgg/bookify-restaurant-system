import { Router } from "express";
import { InventoryController } from "../controllers/inventory.controller";
import { validate } from "../middlewares/validate.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { createInventorySchema, updateInventorySchema } from "../validators/inventory.schema";

const router = Router();

router.get("/", authenticate, InventoryController.getAll);
router.get("/:id", authenticate, InventoryController.getById);
router.post("/", authenticate, validate(createInventorySchema), InventoryController.create);
router.put("/:id", authenticate, validate(updateInventorySchema), InventoryController.update);
router.delete("/:id", authenticate, InventoryController.delete);

export default router;
