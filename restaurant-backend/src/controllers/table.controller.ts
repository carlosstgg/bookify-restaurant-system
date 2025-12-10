import { Request, Response } from "express";
import { TableService } from "../services/table.service";

export class TableController {
  static async getAll(req: Request, res: Response) {
    try {
      const tables = await TableService.getAll();
      res.json(tables);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tables" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      const table = await TableService.getById(id);
      if (!table) {
        res.status(404).json({ error: "Table not found" });
        return;
      }
      res.json(table);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch table" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const table = await TableService.create(req.body);
      res.status(201).json(table);
    } catch (error) {
      res.status(500).json({ error: "Failed to create table" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      const table = await TableService.update(id, req.body);
      res.json(table);
    } catch (error) {
      res.status(500).json({ error: "Failed to update table" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      await TableService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete table" });
    }
  }
}
