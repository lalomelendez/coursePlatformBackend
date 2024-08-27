// middlewares/authMiddleware.js

const authMiddleware = (req, res, next) => {
  // Aquí iría la lógica de autenticación
  next();
};

module.exports = authMiddleware;
