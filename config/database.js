import mongoose from "mongoose";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Leer la cadena de conexión desde las variables de entorno
    console.log("MONGO_URI:", mongoURI); // Verificar que la variable de entorno se está cargando

    await mongoose.connect(mongoURI);
    console.log("Conexión a MongoDB exitosa");

    // Gestionar eventos de conexión
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected from DB");
    });
    // Cerrar la conexión al apagar la aplicación
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("Mongoose connection closed due to app termination");
      process.exit(0);
    });
  } catch (err) {
    console.error("Error de conexión a MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
