import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Course from "../models/courseModel.js";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Conectar a la base de datos
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

const titles = [
  "JavaScript Basics",
  "Advanced Node.js",
  "React for Beginners",
  "Mastering MongoDB",
  "Express.js Essentials",
];
const descriptions = [
  "Learn the basics of JavaScript, the most popular programming language in web development.",
  "Dive deep into Node.js and learn advanced concepts and techniques.",
  "Get started with React, a powerful library for building user interfaces.",
  "Master MongoDB, the leading NoSQL database, and learn how to use it effectively.",
  "Learn the essentials of Express.js, a fast and minimalist web framework for Node.js.",
];
const categories = [
  "Programming",
  "Web Development",
  "Database",
  "Frontend",
  "Backend",
];
const levels = ["beginner", "intermediate", "advanced"];

const generateRandomCourse = (instructorId) => {
  const title = titles[Math.floor(Math.random() * titles.length)];
  const description =
    descriptions[Math.floor(Math.random() * descriptions.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const level = levels[Math.floor(Math.random() * levels.length)];
  const price = Math.floor(Math.random() * 100) + 50; // Precio aleatorio entre 50 y 150

  return {
    title,
    description,
    category,
    level,
    modules: [],
    instructor: instructorId,
    price,
    discounts: [],
    studentsEnrolled: [],
    averageRating: 0,
  };
};

const createCourses = async () => {
  try {
    // Obtener todos los usuarios con el rol de Instructor
    const instructors = await User.find({ role: "Instructor" });
    if (instructors.length === 0) {
      console.log("No instructors found");
      mongoose.connection.close();
      return;
    }

    console.log(`Found ${instructors.length} instructors`);

    // Crear cursos aleatorios usando IDs de instructores válidos
    const courses = [];
    for (let i = 0; i < 10; i++) {
      // Crear 10 cursos
      const instructor =
        instructors[Math.floor(Math.random() * instructors.length)];
      const course = generateRandomCourse(instructor._id);
      courses.push(course);
    }

    await Course.insertMany(courses);
    console.log("Courses created successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating courses:", error);
    mongoose.connection.close();
  }
};

createCourses();
