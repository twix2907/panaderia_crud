# Panadería Josymar - Sistema CRUD de Productos

Este proyecto es un sistema completo para la gestión de productos de una panadería, desarrollado con React (frontend), Node.js/Express (backend) y Azure SQL Database, desplegado en Azure (App Service y Static Web Apps).

## Características
- CRUD de productos (crear, leer, actualizar, eliminar)
- Frontend moderno y responsivo con React
- Backend estructurado con Express y controladores
- Conexión segura a Azure SQL Database
- Despliegue profesional en Azure
- Buenas prácticas: separación de responsabilidades, validación de datos, manejo de errores

## Estructura del proyecto
```
Proyecto_CC/
├── backend/           # Node.js + Express + conexión a Azure SQL
│   ├── controllers/
│   ├── routes/
│   ├── db.js
│   ├── .env
│   └── ...
├── frontend/          # React (creado con create-react-app)
│   ├── src/
│   │   ├── App.js
│   │   ├── ListaProductos.js
│   │   ├── FormularioProducto.js
│   │   ├── api.js
│   │   └── ...
│   └── ...
└── README.md
```

## Instalación y ejecución local

### Backend
1. Entra a la carpeta backend:
   ```bash
   cd backend
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Configura el archivo `.env` con tus credenciales de Azure SQL.
4. Inicia el servidor:
   ```bash
   npm start
   ```

### Frontend
1. Entra a la carpeta frontend:
   ```bash
   cd frontend
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia la app React:
   ```bash
   npm start
   ```

## Despliegue en Azure

### Backend (App Service)
- Sube la carpeta backend a Azure App Service.
- Configura las variables de entorno en el portal de Azure.

### Frontend (Static Web Apps)
- Genera el build:
  ```bash
  npm run build
  ```
- Despliega usando la CLI de Azure Static Web Apps:
  ```bash
  swa deploy ./build --app-name <NOMBRE_STATIC_WEB_APP> --env production --deployment-token <TOKEN>
  ```

## Uso
- Accede a la URL pública de tu Static Web App para usar el sistema.
- Puedes crear, editar, eliminar y listar productos.

## Buenas prácticas implementadas
- Validación de datos en frontend y backend
- Manejo de errores y mensajes claros al usuario
- Código organizado y reutilizable
- Variables de entorno para credenciales y URLs

## Mejoras futuras
- Autenticación de usuarios
- Filtros y búsqueda de productos
- Tests automatizados
- Mejoras visuales y responsividad avanzada

---

¡Listo para usar, mostrar o seguir mejorando!
