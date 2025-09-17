const express = require("express");
const connectDatabase = require("./database");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDatabase();
app.get("/", (req, res) => {
    res.send("Api funcionando");
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});