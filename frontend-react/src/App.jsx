import { useEffect, useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProductoForm from "./components/ProductoForm";
import EditarProducto from "./components/EditarProducto";
function App() {

  const [productos, setProductos] = useState([]);

  const cargarProductos = () => {
    const eliminarProducto = async (id) => {

  const token = localStorage.getItem("token");

  const confirmar = window.confirm(
    "¿Desea eliminar este producto?"
  );

  if (!confirmar) return;

  await fetch(
    `http://localhost:3000/api/productos/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  cargarProductos();
};
    fetch("http://localhost:3000/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
  <div className="container">

      <h1>🍔 Operación Hambre</h1>

      <Login />

      <Dashboard />

      <ProductoForm
        recargar={cargarProductos}
      />

      <hr />

      <h2>Productos</h2>

      {productos.map((producto) => (

  <div
  key={producto._id}
  className="producto"
>

    <EditarProducto
  producto={producto}
  recargar={cargarProductos}
/>

    <button
      onClick={() => eliminarProducto(producto._id)}
    >
      🗑️ Eliminar
    </button>

    <hr />

  </div>

))}

    </div>
  );
}

export default App;