import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function connectDB() {
  try {
    await prisma.$connect();
    console.log("MySQL connection established successfully.");
  } catch (error) {
    console.error("Failed to connect to MySQL:", error);
    process.exit(1);
  }
}

export default prisma;