// Rutas de productos
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Listar productos
router.get('/', productosController.listarProductos);
// Crear producto
router.post('/', productosController.crearProducto);
// Actualizar producto
router.put('/:id', productosController.actualizarProducto);
// Eliminar producto
router.delete('/:id', productosController.eliminarProducto);

module.exports = router;
