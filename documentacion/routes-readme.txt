Documentación de Rutas de Autenticación y Cambios en Rutas Existentes
Introducción
Esta documentación cubre las nuevas rutas de autenticación y los cambios realizados en las rutas existentes para manejar la autenticación y autorización utilizando tokens JWT. También se incluyen ejemplos de cómo usar los tokens JWT en las solicitudes.

Nuevas Rutas de Autenticación
Registro de Usuario
URL: /api/users/register
Método: POST
Descripción: Registra un nuevo usuario.
Headers: Ninguno
Body (raw, JSON)

{
  "name": "Juan Pérez",
  "email": "juan.perez@example.com",
  "password": "password123",
  "role": "Estudiante"
}

Respuesta Exitosa (201 Created):

{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "60d5ce8fe2d70da3e4b2dc6d",
    "name": "Juan Pérez",
    "email": "juan.perez@example.com",
    "role": "Estudiante",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}


Inicio de Sesión
URL: /api/users/login
Método: POST
Descripción: Inicia sesión un usuario existente.
Headers: Ninguno

{
  "email": "juan.perez@example.com",
  "password": "password123"
}

Respuesta Exitosa (200 OK):

{
  "message": "Inicio de sesión exitoso",
  "user": {
    "id": "60d5ce8fe2d70da3e4b2dc6d",
    "name": "Juan Pérez",
    "email": "juan.perez@example.com",
    "role": "Estudiante",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}


Cambios en Rutas Existentes
Obtener Todos los Usuarios (Solo Administradores)
URL: /api/users
Método: GET
Descripción: Obtiene una lista de todos los usuarios (solo accesible por administradores).
Headers:
Authorization: Bearer <tu_token>




[
  {
    "id": "60d5ce8fe2d70da3e4b2dc6d",
    "name": "Juan Pérez",
    "email": "juan.perez@example.com",
    "role": "Estudiante"
  },
  ...
]


Crear un Nuevo Usuario (Solo Administradores)
URL: /api/users
Método: POST
Descripción: Crea un nuevo usuario (solo accesible por administradores).
Headers:
Authorization: Bearer <tu_token>
Body (raw, JSON):

{
  "name": "Nuevo Usuario",
  "email": "nuevo.usuario@example.com",
  "password": "password123",
  "role": "Estudiante"
}

Respuesta Exitosa (201 Created):

{
  "message": "Usuario creado exitosamente",
  "user": {
    "id": "60d5ce8fe2d70da3e4b2dc6d",
    "name": "Nuevo Usuario",
    "email": "nuevo.usuario@example.com",
    "role": "Estudiante"
  }
}

Obtener un Usuario por ID (Solo Administradores)
URL: /api/users/:id
Método: GET
Descripción: Obtiene un usuario por ID (solo accesible por administradores).
Headers:
Authorization: Bearer <tu_token>
Respuesta Exitosa (200 OK):


{
  "id": "60d5ce8fe2d70da3e4b2dc6d",
  "name": "Juan Pérez",
  "email": "juan.perez@example.com",
  "role": "Estudiante"
}

Actualizar un Usuario (Solo Administradores)
URL: /api/users/:id
Método: PUT
Descripción: Actualiza un usuario (solo accesible por administradores).
Headers:
Authorization: Bearer <tu_token>
Body (raw, JSON):

{
  "name": "Usuario Actualizado",
  "email": "usuario.actualizado@example.com",
  "role": "Estudiante"
}


Respuesta Exitosa (200 OK):


{
  "message": "Usuario actualizado exitosamente",
  "user": {
    "id": "60d5ce8fe2d70da3e4b2dc6d",
    "name": "Usuario Actualizado",
    "email": "usuario.actualizado@example.com",
    "role": "Estudiante"
  }
}


Eliminar un Usuario (Solo Administradores)
URL: /api/users/:id
Método: DELETE
Descripción: Elimina un usuario (solo accesible por administradores).
Headers:
Authorization: Bearer <tu_token>
Respuesta Exitosa (200 OK):


{
  "message": "Usuario eliminado exitosamente"
}



Obtener el Perfil del Usuario Autenticado (Instructores y Administradores)
URL: /api/users/profile
Método: GET
Descripción: Obtiene el perfil del usuario autenticado (accesible por instructores y administradores).
Headers:
Authorization: Bearer <tu_token>
Respuesta Exitosa (200 OK):



{
  "id": "60d5ce8fe2d70da3e4b2dc6d",
  "name": "Juan Pérez",
  "email": "juan.perez@example.com",
  "role": "Estudiante"
}

Actualizar el Perfil del Usuario Autenticado (Instructores y Administradores)
URL: /api/users/profile
Método: PUT
Descripción: Actualiza el perfil del usuario autenticado (accesible por instructores y administradores).
Headers:
Authorization: Bearer <tu_token>
Body (raw, JSON):

{
  "name": "Nombre Actualizado",
  "email": "email.actualizado@example.com",
  "password": "nuevoPassword123"
}


Respuesta Exitosa (200 OK):

{
  "message": "Perfil actualizado exitosamente",
  "user": {
    "id": "60d5ce8fe2d70da3e4b2dc6d",
    "name": "Nombre Actualizado",
    "email": "email.actualizado@example.com",
    "role": "Estudiante"
  }
}

Ejemplos de Uso de Tokens JWT en Solicitudes
Ejemplo de Solicitud con Token JWT
Para realizar solicitudes a rutas protegidas, debes incluir el token JWT en los encabezados de la solicitud. Aquí tienes un ejemplo de cómo hacerlo en Postman:

Método: GET
URL: http://localhost:3000/api/users
Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Ejemplo de Solicitud en cURL

curl -X GET http://localhost:3000/api/users \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

Conclusión
Esta documentación proporciona una guía detallada sobre las nuevas rutas de autenticación y los cambios en las rutas existentes, junto con ejemplos de cómo usar los tokens JWT en las solicitudes. Asegúrate de seguir estos ejemplos para interactuar correctamente con la API protegida.