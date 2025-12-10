import { Request, Response } from "express";
import { OrderService } from "../services/order.service";

export class OrderController {
  static async getAll(req: Request, res: Response) {
    try {
      const orders = await OrderService.getAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      const order = await OrderService.getById(id);
      if (!order) {
        res.status(404).json({ error: "Order not found" });
        return;
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const order = await OrderService.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create order" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      const order = await OrderService.update(id, req.body);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      await OrderService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete order" });
    }
  }
}
