import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const datos = await respuesta.json();

      if (respuesta.ok) {
        localStorage.setItem("token", datos.token);

        setMensaje("✅ Login exitoso");
      } else {
        setMensaje(datos.mensaje);
      }
    } catch (error) {
      setMensaje("Error conectando al servidor");
    }
  };

  return (
    <div>
      <h2>Login Administrador</h2>

      <form onSubmit={iniciarSesion}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Iniciar Sesión
        </button>
      </form>

      <p>{mensaje}</p>
    </div>
  );
}

export default Login;