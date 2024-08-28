const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/database");

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
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

// Ruta de Inicio
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Manejo de Rutas no Encontradas
app.use((req, res, next) => {
  res.status(404).send("Ruta no encontrada");
});

// Middleware de Manejo de Errores Global
app.use(errorHandler);

// Paso 4: Configurar el Puerto
const PORT = process.env.PORT || 3000;
app.set("port", PORT);

// Paso 5: Iniciar el Servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
