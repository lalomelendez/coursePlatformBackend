Configuración de la Base de Datos con Mongoose
Este archivo configura la conexión a la base de datos MongoDB utilizando Mongoose. A continuación se explica cada parte del código y se proporciona documentación detallada.

Código del Archivo database.js

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected from DB");
    });
  } catch (err) {
    console.error("Error de conexión a MongoDB:", err);
    await mongoose.connection.close(); // Cerrar la conexión en caso de error
    throw err; // Re-lanzar el error para que pueda ser manejado por las pruebas
  }
};

export default connectDB;

Explicación del Código
Importación de Mongoose:
import mongoose from 'mongoose';

Se importa el módulo mongoose para manejar la conexión a MongoDB.
Función connectDB:
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);



Se define una función asíncrona connectDB que intenta conectar a la base de datos MongoDB utilizando la URI almacenada en la variable de entorno MONGO_URI.
Se utilizan las opciones useNewUrlParser y useUnifiedTopology para evitar advertencias de deprecación.
Manejo de Eventos de Conexión: 

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from DB");
});


Se configuran manejadores de eventos para la conexión de Mongoose:
Evento error: Se registra cualquier error de conexión.
Evento disconnected: Se registra cuando Mongoose se desconecta de la base de datos.
Manejo de Errores en la Conexión:


} catch (err) {
  console.error("Error de conexión a MongoDB:", err);
  await mongoose.connection.close(); // Cerrar la conexión en caso de error
  throw err; // Re-lanzar el error para que pueda ser manejado por las pruebas
}



Si ocurre un error durante la conexión, se captura en el bloque catch.
Se registra el error y se cierra la conexión a la base de datos.
El error se vuelve a lanzar para que pueda ser manejado por otras partes del código, como pruebas automatizadas.
Exportación de la Función connectDB:

export default connectDB;



Se exporta la función connectDB para que pueda ser utilizada en otras partes de la aplicación.
Documentación

Función connectDB
Descripción: Conecta a la base de datos MongoDB utilizando Mongoose.
Parámetros: Ninguno
Retorno: Ninguno
Errores: Lanza un error si la conexión a la base de datos falla.
Eventos:
    error: Se dispara cuando ocurre un error en la conexión de Mongoose.
    disconnected: Se dispara cuando Mongoose se desconecta de la base de datos.

Ejemplo de Uso

import connectDB from './config/database.js';

const startServer = async () => {
  try {
    await connectDB();
    // Iniciar el servidor aquí
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
    process.exit(1); // Salir del proceso con un error
  }
};

startServer();




Conclusión
Este archivo configura la conexión a MongoDB utilizando Mongoose, maneja eventos de conexión y errores, y exporta la función connectDB para su uso en otras partes de la aplicación. Asegúrate de manejar adecuadamente los errores de conexión y de cerrar la conexión en caso de fallos para mantener la estabilidad de la aplicación.