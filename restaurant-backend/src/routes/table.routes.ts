import { Router } from "express";
import { TableController } from "../controllers/table.controller";
import { validate } from "../middlewares/validate.middleware";
import { createTableSchema, updateTableSchema } from "../validators/table.schema";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, TableController.getAll);
router.get("/:id", authenticate, TableController.getById);
router.post("/", authenticate, validate(createTableSchema), TableController.create);
router.put("/:id", authenticate, validate(updateTableSchema), TableController.update);
router.delete("/:id", authenticate, TableController.delete);

export default router;
