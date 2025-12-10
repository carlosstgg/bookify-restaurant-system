import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";

export class EmployeeController {
  static async getAll(req: Request, res: Response) {
    try {
      const employees = await EmployeeService.getAll();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch employees" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      const employee = await EmployeeService.getById(id);
      if (!employee) {
        res.status(404).json({ error: "Employee not found" });
        return;
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch employee" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const employee = await EmployeeService.create(req.body);
      res.status(201).json(employee);
    } catch (error) {
      res.status(500).json({ error: "Failed to create employee" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      const employee = await EmployeeService.update(id, req.body);
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: "Failed to update employee" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      await EmployeeService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete employee" });
    }
  }
}
