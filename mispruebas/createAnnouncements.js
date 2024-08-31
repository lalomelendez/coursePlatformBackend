import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Course from "../models/courseModel.js";
import Announcement from "../models/announcementModel.js";

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

const announcementTitles = [
  "New Course Update",
  "Important Announcement",
  "Upcoming Event",
  "Course Schedule Change",
  "New Resources Available",
];

const announcementContents = [
  "We have updated the course content.",
  "Please note the following important announcement.",
  "Join us for an upcoming event.",
  "The course schedule has been changed.",
  "New resources are now available for the course.",
];

const generateRandomAnnouncement = (instructorId, courseId) => {
  const title =
    announcementTitles[Math.floor(Math.random() * announcementTitles.length)];
  const content =
    announcementContents[
      Math.floor(Math.random() * announcementContents.length)
    ];

  return {
    instructor: instructorId,
    course: courseId,
    title,
    content,
    publishedAt: new Date(),
  };
};

const createAnnouncements = async () => {
  try {
    // Obtener todos los instructores
    const instructors = await User.find({ role: "Instructor" });
    if (instructors.length === 0) {
      console.log("No instructors found");
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

    console.log(
      `Found ${instructors.length} instructors and ${courses.length} courses`
    );

    // Crear anuncios aleatorios usando IDs de instructores y cursos válidos
    const announcements = [];
    for (let i = 0; i < 10; i++) {
      // Crear 10 anuncios
      const instructor =
        instructors[Math.floor(Math.random() * instructors.length)];
      const course = courses[Math.floor(Math.random() * courses.length)];
      const announcement = generateRandomAnnouncement(
        instructor._id,
        course._id
      );
      announcements.push(announcement);
    }

    await Announcement.insertMany(announcements);
    console.log("Announcements created successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating announcements:", error);
    mongoose.connection.close();
  }
};

createAnnouncements();
