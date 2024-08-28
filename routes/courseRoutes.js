// routes/courseRoutes.js

import express from "express";
import { getCourse, createCourse } from "../controllers/courseController.js";

const router = express.Router(); // Definir el router

// Ruta para obtener un curso
router.get("/:id", getCourse);

// Ruta para crear un curso
router.post("/", createCourse);

export default router;
