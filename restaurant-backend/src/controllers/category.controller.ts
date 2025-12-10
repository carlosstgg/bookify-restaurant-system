import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  static async getAll(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      const category = await CategoryService.getById(id);
      if (!category) {
        res.status(404).json({ error: "Category not found" });
        return;
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const category = await CategoryService.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to create category" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      const category = await CategoryService.update(id, req.body);
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to update category" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      await CategoryService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  }
}
