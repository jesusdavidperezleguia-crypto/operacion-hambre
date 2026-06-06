const express = require("express");
const router = express.Router();

const productoController = require("../controllers/productoController");
const verificarToken = require("../middlewares/authMiddleware");

router.get("/", productoController.obtenerProductos);
router.get(
    "/dashboard/resumen",
    productoController.dashboard
);
router.get("/:id", productoController.obtenerProductoPorId);

router.post("/",
    verificarToken,
    productoController.crearProducto
);

router.put("/:id",
    verificarToken,
    productoController.actualizarProducto
);

router.delete("/:id",
    verificarToken,
    productoController.eliminarProducto
);

module.exports = router;