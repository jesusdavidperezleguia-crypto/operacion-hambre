require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Usuario = require("./src/models/Usuario");

console.log("Conectando a MongoDB...");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    console.log("MongoDB conectado");

    const passwordHash = await bcrypt.hash("123456", 10);

    const existe = await Usuario.findOne({
        username:"admin"
    });

    if(existe){
        console.log("El usuario ya existe");
        process.exit();
    }

    await Usuario.create({
        username:"admin",
        password:passwordHash
    });

    console.log("Usuario admin creado");
    process.exit();

})
.catch(err=>{
    console.log("ERROR:");
    console.log(err);
});