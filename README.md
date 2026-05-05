# USB Connect - README del Proyecto

## 1. Descripción del proyecto

USB Connect es una plataforma académica pensada para estudiantes de la Universidad San Buenaventura. Su objetivo es conectar estudiantes según sus habilidades, carrera, necesidades académicas y publicaciones de ayuda.

El sistema permite registrar usuarios, iniciar sesión, crear perfiles, agregar habilidades, buscar compañeros por conocimiento, publicar solicitudes u ofertas de apoyo y manejar una base inicial de mensajería entre usuarios.

Esta versión corresponde a un MVP funcional, es decir, una primera versión completa para demostrar la idea principal del sistema y dejar preparada la base para futuras mejoras.

---

## 2. Componentes del sistema

El sistema puede entenderse en tres partes principales:

### 2.1 Preprocesador

Es la parte encargada de preparar la información antes de guardarla o procesarla. Incluye validaciones iniciales como:

- Verificar que el usuario ingrese datos obligatorios.
- Validar el correo institucional.
- Preparar la contraseña para ser cifrada.
- Recibir y organizar la información enviada desde el frontend.
- Preparar los datos para enviarlos a la base de datos.

### 2.2 Procesador

Es el núcleo lógico del sistema. Se encarga de ejecutar las acciones principales:

- Registrar usuarios.
- Autenticar usuarios con JWT.
- Buscar usuarios por habilidades o carrera.
- Crear publicaciones.
- Guardar habilidades.
- Registrar mensajes.
- Consultar información desde PostgreSQL.

### 2.3 Posprocesador

Es la parte que entrega una respuesta después de ejecutar la lógica del sistema. Incluye:

- Enviar respuestas JSON al frontend.
- Mostrar mensajes de éxito o error.
- Devolver datos procesados al usuario.
- Preparar la información para visualizarla en la interfaz.
- Mantener una comunicación clara entre backend y frontend.

---

## 3. Tecnologías necesarias para instalar

Para ejecutar el proyecto se necesitan las siguientes tecnologías:

### Backend

- Node.js
- npm
- Express
- PostgreSQL
- JWT
- bcrypt
- CORS
- dotenv

### Frontend

- React
- Vite
- React Router DOM
- Axios

### Base de datos

- PostgreSQL
- pgAdmin o cualquier cliente para administrar la base de datos

### Herramientas recomendadas

- Visual Studio Code
- Git
- Navegador web moderno
- Postman o Thunder Client para probar endpoints

---

## 4. Versiones recomendadas

Las versiones pueden variar según el equipo, pero se recomienda usar:

| Componente | Versión recomendada |
|---|---|
| Node.js | 18.x o superior |
| npm | 9.x o superior |
| PostgreSQL | 14.x o superior |
| React | 18.x |
| Vite | 5.x |
| Express | 4.x |
| Axios | 1.x |
| JWT | 9.x |
| bcrypt | 5.x |

---

## 5. Cómo se corre el proyecto

### 5.1 Crear la base de datos

Entrar a PostgreSQL y crear la base de datos:

```sql
CREATE DATABASE usb_connect;
```

Luego ejecutar el archivo:

```bash
database.sql
```

Este archivo crea las tablas principales del sistema:

- users
- skills
- posts
- messages

---

### 5.2 Ejecutar el backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear el archivo `.env` con las variables necesarias:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=usb_connect
DB_USER=postgres
DB_PASSWORD=tu_contraseña
JWT_SECRET=clave_secreta
```

Ejecutar el servidor:

```bash
npm run dev
```

El backend debería quedar disponible en:

```text
http://localhost:3000
```

---

### 5.3 Ejecutar el frontend

Entrar a la carpeta del frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

El frontend normalmente queda disponible en:

```text
http://localhost:5173
```

---

## 6. Rutas principales del backend

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| POST | /api/auth/register | Registra un nuevo usuario |
| POST | /api/auth/login | Inicia sesión y devuelve token |

### Usuarios

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/users/search?skill=&career= | Busca usuarios por habilidad o carrera |
| GET | /api/users/me | Consulta el perfil del usuario autenticado |
| PUT | /api/users/me | Actualiza el perfil del usuario |
| POST | /api/users/me/skills | Agrega una habilidad |
| DELETE | /api/users/me/skills/:skillId | Elimina una habilidad |

### Publicaciones

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/posts | Lista publicaciones |
| POST | /api/posts | Crea una publicación |

### Mensajes

| Método | Ruta | Descripción |
|---|---|---|
| POST | /api/messages | Envía un mensaje |
| GET | /api/messages/:userId | Consulta mensajes con un usuario |

---

## 7. Diagrama de flujo del sistema

```text
Inicio
  |
  v
Usuario entra a la aplicación
  |
  v
¿Tiene cuenta?
  |--------------------|
  |                    |
 Sí                   No
  |                    |
  v                    v
Iniciar sesión      Registrarse
  |                    |
  v                    v
Validar datos       Guardar usuario
  |                    |
  v                    v
Generar token       Iniciar sesión
  |                    |
  |---------|----------|
            v
      Entrar al sistema
            |
            v
  Consultar perfil / habilidades / publicaciones
            |
            v
  Buscar compañeros o crear publicación
            |
            v
  Enviar o recibir mensajes
            |
            v
          Fin
```

---

## 8. Alcance de esta versión

Esta versión incluye la base funcional del sistema. Permite demostrar el flujo principal de la aplicación, la conexión con base de datos y la comunicación entre frontend y backend.

Mejoras futuras posibles:

- Chat en tiempo real con WebSockets.
- Recuperación de contraseña.
- Subida de foto de perfil.
- Validaciones más avanzadas.
- Grupos de estudio.
- Panel administrativo.
- Notificaciones.
- Mejoras de seguridad.


# New line