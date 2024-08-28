// routes/userRoutes.js

const express = require("express");
const router = express.Router();

// Controladores de usuarios
const { getUser, createUser } = require("../controllers/userController");

// Ruta para obtener un usuario
router.get("/:id", getUser);

// Ruta para crear un usuario
router.post("/", createUser);

module.exports = router;
