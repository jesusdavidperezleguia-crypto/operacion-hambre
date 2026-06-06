const mongoose = require("mongoose");

const movimientoSchema = new mongoose.Schema({

    producto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Producto"
    },

    tipo:{
        type:String,
        enum:["entrada","salida"]
    },

    cantidad:{
        type:Number,
        required:true
    },

    fecha:{
        type:Date,
        default:Date.now
    },

    usuario:{
        type:String
    }

});

module.exports = mongoose.model("Movimiento", movimientoSchema);