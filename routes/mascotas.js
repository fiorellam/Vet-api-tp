const express = require("express"); 
const router = express.Router(); 

const Mascota = require("../models/Mascotas"); 

router.post("/", async(req, res)=>{
    const nuevaMascota = new Mascota(req.body); 
    await nuevaMascota.save(); 

    res.json(nuevaMascota); 
})

router.get("/", async(req, res)=>{
    const mascotas = await Mascota.find().populate("Clientes"); 

    res.json(mascotas); 
})

router.put("/:id", async (req, res)=>{
    const mascota = await Mascota.findByIdAndUpdate(req.params.id, req.body, {new:true}); 
    
    res.json(mascota); 
})

router.delete("/:id", async (req, res)=>{
    await Mascota.findByIdAndDelete(req.params.id); 

    res.json({mensaje: "Mascota eliminada"}); 
}); 

module.exports = router; 