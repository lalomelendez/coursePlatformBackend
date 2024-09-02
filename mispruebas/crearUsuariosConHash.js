import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import connectDB from "../config/database.js";

// Array de nombres y apellidos
const nombres = [
  "Juan",
  "María",
  "Pedro",
  "Ana",
  "Luis",
  "Carlos",
  "Laura",
  "Marta",
  "José",
  "Elena",
];
const apellidos = [
  "Sánchez",
  "Pérez",
  "Gómez",
  "Ruiz",
  "Hernández",
  "Díaz",
  "Moreno",
];

// Array de roles
const roles = ["Instructor", "Estudiante", "Administrador"];

// Array de servicios de email
const emailServices = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "example.com",
];

// Función para obtener un elemento aleatorio de un array
const getRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

// Crear un nuevo usuario
const createUser = async (name, email, password, role) => {
  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("El usuario ya existe:", email);
      return false;
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Contraseña encriptada:", hashedPassword);

    // Crear un nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Guardar el usuario en la base de datos
    await newUser.save();
    console.log("Usuario registrado exitosamente:", email);
    return true;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return false;
  }
};

// Ejecutar el script
const run = async () => {
  await connectDB();

  let createdUsers = 0;
  const usedEmails = new Set();

  while (createdUsers < 100) {
    const name = `${getRandomElement(nombres)} ${getRandomElement(apellidos)}`;
    let email;
    do {
      const emailService = getRandomElement(emailServices);
      email = `${name.replace(" ", ".").toLowerCase()}@${emailService}`;
    } while (usedEmails.has(email));

    usedEmails.add(email);
    const password = "password123"; // Puedes generar contraseñas aleatorias si lo prefieres
    const role = getRandomElement(roles); // Asignar roles aleatorios

    const userCreated = await createUser(name, email, password, role);
    if (userCreated) {
      createdUsers++;
    }
  }

  console.log(`Se han creado ${createdUsers} usuarios.`);
  process.exit();
};

run();
