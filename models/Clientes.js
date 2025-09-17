const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClienteSchema = new  mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type:String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    mascota: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:"Mascotas"
    } }, {
    versionKey: false 
});

module.exports = mongoose.model("Clientes", ClienteSchema);