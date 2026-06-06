const Producto = require('../models/Producto');

// 1. OBTENER TODOS LOS PRODUCTOS (READ)
exports.obtenerMenu = async (req, res) => {
    try {
        const productos = await Producto.find();
        
        // Si la base de datos portátil está vacía, sembramos datos iniciales para Distribuidora El Caribe
        if (productos.length === 0) {
            const inventarioInicial = [
                { nombre: "Combo Táctico", categoria: "Combos", precio: 14000, stock: 20 },
                { nombre: "Hamburguesa Supremacía", categoria: "Hamburguesas", precio: 18000, stock: 15 },
                { nombre: "Papas de Impacto", categoria: "Acompañamientos", precio: 6000, stock: 50 }
            ];
            const productosInsertados = await Producto.insertMany(inventarioInicial);
            return res.status(201).json(productosInsertados);
        }
        
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el inventario', error: error.message });
    }
};

// 2. CREAR UN NUEVO PRODUCTO (CREATE) - Operación clave de la profesora
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, categoria, precio, stock } = req.body;
        
        // Validación manual complementaria (Checklist técnico #5 del TCC)
        if (!nombre || !categoria || precio === undefined || stock === undefined) {
            return res.status(400).json({ mensaje: 'Faltan campos obligatorios para el registro' });
        }

        const nuevoProducto = new Producto({ nombre, categoria, precio, stock });
        await nuevoProducto.save();
        
        res.status(201).json({ mensaje: '📦 Producto registrado con éxito', producto: nuevoProducto });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear producto (Duplicado o inválido)', error: error.message });
    }
};

// 3. ACTUALIZAR UN PRODUCTO (UPDATE) - Operación clave de la profesora
exports.actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, { 
            new: true, 
            runValidators: true // Fuerza a Mongoose a validar que el stock no sea negativo al editar
        });

        if (!productoActualizado) {
            return res.status(404).json({ mensaje: 'El producto no existe en el inventario' });
        }

        res.status(200).json({ mensaje: '🔄 Producto actualizado', producto: productoActualizado });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar', error: error.message });
    }
};

// 4. ELIMINAR UN PRODUCTO (DELETE)
exports.eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const productoEliminado = await Producto.findByIdAndDelete(id);

        if (!productoEliminado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado para eliminación' });
        }

        res.status(200).json({ mensaje: '❌ Producto eliminado correctamente del inventario' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
    }
};