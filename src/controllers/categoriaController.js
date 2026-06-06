const Categoria = require("../models/Categoria");

exports.obtenerCategorias = async(req,res)=>{
    try{
        const categorias = await Categoria.find();
        res.json(categorias);
    }catch(error){
        res.status(500).json({mensaje:error.message});
    }
};

exports.crearCategoria = async(req,res)=>{
    try{

        const categoria = new Categoria(req.body);

        await categoria.save();

        res.status(201).json(categoria);

    }catch(error){
        res.status(500).json({mensaje:error.message});
    }
};