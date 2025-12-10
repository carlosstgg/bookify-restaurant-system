import prisma from "../database/prisma";
import { Prisma } from "@prisma/client";

export class OrderService {
  static async getAll() {
    return prisma.order.findMany({
      include: {
        orderItems: {
          include: { menuItem: true }
        },
        table: true,
        employee: true
      },
    });
  }

  static async getById(id: number) {
    return prisma.order.findUnique({
      where: { order_id: id },
      include: {
        orderItems: {
          include: { menuItem: true }
        },
        table: true,
        employee: true,
        payments: true
      },
    });
  }

  static async create(data: any) {
    const { orderItems, ...rest } = data;

    // Use a transaction to ensure data integrity
    return prisma.$transaction(async (tx) => {
      // 1. Fetch all menu items to get real prices and recipes
      const itemIds = orderItems.map((item: any) => item.item_id);
      const menuItems = await tx.menuItem.findMany({
        where: { item_id: { in: itemIds } },
        include: { 
          recipes: {
            include: { inventory: true }
          } 
        }
      });

      // 2. Validate Inventory and Prepare items
      for (const item of orderItems) {
        const menuItem = menuItems.find((mi) => mi.item_id === item.item_id);
        if (!menuItem) {
          throw new Error(`MenuItem with ID ${item.item_id} not found`);
        }

        // Check inventory for each ingredient in the recipe
        for (const recipe of menuItem.recipes) {
          const requiredAmount = recipe.quantity_needed * item.quantity;
          
          if (recipe.inventory.quantity < requiredAmount) {
             throw new Error(`Insufficient stock for ingredient: ${recipe.inventory.item_name}. Required: ${requiredAmount}, Available: ${recipe.inventory.quantity}`);
          }

          // Deduct inventory
          await tx.inventory.update({
            where: { inventory_id: recipe.inventory_id },
            data: { quantity: { decrement: requiredAmount } }
          });
        }
      }

      // 3. Calculate subtotals and prepare order items data (same as before but we loop again or could have combined)
      const itemsToCreate = orderItems.map((item: any) => {
        const menuItem = menuItems.find((mi) => mi.item_id === item.item_id);
        // menuItem exists, checked above
        const subtotal = Number(menuItem!.price) * item.quantity;

        return {
          item_id: item.item_id,
          quantity: item.quantity,
          subtotal: subtotal,
        };
      });

      // 4. Create Order with Items
      return tx.order.create({
        data: {
          ...rest,
          orderItems: {
            create: itemsToCreate,
          },
        },
        include: {
          orderItems: {
            include: { menuItem: true },
          },
        },
      });
    });
  }

  static async update(id: number, data: Prisma.OrderUpdateInput) {
    return prisma.order.update({
      where: { order_id: id },
      data,
    });
  }

  static async delete(id: number) {
    return prisma.order.delete({
      where: { order_id: id },
    });
  }
}
