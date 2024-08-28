import mongoose from "mongoose";
import logger from "./logger.js";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    logger.info("Conexión a MongoDB exitosa");
  } catch (error) {
    logger.error("Error al conectar a MongoDB", error);
  }

  mongoose.connection.on("disconnected", () => {
    logger.warn("Mongoose desconectado de MongoDB");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    logger.info(
      "Conexión de Mongoose cerrada debido a la terminación de la aplicación"
    );
    process.exit(0);
  });
};

export default connectDB;
