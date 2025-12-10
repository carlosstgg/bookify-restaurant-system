import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { validate } from "../middlewares/validate.middleware";
import { createCategorySchema, updateCategorySchema } from "../validators/category.schema";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, CategoryController.getAll);
router.get("/:id", authenticate, CategoryController.getById);
router.post("/", authenticate, validate(createCategorySchema), CategoryController.create);
router.put("/:id", authenticate, validate(updateCategorySchema), CategoryController.update);
router.delete("/:id", authenticate, CategoryController.delete);

export default router;
