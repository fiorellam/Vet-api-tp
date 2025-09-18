const express = require("express"); 
const router = express.Router(); 

const Mascota = require("../models/Mascotas"); 

router.post("/", async(req, res)=>{
    try{
    const nuevaMascota = new Mascota(req.body); 
    await nuevaMascota.save(); 

    res.status(201).json(nuevaMascota); 
    }catch(error){
    res.status(400).json({mensaje: "Error al crear la mascota", error}); 
    }
}); 

router.get("/", async(req, res)=>{
    try{
    const mascotas = await Mascota.find().populate("duenioMascota"); 
    res.json(mascotas); 
    }catch(error){
        res.status(500).json({mensaje: "Error al obtener las mascotas", error})
    }
}); 

router.get("/:id", async (req, res)=>{
    try{
        const mascota = await Mascota.findById(req.params.id).populate("duenioMascota"); 
        if(!mascota){
            return res.status(404).json({mensaje: "Mascota no encontrada"}); 
        }
        res.json(mascota); 
    }catch(error){
        res.status(400).json({mensaje: "Error al obtener la mascota", error})
    }

}); 

router.put("/:id", async (req, res)=>{
    try{
    const mascota = await Mascota.findByIdAndUpdate(req.params.id, req.body, {new:true}); 
    if(!mascota){
        return res.status(404).json({mensaje: "Mascota no encontrada"}); 
    }
    res.json({mensaje: "Mascota actualizada correctamente", mascota}); 
    }catch(error){
    res.status(400).json({mensaje:  "Error al actualizar la mascota", error})
    }
});  

router.delete("/:id", async (req, res)=>{
    try{
    const mascota = await Mascota.findByIdAndDelete(req.params.id);
    if(!mascota){
        return res.status(404).json({mensaje: "Mascota no encontrada"}); 
    } 
    res.json({mensaje: "Mascota eliminada", mascota}); 
    }catch(error){
    res.status(400).json({mensaje: "Error al eliminar la mascota", error}); 
    }
});

module.exports = router; 