const express = require('express');
const router = express.Router();
const iaController = require('../controllers/iaController');

// Ruta POST para analizar el carrito
router.post('/recomendar', iaController.generarSugerencia);

module.exports = router;