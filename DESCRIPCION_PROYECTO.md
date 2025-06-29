# Sistema CRUD de Productos para Panadería (en Azure)

## Resumen

Este proyecto es un sistema web sencillo para la gestión de productos de una panadería, enfocado en la funcionalidad CRUD (Crear, Leer, Actualizar, Eliminar) de productos. El principal objetivo es demostrar el despliegue y uso de servicios en la nube de Azure, utilizando al menos 3 servicios principales, y mantener la implementación lo más básica posible para facilitar su desarrollo y presentación.

---

## Objetivos

- Permitir al usuario autenticado gestionar (crear, ver, editar, eliminar) los productos que ofrece la panadería.
- Desplegar la solución en la nube usando servicios gratuitos o de bajo costo de Azure.
- Demostrar separación de frontend y backend, siguiendo buenas prácticas modernas.

---

## Arquitectura de la Solución

### Servicios de Azure Utilizados

1. **Azure Static Web Apps**  
   Aloja el frontend desarrollado en React, permitiendo acceso público desde internet.  
   - *Ventaja:* despliegue sencillo y gratuito para sitios web estáticos modernos.

2. **Azure App Service**  
   Aloja el backend (API REST) desarrollado en Node.js con Express.  
   - *Ventaja:* fácil de desplegar, escala automáticamente, plan gratuito suficiente para pruebas.

3. **Azure SQL Database**  
   Base de datos relacional para almacenar los productos.  
   - *Ventaja:* plan gratuito con suficiente capacidad para un CRUD pequeño.

4. **Azure Active Directory B2C**  
   Servicio de autenticación de usuarios, permitiendo que sólo personas autorizadas accedan al sistema.  
   - *Ventaja:* integración sencilla con apps web y backend, capa gratuita para pruebas.

---

## Detalle de Componentes

### 1. Frontend (React)

- **Funcionalidad:**  
  - Formulario para login de usuario.
  - Vistas para listar, crear, editar y eliminar productos.
  - Consumo de la API REST para todas las operaciones.
  - Interfaz simple y fácil de usar.

- **Despliegue:**  
  - Se publica en Azure Static Web Apps.
  - Accesible desde cualquier navegador web.

### 2. Backend (Node.js + Express)

- **Funcionalidad:**  
  - API RESTful con endpoints para productos:
    - `GET /api/productos` – listar productos
    - `POST /api/productos` – crear producto
    - `PUT /api/productos/:id` – actualizar producto
    - `DELETE /api/productos/:id` – eliminar producto
  - Validación básica de los datos recibidos.
  - Protección de endpoints mediante integración con Azure AD B2C (solo usuarios autenticados pueden acceder).

- **Despliegue:**  
  - Se publica en Azure App Service.

### 3. Base de Datos (Azure SQL Database)

- **Funcionalidad:**  
  - Tabla simple `productos` con campos básicos: id, nombre, precio, cantidad, descripción.
  - Relacionada únicamente con los endpoints CRUD del backend.

### 4. Autenticación (Azure AD B2C)

- **Funcionalidad:**  
  - Permite a los usuarios registrarse e iniciar sesión con email y contraseña.
  - El frontend obtiene un token tras el login y lo usa para llamar al backend.
  - El backend verifica los tokens antes de permitir acceso a los endpoints.

---

## Diagrama de Arquitectura

```
[Usuario/Browser]
      |
      v
[Azure Static Web Apps (React)]
      |
      v
[Azure App Service (Node.js API)]
      |
      v
[Azure SQL Database]
      |
      ^
[Azure AD B2C]
```

---

## Flujos Básicos

1. **Login:**  
   El usuario accede al sitio, se loguea con Azure AD B2C y obtiene un token.

2. **Gestión de Productos:**  
   - Al estar autenticado, puede ver el listado de productos.
   - Puede agregar, editar o eliminar productos desde la web.
   - Cada acción envía una petición al backend, que valida la autenticación.
   - El backend realiza la operación en la base de datos.

---

## Ventajas del Proyecto

- Sencillo de implementar y comprender.
- Usa servicios modernos y gratuitos de Azure.
- Arquitectura desacoplada, fácil de ampliar en el futuro.
- Cumple con los requisitos académicos y es fácil de presentar.

---

## Alcance

- No incluye funcionalidades avanzadas (reportes, inventario complejo, ventas, etc.).
- El enfoque es únicamente el CRUD de productos y la autenticación básica.

---

## Ideal para

- Demostrar conocimientos de arquitectura en la nube.
- Mostrar manejo de tecnologías web modernas.
- Satisfacer los requisitos mínimos del profesor de forma clara y profesional.
