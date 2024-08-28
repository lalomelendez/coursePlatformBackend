// controllers/courseController.js

// Función para obtener un curso
export const getCourse = (req, res) => {
  const courseId = req.params.id;
  // Lógica para obtener el curso por ID
  res.send(`Obteniendo curso con ID: ${courseId}`);
};

// Función para crear un curso
export const createCourse = (req, res) => {
  const courseData = req.body;
  // Lógica para crear un nuevo curso
  res.send("Curso creado exitosamente");
};
