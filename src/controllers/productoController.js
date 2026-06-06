const Producto = require("../models/Producto");

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find().populate("categoria");

        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// Obtener producto por ID
exports.obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate("categoria");

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.status(200).json(producto);

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// Crear producto
exports.crearProducto = async (req, res) => {
    try {

        const producto = new Producto(req.body);

        await producto.save();

        res.status(201).json(producto);

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
    try {

        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.status(200).json(producto);

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
    try {

        const producto = await Producto.findByIdAndDelete(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Producto eliminado correctamente"
        });

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

exports.dashboard = async (req, res) => {

    try {

        const totalProductos =
            await Producto.countDocuments();

        const productosDisponibles =
            await Producto.countDocuments({
                disponible: true
            });

        const stockBajo =
            await Producto.countDocuments({
                stock: { $lt: 10 }
            });

        res.json({
            totalProductos,
            productosDisponibles,
            stockBajo
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};