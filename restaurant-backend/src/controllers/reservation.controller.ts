import { Request, Response } from "express";
import { ReservationService } from "../services/reservation.service";
import { TableService } from "../services/table.service";

export class ReservationController {
  static async getAll(req: Request, res: Response) {
    try {
      const reservations = await ReservationService.getAll();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reservations" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const reservation = await ReservationService.getById(id);
      if (!reservation) {
        return res.status(404).json({ error: "Reservation not found" });
      }
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reservation" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      // Basic validation handled by Prism or UI, effectively.
      // We expect: { table_id, customer_name, customer_phone, reservation_time, duration, people_count }
      const newReservation = await ReservationService.create(req.body);
      res.status(201).json(newReservation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create reservation" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updatedReservation = await ReservationService.update(id, req.body);
      res.json(updatedReservation);
    } catch (error) {
      res.status(500).json({ error: "Failed to update reservation" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await ReservationService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete reservation" });
    }
  }

  static async cancel(req: Request, res: Response) {
      try {
        const id = parseInt(req.params.id);
        const updatedReservation = await ReservationService.cancel(id);
        res.json(updatedReservation);
      } catch (error) {
        res.status(500).json({ error: "Failed to cancel reservation" });
      }
  }

  static async getAvailableTables(req: Request, res: Response) {
    try {
      const { date, duration } = req.query;
      
      if (!date) {
        return res.status(400).json({ error: "Date is required" });
      }

      const queryDate = new Date(date as string);
      const queryDuration = duration ? parseInt(duration as string) : 120; // Default 2 hours

      const tables = await TableService.getAvailableTables(queryDate, queryDuration);
      res.json(tables);
    } catch (error) {
      console.error("Error getting available tables:", error);
      res.status(500).json({ error: "Failed to fetch available tables" });
    }
  }
}
