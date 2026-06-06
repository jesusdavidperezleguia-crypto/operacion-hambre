import { useState } from "react";

function ProductoForm({ recargar }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const guardarProducto = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const respuesta = await fetch(
      "http://localhost:3000/api/productos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre,
          precio: Number(precio),
          stock: Number(stock),
          disponible: true
        })
      }
    );

    if (respuesta.ok) {
      setNombre("");
      setPrecio("");
      setStock("");
      recargar();
    }
  };

  return (
    <div>
      <h2>➕ Nuevo Producto</h2>

      <form onSubmit={guardarProducto}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Precio"
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Guardar Producto
        </button>
      </form>
    </div>
  );
}

export default ProductoForm;