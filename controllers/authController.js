import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // Asegúrate de que la ruta es correcta

// Registrar un nuevo usuario
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    console.log("Intentando registrar usuario:", { name, email, role });

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("El usuario ya existe:", email);
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Contraseña encriptada:", hashedPassword);

    // Crear un nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Guardar el usuario en la base de datos
    await newUser.save();
    console.log("Usuario registrado exitosamente:", email);

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ message: "Error al registrar el usuario", error });
  }
};

// Iniciar sesión de usuario
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Intentando iniciar sesión con:", { email });

    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Usuario no encontrado:", email);
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    console.log("Usuario encontrado:", email);

    // Verificar la contraseña
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(
      "Resultado de la comparación de contraseñas:",
      isPasswordCorrect
    );

    if (!isPasswordCorrect) {
      console.log("Contraseña incorrecta para el usuario:", email);
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Inicio de sesión exitoso para el usuario:", email);

    res.status(200).json({ token, userId: user._id, role: user.role });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};
