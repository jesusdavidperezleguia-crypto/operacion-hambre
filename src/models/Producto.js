const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({

    nombre:{
        type:String,
        required:[true,"El nombre es obligatorio"],
        trim:true
    },

    
       categoria:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Categoria",
    required:false
},

    precio:{
        type:Number,
        required:[true,"El precio es obligatorio"],
        min:[0,"El precio no puede ser negativo"]
    },

    stock:{
        type:Number,
        default:0,
        min:[0,"El stock no puede ser negativo"]
    },

    disponible:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
});

productoSchema.index({
    nombre:1
});

module.exports = mongoose.model("Producto", productoSchema);