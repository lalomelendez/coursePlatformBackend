import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Message from "../models/messageModel.js";

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

const messagesContent = [
  "Hello, how are you?",
  "Can we schedule a meeting?",
  "I have a question about the course.",
  "Thank you for your help!",
  "Let's catch up soon.",
];

const generateRandomMessage = (senderId, receiverId) => {
  const content =
    messagesContent[Math.floor(Math.random() * messagesContent.length)];

  return {
    sender: senderId,
    receiver: receiverId,
    content,
    sentAt: new Date(),
  };
};

const createMessages = async () => {
  try {
    // Obtener todos los usuarios
    const users = await User.find();
    if (users.length === 0) {
      console.log("No users found");
      mongoose.connection.close();
      return;
    }

    console.log(`Found ${users.length} users`);

    // Crear mensajes aleatorios usando IDs de usuarios válidos
    const messages = [];
    for (let i = 0; i < 10; i++) {
      // Crear 10 mensajes
      const sender = users[Math.floor(Math.random() * users.length)];
      let receiver;
      do {
        receiver = users[Math.floor(Math.random() * users.length)];
      } while (receiver._id.equals(sender._id)); // Asegurarse de que el receptor no sea el mismo que el remitente

      const message = generateRandomMessage(sender._id, receiver._id);
      messages.push(message);
    }

    await Message.insertMany(messages);
    console.log("Messages created successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating messages:", error);
    mongoose.connection.close();
  }
};

createMessages();
