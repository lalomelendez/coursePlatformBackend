import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose"; // Importar Mongoose
import errorHandler from "./middlewares/errorHandler.js";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

const app = express();

// Paso 1: Inicializar Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// Paso 2: Conectar a la Base de Datos
connectDB();

// Paso 3: Definir las Rutas Principales
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

// Manejo de errores
app.use(errorHandler);

export default app;
