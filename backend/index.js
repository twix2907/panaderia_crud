const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permitir peticiones desde cualquier origen (CORS)
app.use(express.json()); // Para aceptar JSON en las peticiones

// Rutas
const productosRoutes = require('./routes/productos');
app.use('/api/productos', productosRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola mundo desde el backend de la panadería!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
