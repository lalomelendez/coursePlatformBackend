import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
} from "../controllers/userController.js";
import { protect, admin, instructor } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas accesibles solo por Administradores
router
  .route("/")
  .get(protect, admin, getUsers) // Obtener todos los usuarios
  .post(protect, admin, createUser); // Crear un nuevo usuario

router
  .route("/:id")
  .get(protect, admin, getUserById) // Obtener un usuario por ID
  .put(protect, admin, updateUser) // Actualizar un usuario
  .delete(protect, admin, deleteUser); // Eliminar un usuario

// Rutas accesibles por Instructores y Administradores
router
  .route("/profile")
  .get(protect, getUserProfile) // Obtener el perfil del usuario autenticado
  .put(protect, updateUserProfile); // Actualizar el perfil del usuario autenticado

// Rutas accesibles por Instructores y Administradores para actualizar usuarios
router.route("/instructor/:id").put(protect, instructor, updateUser); // Actualizar un usuario (Instructores y Administradores)

export default router;
