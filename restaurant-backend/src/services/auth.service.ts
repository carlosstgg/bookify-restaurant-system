import prisma from "../database/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  static async login(email: string, password: string) {
    const employee = await prisma.employee.findUnique({
      where: { email },
    });

    if (!employee) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: employee.employee_id, role: employee.role },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "1d" }
    );

    return { token, employee };
  }
}
