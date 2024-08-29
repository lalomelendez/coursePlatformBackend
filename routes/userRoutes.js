// routes/userRoutes.js

import express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router(); // Definir el router

// Ruta para obtener todos los usuarios
router.get("/", getAllUsers);

// Ruta para obtener un usuario por ID
router.get("/:id", getUser);

// Ruta para crear un usuario
router.post("/", createUser);

// Ruta para actualizar un usuario por ID
router.put("/:id", updateUser);

// Ruta para eliminar un usuario por ID
router.delete("/:id", deleteUser);

export default router;
