
const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    rol: {
        type: String,
        enum: ['admin', 'cliente', 'veterinario'],
        default: 'cliente',
        required: true
    }
})

module.exports = mongoose.model("Usuarios", UsuarioSchema);
