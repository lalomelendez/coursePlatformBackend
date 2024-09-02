import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index"; // Cambiado de '../app' a '../index'
import User from "../models/userModel";
import jwt from "jsonwebtoken";

const { expect } = chai;
chai.use(chaiHttp);

// Mock de usuario administrador
const adminUser = {
  _id: "60c72b2f9b1d8b3a4c8e4d2b",
  name: "Admin User",
  email: "admin@example.com",
  role: "admin",
};

// Mock de usuario regular
const regularUser = {
  _id: "60c72b2f9b1d8b3a4c8e4d2c",
  name: "Regular User",
  email: "user@example.com",
  role: "user",
};

// Generar tokens JWT
const adminToken = jwt.sign(
  { id: adminUser._id, role: adminUser.role },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);
const userToken = jwt.sign(
  { id: regularUser._id, role: regularUser.role },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

describe("User Routes", () => {
  before(async () => {
    // Configurar datos iniciales si es necesario
    await User.create(adminUser);
    await User.create(regularUser);
  });

  after(async () => {
    // Limpiar datos después de las pruebas
    await User.deleteMany({});
  });

  it("should allow admin to get all users", (done) => {
    chai
      .request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(2);
        done();
      });
  });

  it("should forbid regular user to get all users", (done) => {
    chai
      .request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it("should allow user to get their profile", (done) => {
    chai
      .request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.email).to.equal(regularUser.email);
        done();
      });
  });

  it("should forbid user to delete another user", (done) => {
    chai
      .request(app)
      .delete(`/api/users/${adminUser._id}`)
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it("should allow admin to delete a user", (done) => {
    chai
      .request(app)
      .delete(`/api/users/${regularUser._id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
