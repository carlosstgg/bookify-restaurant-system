import { Request, Response } from "express";
import { MenuItemService } from "../services/menuItem.service";

export class MenuItemController {
  static async getAll(req: Request, res: Response) {
    console.log("MenuItemController.getAll: Starting fetch...");
    try {
      const items = await MenuItemService.getAll();
      console.log(`MenuItemController.getAll: Fetched ${items.length} items successfully.`);
      res.json(items);
    } catch (error) {
      console.error("MenuItemController.getAll Error:", error);
      res.status(500).json({ error: "Failed to fetch menu items" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      const item = await MenuItemService.getById(id);
      if (!item) {
        res.status(404).json({ error: "Menu item not found" });
        return;
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch menu item" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const item = await MenuItemService.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to create menu item" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      const item = await MenuItemService.update(id, req.body);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to update menu item" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      await MenuItemService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete menu item" });
    }
  }
}
