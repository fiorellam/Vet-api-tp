const mongoose = require("mongoose"); 

const MascotaSchema = new mongoose.Schema({
    nombre: {type: String, required: true}, 

    duenioMascota: {type: mongoose.Schema.Types.ObjectId, ref: "Clientes"},

    tipo: {type: String, required: true}, 

    raza: {type: String}, 

    edad: {type: Number}
}); 

module.exports = mongoose.model("Mascotas", MascotaSchema); 
