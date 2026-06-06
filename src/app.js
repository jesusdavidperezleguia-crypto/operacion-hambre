const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');
const iaRoutes = require('./routes/iaRoutes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Enlazar las rutas modulares
app.use('/api/menu', menuRoutes);
app.use('/api/ia', iaRoutes);

// Ruta base de chequeo
app.get('/', (req, res) => {
    res.send('🛰️ Central de Operación Hambre en línea.');
});

module.exports = app;