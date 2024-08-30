import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Course from "../models/courseModel.js";
import Review from "../models/reviewModel.js";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Conectar a la base de datos
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

const comments = [
  "Great course!",
  "Very informative.",
  "I learned a lot.",
  "Highly recommend.",
  "Could be better.",
];

const generateRandomReview = (userId, courseId) => {
  const rating = Math.floor(Math.random() * 5) + 1;
  const comment = comments[Math.floor(Math.random() * comments.length)];

  return {
    user: userId,
    course: courseId,
    rating,
    comment,
  };
};

const createReviews = async () => {
  try {
    // Obtener todos los usuarios
    const users = await User.find();
    if (users.length === 0) {
      console.log("No users found");
      mongoose.connection.close();
      return;
    }

    // Obtener todos los cursos
    const courses = await Course.find();
    if (courses.length === 0) {
      console.log("No courses found");
      mongoose.connection.close();
      return;
    }

    console.log(`Found ${users.length} users and ${courses.length} courses`);

    // Crear evaluaciones aleatorias usando IDs de usuarios y cursos válidos
    const reviews = [];
    for (let i = 0; i < 10; i++) {
      // Crear 10 evaluaciones
      const user = users[Math.floor(Math.random() * users.length)];
      const course = courses[Math.floor(Math.random() * courses.length)];
      const review = generateRandomReview(user._id, course._id);
      reviews.push(review);
    }

    await Review.insertMany(reviews);
    console.log("Reviews created successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating reviews:", error);
    mongoose.connection.close();
  }
};

createReviews();
