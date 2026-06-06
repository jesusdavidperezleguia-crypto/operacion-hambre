import { useState } from "react";

function EditarProducto({ producto, recargar }) {

  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);
  const [stock, setStock] = useState(producto.stock);

  const actualizarProducto = async () => {

    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:3000/api/productos/${producto._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre,
          precio,
          stock
        })
      }
    );

    recargar();

    alert("Producto actualizado");
  };

  return (
    <div>

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="number"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />

      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <button onClick={actualizarProducto}>
        ✏️ Guardar
      </button>

    </div>
  );
}

export default EditarProducto;