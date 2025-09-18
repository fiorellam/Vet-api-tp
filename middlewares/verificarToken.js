const jwt = require('jsonwebtoken')
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

function verificarToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET || 'clave_super_segura')
        req.usuario = decoded
        next()
    } catch (error) {
        res.status(403).json({ mensaje: 'Token inválido o expirado.' })
    }
}

module.exports = verificarToken