// routes/authRoutes.js

import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router(); // Definir el router

// Ruta de registro
router.post("/register", register);

// Ruta de login
router.post("/login", login);

export default router;
