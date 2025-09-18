const express = require("express");
const connectDatabase = require("./database");
const verificarToken = require('./middlewares/verificarToken')
const path = require('path');
require("dotenv").config();



const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
const PORT = process.env.PORT || 3000;

connectDatabase();
app.get("/", (req, res) => {
    res.send("Api funcionando");
});

app.use("/api/login", require("./routes/login"));

app.use('/api/clientes', verificarToken, require('./routes/clientes'))
app.use('/api/servicios', verificarToken, require('./routes/servicios'))
app.use('/api/mascotas', verificarToken, require('./routes/mascotas'))
app.use('/api/usuarios', verificarToken, require('./routes/usuarios')); 
//app.use('/api/usuarios/perfil', verificarToken, require('./routes/usuarios'))



app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});