// Controlador de productos
// Separa la lógica de negocio de las rutas (SRP)

const { getConnection, sql } = require('../db');

// Listar productos desde la base de datos
exports.listarProductos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM productos');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos de la base de datos.' });
  }
};

// Crear producto en la base de datos
exports.crearProducto = async (req, res) => {
  const { nombre, precio, cantidad, descripcion } = req.body;
  if (!nombre || precio == null || cantidad == null || !descripcion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('nombre', sql.NVarChar(100), nombre)
      .input('precio', sql.Decimal(10,2), precio)
      .input('cantidad', sql.Int, cantidad)
      .input('descripcion', sql.NVarChar(255), descripcion)
      .query('INSERT INTO productos (nombre, precio, cantidad, descripcion) OUTPUT INSERTED.* VALUES (@nombre, @precio, @cantidad, @descripcion)');
    res.status(201).json(result.recordset[0]);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto en la base de datos.' });
  }
};

// Actualizar producto en la base de datos
exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, cantidad, descripcion } = req.body;
  if (!nombre || precio == null || cantidad == null || !descripcion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('nombre', sql.NVarChar(100), nombre)
      .input('precio', sql.Decimal(10,2), precio)
      .input('cantidad', sql.Int, cantidad)
      .input('descripcion', sql.NVarChar(255), descripcion)
      .query('UPDATE productos SET nombre=@nombre, precio=@precio, cantidad=@cantidad, descripcion=@descripcion WHERE id=@id');
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.json({ id: parseInt(id), nombre, precio, cantidad, descripcion });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto en la base de datos.' });
  }
};

// Eliminar producto en la base de datos
exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM productos WHERE id=@id');
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.json({ message: 'Producto eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto en la base de datos.' });
  }
};
