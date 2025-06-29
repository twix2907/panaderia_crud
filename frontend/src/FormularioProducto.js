import React, { useState } from 'react';
import { API_URL } from './api';

function FormularioProducto({ onProductoCreado }) {
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    cantidad: '',
    descripcion: ''
  });
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setExito(null);
    // Validación de campos
    if (!form.nombre.trim() || !form.precio || !form.cantidad || !form.descripcion.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (isNaN(form.precio) || parseFloat(form.precio) <= 0) {
      setError('El precio debe ser un número mayor a 0.');
      return;
    }
    if (isNaN(form.cantidad) || parseInt(form.cantidad) < 0) {
      setError('La cantidad debe ser un número igual o mayor a 0.');
      return;
    }
    setCargando(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          precio: parseFloat(form.precio),
          cantidad: parseInt(form.cantidad),
          descripcion: form.descripcion.trim()
        })
      });
      if (!res.ok) throw new Error('Error al crear producto');
      setExito('Producto creado correctamente');
      setForm({ nombre: '', precio: '', cantidad: '', descripcion: '' });
      if (onProductoCreado) onProductoCreado();
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h2>Agregar Producto</h2>
      <div>
        <label>Nombre: <input name="nombre" value={form.nombre} onChange={handleChange} required /></label>
      </div>
      <div>
        <label>Precio: <input name="precio" type="number" step="0.01" value={form.precio} onChange={handleChange} required /></label>
      </div>
      <div>
        <label>Cantidad: <input name="cantidad" type="number" value={form.cantidad} onChange={handleChange} required /></label>
      </div>
      <div>
        <label>Descripción: <input name="descripcion" value={form.descripcion} onChange={handleChange} required /></label>
      </div>
      <button type="submit" disabled={cargando}>Agregar</button>
      {cargando && <div className="spinner"></div>}
      {error && <div className="error">{error}</div>}
      {exito && <div className="success">{exito}</div>}
    </form>
  );
}

export default FormularioProducto;
