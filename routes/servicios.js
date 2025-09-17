const express = require("express");

const Servicio = require("../models/Servicios");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const nuevoServicio = new Servicio(req.body);
        await nuevoServicio.save();
        res.status(201).json(nuevoServicio);

    } catch (error){
        res.status(400).json({mensaje: "Error al crear el servicio.", error});
    }
});

router.get("/", async (req, res) =>{
    const servicios = await Servicio.find();
    res.json(servicios);
});

router.put('/:id', async (req, res) => {
    try {
        const servicio = await Servicio.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!servicio) {
            return res.status(404).json({ mensaje: 'Servicio no encontrado' });
        }
        res.json({
            mensaje: 'Servicio actualizado correctamente.',
            servicio: servicio
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el servicio.', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const resultado = await Cliente.findByIdAndDelete(req.params.id);
        res.json({
        mensaje: 'Servicio eliminado correctamente',
        servicio: resultado
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar el servicio', error });
    }
});

module.exports = router;