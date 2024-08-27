// index.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Paso 1: Inicializar Express
app.use(express.json());
app.use(cors());

// Paso 2: Cargar Configuraciones
const dbConfig = require("./config/database");
dbConfig();

// Paso 3: Definir las Rutas Principales
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Paso 4: Manejo de Errores Globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Paso 5: Iniciar el Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
