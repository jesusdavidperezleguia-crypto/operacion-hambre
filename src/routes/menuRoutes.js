const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Cuando el cliente vaya a /api/menu, llamamos al controlador
router.get('/', menuController.obtenerMenu);

module.exports = router;