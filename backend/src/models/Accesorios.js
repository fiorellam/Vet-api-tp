const mongoose = require("mongoose");

const AccesorioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    img: {
        type: String,
    },
    categoria: {
        type: String, 
        required: true
    }, 

});

module.exports = mongoose.model('Accesorio', AccesorioSchema);