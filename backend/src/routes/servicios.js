const express = require("express");

const Servicio = require("../models/Servicios");

const router = express.Router();

const verificarToken = require("../middlewares/verificarToken"); 

router.post("/",  async (req, res) => {
    try {
        const nuevoServicio = new Servicio(req.body);
        await nuevoServicio.save();
        res.status(201).json(nuevoServicio);

    } catch (error){
        res.status(400).json({mensaje: "Error al crear el servicio.", error});
    }
});

router.get("/", async(req, res)=>{
    try{
        const servicios = await Servicio.find().populate("mascota").populate("duenio");
        res.json(servicios); 
    }catch(error){
        res.status(500).json({mensaje: "Error al obtener el servicio", error})
    }
}); 

router.get("/:id", async (req, res)=>{
    try{
        const servicio = await Servicio.findById(req.params.id).populate("mascota").populate("duenio");
        if(!servicio){
            return res.status(404).json({mensaje: "Servicio no encontrado"}); 
        }
        res.json(servicio); 
    }catch(error){
        res.status(400).json({mensaje: "Error al obtener el servicio", error})
    }

});

router.put('/:id', verificarToken, async (req, res) => {
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

router.delete('/:id', verificarToken, async (req, res) => {
    try {
        const resultado = await Servicio.findByIdAndDelete(req.params.id);
        res.json({
        mensaje: 'Servicio eliminado correctamente',
        servicio: resultado
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar el servicio', error });
    }
});

module.exports = router;