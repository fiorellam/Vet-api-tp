const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuarios') // ajusta la ruta según tu estructura

router.post('/', async (req, res) => {
    try {
        const { correo, password } = req.body

        // Validación básica
        if (!correo || !password) {
        return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios.' })
        }


        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas.' })
        }


        const passwordValida = await bcrypt.compare(password, usuario.password)
        if (!passwordValida) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas.' })
        }


        const token = jwt.sign(
        { id: usuario._id, correo: usuario.correo, rol: usuario.rol },
        process.env.JWT_SECRET || 'clave_super_segura',
        { expiresIn: '1h' }
        )

        res.status(200).json({
        usuario: {
            id: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        },
        token
        })

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión.', error })
    }
})

module.exports = router
