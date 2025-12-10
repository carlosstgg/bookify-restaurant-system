import prisma from "../database/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

export class EmployeeService {
  static async getAll() {
    return prisma.employee.findMany();
  }

  static async getById(id: number) {
    return prisma.employee.findUnique({
      where: { employee_id: id },
    });
  }

  static async create(data: Prisma.EmployeeCreateInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.employee.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  static async update(id: number, data: Prisma.EmployeeUpdateInput) {
    if (data.password && typeof data.password === 'string') {
      data.password = await bcrypt.hash(data.password, 10);
    }
    
    return prisma.employee.update({
      where: { employee_id: id },
      data,
    });
  }

  static async delete(id: number) {
    return prisma.employee.delete({
      where: { employee_id: id },
    });
  }
}
