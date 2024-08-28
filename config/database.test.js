const mongoose = require("mongoose");
const logger = require("./logger");

jest.mock("mongoose");
jest.mock("./logger");

// Definir mongoose.connection antes de importar connectDB
mongoose.connection = {
  on: jest.fn(),
  close: jest.fn(),
};

const connectDB = require("./database");

describe("Database Connection", () => {
  let originalProcessExit;

  beforeAll(() => {
    originalProcessExit = process.exit;
    jest.spyOn(process, "exit").mockImplementation((code) => {
      console.log(`process.exit called with "${code}"`);
    });

    jest.spyOn(process, "on").mockImplementation((event, callback) => {
      if (event === "SIGINT") {
        callback();
      }
    });
  });

  afterAll(() => {
    process.exit = originalProcessExit;
    jest.restoreAllMocks();
  });

  it("should log successful connection", async () => {
    mongoose.connection.on.mockImplementation((event, callback) => {
      if (event === "connected") {
        callback();
      }
    });

    await connectDB();

    expect(logger.info).toHaveBeenCalledWith("Conexión a MongoDB exitosa");
  });

  it("should log connection error", async () => {
    const error = new Error("Connection error");
    mongoose.connection.on.mockImplementation((event, callback) => {
      if (event === "error") {
        callback(error);
      }
    });

    await connectDB();

    expect(logger.error).toHaveBeenCalledWith(
      "Error al conectar a MongoDB",
      error
    );
  });

  it("should log disconnection", async () => {
    mongoose.connection.on.mockImplementation((event, callback) => {
      if (event === "disconnected") {
        callback();
      }
    });

    await connectDB();

    expect(logger.warn).toHaveBeenCalledWith(
      "Mongoose desconectado de MongoDB"
    );
  });

  it("should close connection on SIGINT", async () => {
    const closeMock = jest.fn();
    mongoose.connection.close = closeMock;

    await connectDB();

    expect(closeMock).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith(
      "Conexión de Mongoose cerrada debido a la terminación de la aplicación"
    );
    expect(process.exit).toHaveBeenCalledWith(0);
  });
});
