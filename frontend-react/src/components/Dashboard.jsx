import { useEffect, useState } from "react";

function Dashboard() {

  const [datos, setDatos] = useState({
    totalProductos: 0,
    productosDisponibles: 0,
    stockBajo: 0
  });

  useEffect(() => {

    fetch("http://localhost:3000/api/productos/dashboard/resumen")
      .then(res => res.json())
      .then(data => setDatos(data))
      .catch(error => console.log(error));

  }, []);

  return (
    <div className="dashboard">

      <h2>📊 Dashboard</h2>

      <div>
        <h3>Total Productos</h3>
        <p>{datos.totalProductos}</p>
      </div>

      <div>
        <h3>Disponibles</h3>
        <p>{datos.productosDisponibles}</p>
      </div>

      <div>
        <h3>Stock Bajo</h3>
        <p>{datos.stockBajo}</p>
      </div>

    </div>
  );
}

export default Dashboard;