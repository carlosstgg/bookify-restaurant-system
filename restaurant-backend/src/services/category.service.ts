import prisma from "../database/prisma";
import { Prisma } from "@prisma/client";

export class CategoryService {
  static async getAll() {
    return prisma.category.findMany();
  }

  static async getById(id: number) {
    return prisma.category.findUnique({
      where: { category_id: id },
      include: { menuItems: true },
    });
  }

  static async create(data: Prisma.CategoryCreateInput) {
    return prisma.category.create({
      data,
    });
  }

  static async update(id: number, data: Prisma.CategoryUpdateInput) {
    return prisma.category.update({
      where: { category_id: id },
      data,
    });
  }

  static async delete(id: number) {
    return prisma.category.delete({
      where: { category_id: id },
    });
  }
}
