const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require("../models/Usuarios");

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { nombre, correo, password, rol } = req.body

       
        if (
        typeof nombre !== 'string' || nombre.trim() === '' ||
        typeof correo !== 'string' || correo.trim() === '' ||
        typeof password !== 'string' || password.length < 8 ||
        typeof rol !== 'string' || !['admin', 'cliente', 'veterinario'].includes(rol)
        ) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios o son inválidos.' })
        }

       
        const usuarioExistente = await Usuario.findOne({ correo })
        if (usuarioExistente) {
        return res.status(409).json({ mensaje: 'El correo ya está registrado.' })
        }

        
        const salt = await bcrypt.genSalt(10)
        const passwordHasheado = await bcrypt.hash(password, salt)

        const nuevoUsuario = new Usuario({
        nombre,
        correo,
        password: passwordHasheado,
        rol
        })

        await nuevoUsuario.save()

       
        const token = jwt.sign(
        { id: nuevoUsuario._id, correo: nuevoUsuario.correo, rol: nuevoUsuario.rol },
        process.env.JWT_SECRET || 'clave_super_segura',
        { expiresIn: '2h' }
        )

        res.status(201).json({
        usuario: {
            id: nuevoUsuario._id,
            nombre: nuevoUsuario.nombre,
            correo: nuevoUsuario.correo,
            rol: nuevoUsuario.rol
        },
        token
        })

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el usuario.', error })
    }
})

router.get("/", async (req, res) =>{
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

router.get("/:id", async (req, res)=>{
    try{
        const usuario = await Usuario.findById(req.params.id); 
        if(!usuario){
            return res.status(404).json({mensaje: "Usuario no encontrado"}); 
        }
        res.json(usuario); 
    }catch(error){
        res.status(400).json({mensaje: "Error al obtener el usuario", error})
    }

});

router.put('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json({
            mensaje: 'Usuario actualizado correctamente.',
            usuario: usuario
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el usuario.', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const resultado = await Usuario.findByIdAndDelete(req.params.id);
        res.json({
        mensaje: 'Usuario eliminado correctamente',
        servicio: resultado
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar el usuario', error });
    }
});

router.get('/perfil',  async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password')
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' })
        res.json(usuario)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener perfil', error })
    }
})

module.exports = router;