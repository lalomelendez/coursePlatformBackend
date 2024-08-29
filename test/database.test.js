// test/database.test.js
import mongoose from "mongoose";
import { expect } from "chai";
import connectDB from "../config/database.js";

describe("Database Connection", function () {
  this.timeout(40000); // Aumentar el tiempo de espera para la conexión a la base de datos

  beforeEach(async () => {
    // Cerrar la conexión antes de cada prueba
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  });

  it("should connect to the database successfully", async () => {
    await connectDB();
    expect(mongoose.connection.readyState).to.equal(1); // 1 significa conectado
  });

  it("should handle connection errors", async () => {
    // Guardar la URI original
    const originalURI = process.env.MONGO_URI;
    // Cambiar la URI a una incorrecta
    process.env.MONGO_URI = "mongodb://invalid:27017/test";

    try {
      await connectDB();
    } catch (err) {
      expect(err).to.exist;
    } finally {
      // Restaurar la URI original
      process.env.MONGO_URI = originalURI;
      // Cerrar la conexión si está abierta
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
      }
    }
  });

  after(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  });
});
