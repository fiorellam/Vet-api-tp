const express = require("express");
const cors = require('cors');

const connectDatabase = require("./backend/src/database");
const verificarToken = require('./backend/src/middlewares/verificarToken')
const path = require('path');
const rateLimit = require('express-rate-limit');
require("dotenv").config();



const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, './public')))
const PORT = process.env.PORT || 3000;

connectDatabase();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/inicio/index.html'));
});
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, './public/login/login.html'));
});
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, './public/admin/admin.html'));
});

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5, 
  message: { mensaje: 'Demasiados intentos de inicio de sesión. Espera unos minutos.' }
})

app.use("/api/login", loginLimiter, require("./backend/src/routes/login"));

app.use('/api/clientes', require('./backend/src/routes/clientes'))
app.use('/api/servicios', require('./backend/src/routes/servicios'))
app.use('/api/mascotas', require('./backend/src/routes/mascotas'))
app.use('/api/usuarios', require('./backend/src/routes/usuarios')); 
app.use("/api/accesorios", require("./backend/src/routes/accesorios"));







app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});