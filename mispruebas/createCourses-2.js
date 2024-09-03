import mongoose from "mongoose";
import Course from "../models/courseModel.js";
import connectDB from "../config/database.js";

// Arrays de posibles títulos, plataformas e industrias
const titles = [
  "SEO Avanzado",
  "Publicidad en Redes Sociales",
  "Email Marketing Efectivo",
  "Marketing de Contenidos",
  "Analítica Web",
  "Publicidad en Google Ads",
  "Estrategias de Marketing Digital",
  "Marketing en Instagram",
  "Marketing en Facebook",
  "Marketing en LinkedIn",
];

const platforms = [
  "Udemy",
  "Coursera",
  "edX",
  "LinkedIn Learning",
  "Skillshare",
  "Pluralsight",
  "Khan Academy",
  "Codecademy",
  "FutureLearn",
  "Treehouse",
];

const industries = [
  "Tecnología",
  "Salud",
  "Educación",
  "Finanzas",
  "Retail",
  "Automotriz",
  "Turismo",
  "Alimentos y Bebidas",
  "Moda",
  "Construcción",
];

// Función para obtener un elemento aleatorio de un array
const getRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

// Crear un nuevo curso
const createCourse = async (title, platform, industry) => {
  try {
    const newCourse = new Course({
      title,
      platform,
      industry,
      instructor: mongoose.Types.ObjectId(), // Asignar un ID de instructor aleatorio
      studentsEnrolled: [], // Inicialmente sin estudiantes inscritos
    });

    // Guardar el curso en la base de datos
    await newCourse.save();
    console.log("Curso creado exitosamente:", title);
    return true;
  } catch (error) {
    console.error("Error al crear el curso:", error);
    return false;
  }
};

// Ejecutar el script
const run = async () => {
  await connectDB();

  let createdCourses = 0;
  while (createdCourses < 50) {
    // Crear 50 cursos aleatorios
    const title = getRandomElement(titles);
    const platform = getRandomElement(platforms);
    const industry = getRandomElement(industries);

    const courseCreated = await createCourse(title, platform, industry);
    if (courseCreated) {
      createdCourses++;
    }
  }

  console.log(`Se han creado ${createdCourses} cursos.`);
  process.exit();
};

run();
