import './App.css';
import ListaProductos from './ListaProductos';
import FormularioProducto from './FormularioProducto';
import React, { useState } from 'react';

function App() {
  const [recargar, setRecargar] = useState(false);

  const handleProductoCreado = () => {
    setRecargar(r => !r); // Cambia el estado para forzar recarga
  };

  return (
    <div className="App">
      <h1>Gestión de Productos - Panadería</h1>
      <FormularioProducto onProductoCreado={handleProductoCreado} />
      <ListaProductos key={recargar} />
    </div>
  );
}

export default App;
