import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware para proteger rutas
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error("Error al verificar el token:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Middleware para verificar si el usuario es administrador
const admin = (req, res, next) => {
  if (req.user && req.user.role === "Administrador") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden, not an administrator" });
  }
};

// Middleware para verificar si el usuario es instructor
const instructor = (req, res, next) => {
  if (req.user && req.user.role === "Instructor") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden, not an instructor" });
  }
};

export { protect, admin, instructor };
