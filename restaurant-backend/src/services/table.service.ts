import prisma from "../database/prisma";
import { Prisma } from "@prisma/client";

export class TableService {
  static async getAll() {
    return prisma.table.findMany({
      include: { orders: true },
    });
  }

  static async getById(id: number) {
    return prisma.table.findUnique({
      where: { table_id: id },
      include: { orders: true },
    });
  }

  static async create(data: Prisma.TableCreateInput) {
    return prisma.table.create({
      data,
    });
  }

  static async update(id: number, data: Prisma.TableUpdateInput) {
    return prisma.table.update({
      where: { table_id: id },
      data,
    });
  }

  static async delete(id: number) {
    return prisma.table.delete({
      where: { table_id: id },
    });
  }
}
