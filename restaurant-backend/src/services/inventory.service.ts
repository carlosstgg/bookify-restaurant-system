import prisma from "../database/prisma";
import { Prisma } from "@prisma/client";

export class InventoryService {
  static async getAll() {
    return prisma.inventory.findMany();
  }

  static async getById(id: number) {
    return prisma.inventory.findUnique({
      where: { inventory_id: id },
    });
  }

  static async create(data: Prisma.InventoryCreateInput) {
    return prisma.inventory.create({
      data,
    });
  }

  static async update(id: number, data: Prisma.InventoryUpdateInput) {
    return prisma.inventory.update({
      where: { inventory_id: id },
      data,
    });
  }

  static async delete(id: number) {
    return prisma.inventory.delete({
      where: { inventory_id: id },
    });
  }
}
