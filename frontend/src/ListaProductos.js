import React, { useEffect, useState } from 'react';
import { API_URL } from './api';

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdit, setFormEdit] = useState({ nombre: '', precio: '', cantidad: '', descripcion: '' });

  const fetchProductos = () => {
    setCargando(true);
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener productos');
        return res.json();
      })
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(err => {
        setError(err.message);
        setCargando(false);
      });
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar producto');
      fetchProductos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditar = (prod) => {
    setEditandoId(prod.id);
    setFormEdit({
      nombre: prod.nombre,
      precio: prod.precio,
      cantidad: prod.cantidad,
      descripcion: prod.descripcion
    });
  };

  const handleEditChange = e => {
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    setError(null);
    // Validación básica
    if (!formEdit.nombre.trim() || !formEdit.precio || !formEdit.cantidad || !formEdit.descripcion.trim()) {
      setError('Todos los campos de edición son obligatorios.');
      return;
    }
    if (isNaN(formEdit.precio) || parseFloat(formEdit.precio) <= 0) {
      setError('El precio debe ser un número mayor a 0.');
      return;
    }
    if (isNaN(formEdit.cantidad) || parseInt(formEdit.cantidad) < 0) {
      setError('La cantidad debe ser un número igual o mayor a 0.');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formEdit.nombre.trim(),
          precio: parseFloat(formEdit.precio),
          cantidad: parseInt(formEdit.cantidad),
          descripcion: formEdit.descripcion.trim()
        })
      });
      if (!res.ok) throw new Error('Error al editar producto');
      setEditandoId(null);
      fetchProductos();
    } catch (err) {
      setError(err.message);
    }
  };


  if (cargando) return <div className="spinner"></div>;
  return (
    <div>
      <h2>Lista de Productos</h2>
      {error && <div className="error">Error: {error}</div>}
      {productos.length === 0 && !cargando && <p>No hay productos registrados.</p>}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            editandoId === prod.id ? (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td><input name="nombre" value={formEdit.nombre} onChange={handleEditChange} /></td>
                <td><input name="precio" type="number" step="0.01" value={formEdit.precio} onChange={handleEditChange} /></td>
                <td><input name="cantidad" type="number" value={formEdit.cantidad} onChange={handleEditChange} /></td>
                <td><input name="descripcion" value={formEdit.descripcion} onChange={handleEditChange} /></td>
                <td>
                  <button onClick={handleEditSubmit}>Guardar</button>
                  <button onClick={() => setEditandoId(null)}>Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>{prod.precio}</td>
                <td>{prod.cantidad}</td>
                <td>{prod.descripcion}</td>
                <td>
                  <button onClick={() => handleEditar(prod)}>Editar</button>
                  <button onClick={() => handleEliminar(prod.id)}>Eliminar</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaProductos;
