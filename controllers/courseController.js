// controllers/courseController.js

import Course from "../models/courseModel.js";

// Obtener todos los cursos
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor")
      .populate("studentsEnrolled");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un curso por ID
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor")
      .populate("studentsEnrolled");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo curso
export const createCourse = async (req, res) => {
  const {
    title,
    description,
    category,
    level,
    modules,
    instructor,
    price,
    discounts,
  } = req.body;

  const newCourse = new Course({
    title,
    description,
    category,
    level,
    modules,
    instructor,
    price,
    discounts,
  });

  try {
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un curso por ID
export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un curso por ID
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar todos los cursos
export const deleteAllCourses = async (req, res) => {
  try {
    await Course.deleteMany({});
    res.status(200).json({ message: "All courses deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
