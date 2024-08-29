import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import errorHandler from "./middlewares/errorHandler.js"; // Asegúrate de tener un middleware de manejo de errores

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Paso 1: Inicializar Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// Paso 2: Conectar a la base de datos
connectDB();

// Paso 3: Definir las Rutas Principales
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

// Manejo de errores
app.use(errorHandler);

// Paso 4: Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
