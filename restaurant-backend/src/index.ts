import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./database/prisma";
import categoryRoutes from "./routes/category.routes";
import menuItemRoutes from "./routes/menuItem.routes";
import employeeRoutes from "./routes/employee.routes";
import tableRoutes from "./routes/table.routes";
import orderRoutes from "./routes/order.routes";
import authRoutes from "./routes/auth.routes";
import inventoryRoutes from "./routes/inventory.routes";
import reservationRoutes from "./routes/reservation.routes";

const app = express();

// --- Configuration for Render & CORS ---
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:4200",
  "https://bookify-restaurant-system.vercel.app"
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization,X-Requested-With,Accept",
  credentials: true,
  optionsSuccessStatus: 204
};

// Apply CORS globally
app.use(cors(corsOptions));
// Handle OPTIONS preflight requests explicitly using RegExp for Express 5 compatibility
app.options(/.*/, cors(corsOptions));

app.use(express.json());

async function startServer() {
  await connectDB();

  app.get("/", (req: Request, res: Response) => {
    res.send("Restaurant API is running.");
  });

  app.use("/auth", authRoutes);
  app.use("/inventory", inventoryRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/menu-items", menuItemRoutes);
  app.use("/employees", employeeRoutes);
  app.use("/tables", tableRoutes);
  app.use("/orders", orderRoutes);
  app.use("/reservations", reservationRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
