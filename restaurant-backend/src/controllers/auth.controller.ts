import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: "Invalid credentials" });
    }
  }
}
