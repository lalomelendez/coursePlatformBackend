import mongoose from "mongoose";
import User from "../models/userModel.js"; // Asegúrate de que la ruta sea correcta
import dotenv from "dotenv";

dotenv.config();

const deleteAllUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const result = await User.deleteMany({});
    console.log(`Deleted ${result.deletedCount} users`);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error deleting users:", error);
    mongoose.connection.close();
  }
};

deleteAllUsers();
