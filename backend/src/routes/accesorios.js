const express = require("express");

const Accesorio = require("../models/Accesorios");

const router = express.Router();

router.post("/", async(req, res) => {
    try{
        const nuevoAccesorio = new Accesorio(req.body);
        await nuevoAccesorio.save();
        res.status(201).json(nuevoAccesorio);
    } catch(error){
        res.status(400).json({mensaje: "Error al crear un accesorio", error});
    }
})

router.get("/", async(req, res) => {
    const accesorios = await Accesorio.find();
    res.json(accesorios)
})

router.get("/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const accesorio = await Accesorio.findById(id);
        if(!accesorio){
            return res.status(404).json({mensaje: 'Accesorio con ese id no fue encontrado'});
        }
        res.json(accesorio);
    } catch(error){
        res.status(400).json({mensaje: "Error al encontrar el accesorio", error});
    }
})

router.put("/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const accesorio = await Accesorio.findByIdAndUpdate(id, req.body, {new: true});
        if(!accesorio){
            return res.status(404).json({mensaje: 'Accesorio no encontrado'});
        }
        res.json({mensaje: 'Accesorio actualizado', accesorio});
    } catch(error){
        res.status(400).json({mensaje: 'Error al actualizar el accesorio '}, error);
    }
})

router.delete("/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const accesorioAEliminar = await Accesorio.findByIdAndDelete(id);
        res.json({mensaje: 'Accesorio eliminado'}, accesorioAEliminar);
    } catch(error){
        res.status(400).json({mensaje: 'Error al eliminar el accedorio'}, error);    
    }
});
module.exports = router;