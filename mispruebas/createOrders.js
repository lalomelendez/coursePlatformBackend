import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Course from "../models/courseModel.js";
import Order from "../models/orderModel.js";

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

const paymentMethods = ["credit card", "PayPal"];

const generateRandomOrder = (userId, courseIds) => {
  const paymentMethod =
    paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
  const status = ["completed", "pending", "refunded"][
    Math.floor(Math.random() * 3)
  ];

  return {
    user: userId,
    coursesPurchased: courseIds,
    purchaseDate: new Date(),
    status,
    paymentMethod,
  };
};

const createOrders = async () => {
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

    // Crear pedidos aleatorios usando IDs de usuarios y cursos válidos
    const orders = [];
    for (let i = 0; i < 10; i++) {
      // Crear 10 pedidos
      const user = users[Math.floor(Math.random() * users.length)];
      const courseCount = Math.floor(Math.random() * courses.length) + 1; // Número aleatorio de cursos por pedido
      const courseIds = [];
      for (let j = 0; j < courseCount; j++) {
        const course = courses[Math.floor(Math.random() * courses.length)];
        courseIds.push(course._id);
      }
      const order = generateRandomOrder(user._id, courseIds);
      orders.push(order);
    }

    await Order.insertMany(orders);
    console.log("Orders created successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating orders:", error);
    mongoose.connection.close();
  }
};

createOrders();
