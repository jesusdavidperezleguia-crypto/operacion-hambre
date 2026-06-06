exports.generarSugerencia = (req, res) => {
    const { ultimoProducto } = req.body;
    let sugerencia = "Análisis táctico completo. Añade una bebida helada para asentar las provisiones de la misión actual.";

    if (ultimoProducto === 'Táctica') {
        sugerencia = "El 82% de los soldados que eligen una Táctica añaden un Escudero ($15.000) para un blindaje total contra el hambre.";
    } else if (ultimoProducto === 'Supremacía') {
        sugerencia = "¡Elección de alto impacto! Combina tu Supremacía con un combo de papas tácticas y bebida por solo un extra. ¡El 73% de las tropas lo aprueba!";
    } else if (ultimoProducto === 'Impacto Doble') {
        sugerencia = "Operación masiva detectada. Un ataque de este calibre requiere compartir; considera agregar un Terremoto ($20.000) al escuadrón.";
    }

    res.json({ sugerencia });
};