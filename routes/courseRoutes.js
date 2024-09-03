import express from "express";
import {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  deleteAllCourses,
} from "../controllers/courseController.js";
import { protect, admin, instructor } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourse);
router.post("/", protect, instructor, createCourse); // Proteger la ruta de creación
router.put("/:id", protect, instructor, updateCourse); // Proteger la ruta de actualización
router.delete("/:id", protect, admin, deleteCourse); // Proteger la ruta de eliminación
router.delete("/", protect, admin, deleteAllCourses); // Proteger la ruta de eliminación de todos los cursos

export default router;
