const express = require("express");

const Cliente = require("../models/Clientes"); 

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const nuevoCliente = new Cliente(req.body);
        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);

    } catch (error){
        res.status(400).json({mensaje: "Error al crear el cliente.", error});
    }
});

router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find()
        res.status(200).json(clientes)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener clientes', error })
    }
})

router.get("/:id", async (req, res)=>{
    try{
        const cliente = await Cliente.findById(req.params.id); 
        if(!cliente){
            return res.status(404).json({mensaje: "Cliente no encontrado"}); 
        }
        res.json(cliente); 
    }catch(error){
        res.status(400).json({mensaje: "Error al obtener el cliente", error})
    }

});


router.put('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!cliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json({
            mensaje: 'Cliente actualizado correctamente.',
            cliente: cliente
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el cliente.', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const resultado = await Cliente.findByIdAndDelete(req.params.id);
        res.json({
        mensaje: 'Cliente eliminado correctamente',
        cliente: resultado
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar el cliente', error });
    }
});

module.exports = router;