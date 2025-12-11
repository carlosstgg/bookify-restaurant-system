import prisma from "../database/prisma";
import { Prisma, ReservationStatus } from "@prisma/client";

export class ReservationService {
  static async getAll() {
    return prisma.reservation.findMany({
      include: {
        table: true,
      },
      orderBy: {
        reservation_time: 'asc'
      }
    });
  }

  static async getById(id: number) {
    return prisma.reservation.findUnique({
      where: { reservation_id: id },
      include: {
        table: true,
      },
    });
  }

  static async create(data: Prisma.ReservationCreateInput) {
    // Basic validation: Check if table is free (can be more complex)
    // For now, we trust the caller (who should check availability first) or the DB constraints if any.
    // In a real app, we should call TableService.checkAvailability(data.table.connect.table_id, data.reservation_time, data.duration)
    
    return prisma.reservation.create({
      data,
    });
  }

  static async update(id: number, data: Prisma.ReservationUpdateInput) {
    return prisma.reservation.update({
      where: { reservation_id: id },
      data,
    });
  }

  static async delete(id: number) {
    return prisma.reservation.delete({
      where: { reservation_id: id },
    });
  }

  static async cancel(id: number) {
    return prisma.reservation.update({
      where: { reservation_id: id },
      data: { status: ReservationStatus.cancelled }
    });
  }
}
