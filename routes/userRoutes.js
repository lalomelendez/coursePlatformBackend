// routes/userRoutes.js

import express from "express";
import { getUser, createUser } from "../controllers/userController.js";

const router = express.Router(); // Definir el router

// Ruta para obtener un usuario
router.get("/:id", getUser);

// Ruta para crear un usuario
router.post("/", createUser);

export default router;
