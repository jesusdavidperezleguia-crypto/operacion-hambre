const mongoose = require("mongoose");

const conectarDB = async () => {
    try {

        console.log("URI:", process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB conectado");

    } catch (error) {

        console.log("ERROR DE CONEXIÓN:");
        console.log(error);

        process.exit(1);
    }
};

module.exports = conectarDB;