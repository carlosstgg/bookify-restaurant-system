import prisma from "../database/prisma";
import { Prisma } from "@prisma/client";

export class MenuItemService {
  static async getAll() {
    return prisma.menuItem.findMany({
      include: { 
        category: true,
        recipes: {
          include: { inventory: true }
        }
      },
    });
  }

  static async getById(id: number) {
    return prisma.menuItem.findUnique({
      where: { item_id: id },
      include: { category: true },
    });
  }

  static async create(data: any) {
    const { recipes, ...rest } = data;
    return prisma.menuItem.create({
      data: {
        ...rest,
        recipes: recipes ? {
          create: recipes.map((r: any) => ({
            inventory_id: r.inventory_id,
            quantity_needed: r.quantity_needed
          }))
        } : undefined
      },
    });
  }

  static async update(id: number, data: any) {
    const { recipes, ...rest } = data;
    return prisma.menuItem.update({
      where: { item_id: id },
      data: {
        ...rest,
        recipes: recipes ? {
          deleteMany: {},
          create: recipes.map((r: any) => ({
            inventory_id: r.inventory_id,
            quantity_needed: r.quantity_needed
          }))
        } : undefined
      },
    });
  }

  static async delete(id: number) {
    return prisma.menuItem.delete({
      where: { item_id: id },
    });
  }
}
