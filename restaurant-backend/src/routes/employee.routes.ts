import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";
import { validate } from "../middlewares/validate.middleware";
import { createEmployeeSchema, updateEmployeeSchema } from "../validators/employee.schema";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, EmployeeController.getAll);
router.get("/:id", authenticate, EmployeeController.getById);
router.post("/", authenticate, validate(createEmployeeSchema), EmployeeController.create);
router.put("/:id", authenticate, validate(updateEmployeeSchema), EmployeeController.update);
router.delete("/:id", authenticate, EmployeeController.delete);

export default router;
