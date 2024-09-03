import mongoose from "mongoose";
import Course from "../models/courseModel.js";
import connectDB from "../config/database.js";

// Arrays de posibles títulos, descripciones, plataformas, redes sociales e industrias
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

const descriptions = [
  "Aprende las mejores prácticas de SEO para mejorar el ranking de tu sitio web.",
  "Domina la publicidad en redes sociales y aumenta tu alcance.",
  "Crea campañas de email marketing efectivas que conviertan.",
  "Desarrolla una estrategia de marketing de contenidos exitosa.",
  "Analiza el rendimiento de tu sitio web con herramientas de analítica web.",
  "Aprende a crear y gestionar campañas en Google Ads.",
  "Descubre estrategias avanzadas de marketing digital.",
  "Aumenta tu presencia en Instagram con técnicas de marketing efectivas.",
  "Mejora tu marketing en Facebook y llega a más clientes.",
  "Utiliza LinkedIn para marketing B2B y networking profesional.",
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

const socialMedia = [
  "Facebook",
  "Instagram",
  "LinkedIn",
  "Twitter",
  "YouTube",
  "Pinterest",
  "Snapchat",
  "TikTok",
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

const levels = ["beginner", "intermediate", "advanced"];

// Array de URLs de imágenes de ejemplo
const images = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  "https://example.com/image3.jpg",
  "https://example.com/image4.jpg",
  "https://example.com/image5.jpg",
];

// Función para obtener un elemento aleatorio de un array
const getRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const generateRandomCourse = (instructorId) => {
  const title = getRandomElement(titles);
  const description = getRandomElement(descriptions);
  const platform = getRandomElement(platforms);
  const socialMediaPlatform = getRandomElement(socialMedia);
  const industry = getRandomElement(industries);
  const level = getRandomElement(levels);
  const image = getRandomElement(images); // Seleccionar una imagen aleatoria
  const price = Math.floor(Math.random() * 100) + 50; // Precio aleatorio entre 50 y 150

  return {
    title,
    description,
    category: `Marketing Digital en ${socialMediaPlatform}`,
    platform,
    industry,
    level,
    image, // Incluir la imagen en el curso
    modules: [],
    instructor: instructorId,
    price,
    discounts: [],
  };
};

// Crear un nuevo curso
const createCourse = async (instructorId) => {
  try {
    const newCourse = new Course(generateRandomCourse(instructorId));
    await newCourse.save();
    console.log("Curso creado exitosamente:", newCourse.title);
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
  const instructorId = new mongoose.Types.ObjectId(); // Asignar un ID de instructor aleatorio

  while (createdCourses < 50) {
    // Crear 50 cursos aleatorios
    const courseCreated = await createCourse(instructorId);
    if (courseCreated) {
      createdCourses++;
    }
  }

  console.log(`Se han creado ${createdCourses} cursos.`);
  process.exit();
};

run();
