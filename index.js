const express = require("express");
const connectDatabase = require("./database");
const verificarToken = require('./middlewares/verificarToken')
const path = require('path');
const rateLimit = require('express-rate-limit');
require("dotenv").config();



const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
const PORT = process.env.PORT || 3000;

connectDatabase();
app.get("/", (req, res) => {
    res.send("Api funcionando");
});

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5, 
  message: { mensaje: 'Demasiados intentos de inicio de sesión. Espera unos minutos.' }
})

app.use("/api/login", loginLimiter, require("./routes/login"));

app.use('/api/clientes', verificarToken, require('./routes/clientes'))
app.use('/api/servicios', verificarToken, require('./routes/servicios'))
app.use('/api/mascotas', verificarToken, require('./routes/mascotas'))
app.use('/api/usuarios', verificarToken, require('./routes/usuarios')); 
app.use("/api/accesorios",verificarToken, require("./routes/accesorios"));






app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});