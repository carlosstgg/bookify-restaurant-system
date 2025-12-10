import { Router } from "express";
import { MenuItemController } from "../controllers/menuItem.controller";
import { validate } from "../middlewares/validate.middleware";
import { createMenuItemSchema, updateMenuItemSchema } from "../validators/menuItem.schema";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, MenuItemController.getAll);
router.get("/:id", authenticate, MenuItemController.getById);
router.post("/", authenticate, validate(createMenuItemSchema), MenuItemController.create);
router.put("/:id", authenticate, validate(updateMenuItemSchema), MenuItemController.update);
router.delete("/:id", authenticate, MenuItemController.delete);

export default router;
