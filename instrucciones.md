// Este archivo lo creo solo con la finalidad de tener aqui todo lo debe contener la api
# Tareas del proyecto
## Elige tu Tema
    - [✅] Libertad creativa: Elige un tema que te apasione. Puede ser un ecommerce, una red social, un sistema de reservas, una plataforma de cursos, un blog, o cualquier otra idea que te motive.
    • Requisitos técnicos:
    - [✅] Debe incluir al menos dos entidades principales (por ejemplo: usuarios y productos, reservas y clientes, posts y comentarios).
    - [❌]Define claramente las funcionalidades que tendrá tu API (por ejemplo: registro de usuarios, creación de posts, reservas, etc.).
## 2. Diseña la Base de Datos
-[✅]Importante: Si vas a hacer un front (opcional) te recomiendo usar como base de datos MongoDB para que cuando hagas el deploy, uses la versión en la nube (Esto queda a tu elección) Si no haras deploy, puedes usar MySQL con su ORM.
## Crea los Endpoints
-[✅]• Configura Express para crear un servidor básico.
-[✅]• Define las rutas para cada entidad (usuarios, productos, reservas, etc.).
• Implementa los siguientes endpoints para cada entidad:
    -[✅] GET para obtener todos los registros.
    -[✅] GET para obtener un registro por ID.
    -[✅] POST para crear un nuevo registro.
    -[✅]PUT para actualizar un registro existente.
    -[✅]DELETE para eliminar un registro.
• Asegúrate de que los endpoints estén bien organizados y sigan las mejores prácticas de REST.
## 5. Implementa Seguridad
- [✅] Protege las contraseñas: Usa bcrypt para hashear y almacenar las contraseñas de forma segura.
- [✅] Valida los datos: Asegúrate de que los datos enviados a la API estén validados (por ejemplo: campos obligatorios, formato de email, etc.).
- [✅] Protege los endpoints: Implementa rate limiting para prevenir ataques de fuerza bruta.
## 6. Prueba tu API
- [❌] Usa Postman para probar todos los endpoints de tu API.
- [❌] Asegúrate de que todas las operaciones CRUD funcionen correctamente.
- [❌]Prueba casos extremos (por ejemplo: enviar datos incorrectos, intentar eliminar un registro que no existe, etc.).
## 7. Crea un Frontend Básico (OPCIONAL)
- [❌] Desarrolla una vista básica en HTML y CSS para interactuar con tu API.
- [❌] Puede ser un formulario para crear registros, una lista para mostrar datos, o cualquier otra interfaz simple.
- [❌] Usa fetch o axios para hacer solicitudes a tu API desde el frontend
## 8. Documenta tu Proyecto
- [❌] Crea un archivo README.md con la siguiente información:
- [❌] Descripción del proyecto.
- [❌] Instrucciones para instalar y ejecutar el proyecto.
- [❌] Explicación de los endpoints disponibles.
- [❌] Capturas de pantalla o ejemplos de uso. (Opcional)
- [❌] Exporta la colección de Postman y agrega un enlace o archivo en la documentación.
## 9. Despliega tu Proyecto en Render (Si hicieron un Front End)
IMPORTANTE: Si van a desplegar, pueden optar por usar mongoDB como base de datos y hacer la integración sencilla como vimos clases pasadas.
- [❌] Despliega tu API en Render:
o Crea una cuenta en Render (https://render.com).
o Sigue los pasos para desplegar un servicio web.
o Conecta tu repositorio de GitHub a Render.
o Configura las variables de entorno necesarias (por ejemplo: credenciales de la base de datos).
o Asegúrate de que la base de datos también esté disponible en la nube
• Proporciona la URL de tu API desplegada en la documentación.
## 10. Envía el Repositorio a Discord
- [✅] Sube tu proyecto a GitHub:
- [✅] Crea un repositorio en GitHub.
- [✅] Sube todos los archivos de tu proyecto al repositorio.
- [✅] Asegúrate de que el repositorio sea público para que puedas compartirlo.
- [❌] Envía el enlace del repositorio a Discord:
- [❌] Copia el enlace de tu repositorio de GitHub.
- [❌] Envía el enlace al canal de Discord designado por tu profesora.
## Criterios de Evaluación:
    - [❌]1. Funcionalidad: La API debe funcionar correctamente y cumplir con todos los requisitos.
    - [❌]2. Código Limpio: El código debe estar bien organizado, con buenas prácticas y comentarios claros.
    - [❌]3. Seguridad: Las contraseñas deben estar protegidas y los endpoints deben ser seguros.
    - [❌]4. Documentación:El proyecto debe estar bien documentado, con instrucciones claras para su uso.
    - [❌]5. Creatividad: El proyecto debe demostrar originalidad y un enfoque único.
    - [❌]6. Despliegue: (Opcional) La API debe estar desplegada en Render y ser accesible desde la URL proporcionada. 