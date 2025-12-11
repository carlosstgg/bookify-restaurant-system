import { Router } from "express";
import { ReservationController } from "../controllers/reservation.controller";

const router = Router();

router.get("/", ReservationController.getAll);
router.get("/available-tables", ReservationController.getAvailableTables); // Make sure this is before :id
router.get("/:id", ReservationController.getById);
router.post("/", ReservationController.create);
router.put("/:id", ReservationController.update); // Full update
router.patch("/:id/cancel", ReservationController.cancel); // Specific action
router.delete("/:id", ReservationController.delete);

export default router;
