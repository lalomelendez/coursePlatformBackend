import Course from "../models/courseModel.js";

// Obtener todos los cursos
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un curso por ID
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor");
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
    image,
    modules,
    instructor,
    price,
    discounts,
  } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      category,
      level,
      image,
      modules,
      instructor,
      price,
      discounts,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un curso
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    category,
    level,
    image,
    modules,
    instructor,
    price,
    discounts,
  } = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        level,
        image,
        modules,
        instructor,
        price,
        discounts,
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un curso
export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);

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
