🐾 Vet API: Huellas Bonitas

✏️ Descripción:

Vet API es una API REST para gestionar clientes, mascotas, servicios y accesorios de una clínica veterinaria, utilizando la metodología CRUD (Create, Read, Update, Delete).

🛠️ Tecnologías utilizadas: 

Node.js con Express para el servidor.
MongoDB con Mongoose para la base de datos.
JWT para autenticación.
bcrypt para encriptación de contraseñas.
dotenv para manejo de variables de entorno.
cors para habilitar solicitudes desde distintos orígenes.
express-rate-limit para limitar peticiones y proteger la API.
nodemon (dev) para reinicios automáticos durante el desarrollo.

▶️ Instalación: 

✅ Clonar el repositorio
git clone https://github.com/fiorellam/Vet-api-tp.git
cd vet-api


✅ Instalar dependencias
npm install


✅ Crear un archivo .env con tus variables de entorno, por ejemplo
PORT=3000
MONGODB_URI=mongodb://localhost:27017/vetdb
JWT_SECRET=tu_secreto


✅Ejecutar la API:
npm start         # Para producción
npm run dev       # Para desarrollo con nodemon


🛣 Modelos y Rutas: 

### 1. Clientes
**Modelo:** `Clientes`  
**Descripción:** Gestiona los datos de los dueños de mascotas.  
**Campos principales:**
- `nombre`: Nombre del cliente.
- `telefono`: Número de contacto.
- `direccion`: Dirección del cliente.

**Rutas disponibles:**

| Método | Ruta | Descripción |
|--------|------|------------|
| GET    | `/clientes` | Obtener todos los clientes. |
| GET    | `/clientes/:id` | Obtener un cliente por ID. |
| POST   | `/clientes` | Crear un nuevo cliente. |
| PUT    | `/clientes/:id` | Actualizar datos de un cliente existente. |
| DELETE | `/clientes/:id` | Eliminar un cliente por ID. |

---

### 2. Mascotas
**Modelo:** `Mascotas`  
**Descripción:** Gestiona la información de las mascotas de los clientes.  
**Campos principales:**
- `nombre`: Nombre de la mascota.
- `duenioMascota`: Referencia al ID del cliente dueño.
- `tipo`: Tipo de mascota (perro, gato, etc.).
- `raza`: Raza de la mascota.
- `edad`: Edad de la mascota.

**Rutas disponibles:**

| Método | Ruta | Descripción |
|--------|------|------------|
| GET    | `/mascotas` | Obtener todas las mascotas. |
| GET    | `/mascotas/:id` | Obtener una mascota por ID. |
| POST   | `/mascotas` | Crear una nueva mascota. |
| PUT    | `/mascotas/:id` | Actualizar datos de una mascota existente. |
| DELETE | `/mascotas/:id` | Eliminar una mascota por ID. |

---

### 3. Servicios
**Modelo:** `Servicios`  
**Descripción:** Gestiona los servicios que la clínica ofrece (vacunación, corte de pelo, etc.).  
**Campos principales:**
- `nombre`: Nombre del servicio.
- `descripcion`: Detalle del servicio.
- `tipo`: Tipo del servicio.
- `precio`: Costo del servicio.
- `duenio`: Cliente.
- `mascota`: Mascota.
- `fechaProgramada`: Fecha y hora del servicio.

**Rutas disponibles:**

| Método | Ruta | Descripción |
|--------|------|------------|
| GET    | `/servicios` | Obtener todos los servicios. |
| GET    | `/servicios/:id` | Obtener un servicio por ID. |
| POST   | `/servicios` | Crear un nuevo servicio. |
| PUT    | `/servicios/:id` | Actualizar un servicio existente. |
| DELETE | `/servicios/:id` | Eliminar un servicio por ID. |

---

### 4. Accesorios
**Modelo:** `Accesorios`  
**Descripción:** Gestiona los accesorios disponibles para venta.  
**Campos principales:**
- `nombre`: Nombre del accesorio.
- `descripcion`: Detalle del accesorio.
- `precio`: Precio del accesorio.

**Rutas disponibles:**

| Método | Ruta | Descripción |
|--------|------|------------|
| GET    | `/accesorios` | Obtener todos los accesorios. |
| GET    | `/accesorios/:id` | Obtener un accesorio por ID. |
| POST   | `/accesorios` | Crear un nuevo accesorio. |
| PUT    | `/accesorios/:id` | Actualizar un accesorio existente. |
| DELETE | `/accesorios/:id` | Eliminar un accesorio por ID. |


📁 Estructura del Backend: 

backend/src
├─ middlewares
│  └─ verificarToken.js        # Middleware para validar tokens JWT y proteger rutas
├─ models
│  ├─ Accesorios.js           # Modelo de accesorios
│  ├─ Clientes.js             # Modelo de clientes
│  ├─ Mascotas.js             # Modelo de mascotas
│  ├─ Servicios.js            # Modelo de servicios
│  └─ Usuarios.js             # Modelo de usuarios
├─ routes
│  ├─ accesorios.js           # Rutas CRUD para accesorios
│  ├─ clientes.js             # Rutas CRUD para clientes
│  ├─ login.js                # Ruta para autenticación de usuarios
│  ├─ mascotas.js             # Rutas CRUD para mascotas
│  ├─ servicios.js            # Rutas CRUD para servicios
│  └─ usuarios.js             # Rutas CRUD para usuarios
├─ database.js                # Configuración y conexión a MongoDB
└─ index.js                   # Archivo principal que levanta el servidor

🌐 Acceso a la página: 

// espacio libre para la parte del render!!!!///

🧪 Testing Se pueden realizar pruebas con Postman para verificar los endpoints: 

https://giselle-3602765.postman.co/workspace/Giselle's-Workspace~d4309fb1-b812-47c9-873f-171f544c5057/folder/45504740-975835de-c077-4170-9513-1de72e71b39f?action=share&source=copy-link&creator=45504740&ctx=documentation

🤝 Colaboradores:

Fiorella Rodríguez
Ana Karen Prieto
Giselle Rastenis