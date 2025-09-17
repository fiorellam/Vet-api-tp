const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conectado a Mongo!!")
    } catch (error){
        console.error("Error de conexion a mongo db", error);
        process.exit(1);
    }
}

module.exports = connectDatabase;