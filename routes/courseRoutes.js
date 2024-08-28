// routes/courseRoutes.js

const express = require("express");
const router = express.Router();

// Controladores de cursos
const { getCourse, createCourse } = require("../controllers/courseController");

// Ruta para obtener un curso
router.get("/:id", getCourse);

// Ruta para crear un curso
router.post("/", createCourse);

module.exports = router;
