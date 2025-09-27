const mongoose = require("mongoose");
const { Schema } = mongoose;

const ServicioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['Accesorios','Consulta', 'Vacunación', 'Cirugía', 'Estética', 'Urgencia', 'Desparasitación'],
        required: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    duenio: {
        type: Schema.Types.ObjectId,
        ref: 'Clientes',
        required: true
    },
    mascota: {
        type: Schema.Types.ObjectId,
        ref: 'Mascotas',
        required: true
    },
    fechaProgramada: {
        type: Date,
        required: true
    }}, {
    versionKey: false
})

module.exports = mongoose.model('Servicios', ServicioSchema)