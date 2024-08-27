// __tests__/database.test.js

const mongoose = require("mongoose");
const connectDB = require("../config/database");

// Mock de la función connect de mongoose
jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("Database Connection", () => {
  it("should connect to MongoDB", async () => {
    process.env.MONGO_URI = "mongodb://localhost:27017/testdb";

    mongoose.connect.mockResolvedValueOnce("MongoDB connected");

    console.log = jest.fn();

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
    expect(console.log).toHaveBeenCalledWith("MongoDB connected");
  });

  it("should handle connection errors", async () => {
    const errorMessage = "Connection error";
    mongoose.connect.mockRejectedValueOnce(new Error(errorMessage));

    console.error = jest.fn();
    process.exit = jest.fn();

    await connectDB();

    expect(console.error).toHaveBeenCalledWith(errorMessage);
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
