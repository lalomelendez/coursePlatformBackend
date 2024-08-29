import mongoose from "mongoose";
import User from "../models/userModel.js"; // Asegúrate de que la ruta sea correcta
import dotenv from "dotenv";

dotenv.config();

const firstNames = [
  "John",
  "Jane",
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Hank",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Martinez",
  "Hernandez",
];
const roles = ["Instructor", "Estudiante", "Administrador"];

const generateRandomUser = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
  const password = "password123"; // Puedes generar contraseñas aleatorias si lo prefieres
  const role = roles[Math.floor(Math.random() * roles.length)];

  return {
    name: `${firstName} ${lastName}`,
    email,
    password,
    role,
    profile: {
      bio: `I am ${firstName} ${lastName}, interested in learning MERN stack.`,
      profilePicture: `https://example.com/profiles/${firstName.toLowerCase()}_${lastName.toLowerCase()}.jpg`,
      interests: ["JavaScript", "Node.js", "React"],
    },
    courses: [],
  };
};

const createUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const users = new Set();
    while (users.size < 100) {
      const user = generateRandomUser();
      users.add(JSON.stringify(user));
    }

    const userArray = Array.from(users).map((user) => JSON.parse(user));
    await User.insertMany(userArray);
    console.log("100 users created successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating users:", error);
    mongoose.connection.close();
  }
};

createUsers();
