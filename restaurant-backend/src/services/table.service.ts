import prisma from "../database/prisma";
import { Prisma } from "@prisma/client";

export class TableService {
  static async getAll() {
    return prisma.table.findMany({
      // Removed orders include to prevent loading all history and causing timeouts
      // include: { orders: true }, 
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

  static async getAvailableTables(date: Date, durationMinutes: number) {
    const reqStart = new Date(date);
    const reqEnd = new Date(reqStart.getTime() + durationMinutes * 60000);

    // Get all tables with their active reservations around the requested time
    // To be efficient, we can check reservations for the whole day or a safe window.
    // Let's grab reservations for the target day.
    const startOfDay = new Date(reqStart);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(reqStart);
    endOfDay.setHours(23, 59, 59, 999);

    const tables = await prisma.table.findMany({
      include: {
        reservations: {
          where: {
            reservation_time: {
              gte: startOfDay,
              lte: endOfDay,
            },
            status: {
              in: ['confirmed'] // Only confirmed reservations block tables. blocked? no_show/cancelled don't block.
            }
          }
        }
      }
    });

    // Filter tables that have NO overlapping reservation
    const availableTables = tables.filter(table => {
      const hasOverlap = table.reservations.some(reservation => {
        const resStart = new Date(reservation.reservation_time);
        const resEnd = new Date(resStart.getTime() + reservation.duration * 60000);

        // Check for overlap
        // Overlap if (StartA < EndB) and (EndA > StartB)
        return resStart < reqEnd && resEnd > reqStart;
      });

      return !hasOverlap;
    });

    return availableTables;
  }
}
