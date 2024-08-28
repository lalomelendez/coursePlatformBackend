// controllers/userController.js

// Función para obtener un usuario
const getUser = (req, res) => {
  const userId = req.params.id;
  // Lógica para obtener el usuario por ID
  res.send(`Obteniendo usuario con ID: ${userId}`);
};

// Función para crear un usuario
const createUser = (req, res) => {
  const userData = req.body;
  // Lógica para crear un nuevo usuario
  res.send("Usuario creado exitosamente");
};

module.exports = {
  getUser,
  createUser,
};
