require("dotenv").config();

const express = require("express");
const cors = require("cors");

const conectarDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const categoriaRoutes = require("./src/routes/categoriaRoutes");
const productoRoutes = require("./src/routes/productoRoutes");

const app = express();

conectarDB();

app.use(cors());

// ESTA LÍNEA ES OBLIGATORIA
app.use(express.json());
app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req,res)=>{
    res.json({
        mensaje:"API Operacion Hambre"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor ${PORT}`);
});