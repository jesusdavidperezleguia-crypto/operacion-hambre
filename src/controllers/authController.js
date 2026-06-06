const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {

        if (!req.body) {
            return res.status(400).json({
                mensaje: "No se recibieron datos"
            });
        }

        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).json({
                mensaje: "Usuario y contraseña son obligatorios"
            });
        }

        const usuario = await Usuario.findOne({ username });

        if (!usuario) {
            return res.status(401).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const passwordValida = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordValida) {
            return res.status(401).json({
                mensaje: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                username: usuario.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }
        );

        res.json({
            mensaje: "Login exitoso",
            token
        });

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};