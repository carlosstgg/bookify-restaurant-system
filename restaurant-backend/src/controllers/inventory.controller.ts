import { Request, Response } from "express";
import { InventoryService } from "../services/inventory.service";

export class InventoryController {
  static async getAll(req: Request, res: Response) {
    try {
      const items = await InventoryService.getAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inventory" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      const item = await InventoryService.getById(id);
      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inventory item" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const item = await InventoryService.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to create inventory item" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      const item = await InventoryService.update(id, req.body);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to update inventory item" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      await InventoryService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete inventory item" });
    }
  }
}
