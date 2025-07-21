import dotenv from "dotenv";
dotenv.config(); // Cargar variables de entorno primero

import express from "express";
import morgan from "morgan";
import cors from "cors";

import { connectDB } from "./config/db";
import { createDefaultUser } from "./utils/init";

// Importar rutas
import authRoutes from "./routes/auth.routes";
import roleRoutes from "./routes/role.routes";
import orderRoutes from "./routes/order.routes";
import productRoutes from "./routes/product.routes";
import menuRoutes from "./routes/menu.routes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/menu", menuRoutes);

// Conexión y servidor
connectDB()
  .then(async () => {
    await createDefaultUser();

    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB", error);
  });
