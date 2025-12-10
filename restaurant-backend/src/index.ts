import express from "express";
import cors from "cors";
import { connectDB } from "./database/prisma";
import categoryRoutes from "./routes/category.routes";
import menuItemRoutes from "./routes/menuItem.routes";
import employeeRoutes from "./routes/employee.routes";
import tableRoutes from "./routes/table.routes";
import orderRoutes from "./routes/order.routes";
import authRoutes from "./routes/auth.routes";
import inventoryRoutes from "./routes/inventory.routes";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

async function startServer() {
  await connectDB();

  app.get("/", (req, res) => {
    res.send("Restaurant API is running.");
  });

  app.use("/auth", authRoutes);
  app.use("/inventory", inventoryRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/menu-items", menuItemRoutes);
  app.use("/employees", employeeRoutes);
  app.use("/tables", tableRoutes);
  app.use("/orders", orderRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
