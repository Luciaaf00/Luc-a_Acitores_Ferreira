const express = require('express');
const router = express.Router();
const Solicitante = require('../models/solicitante');

router.get('/', async (req, res) => {
    try {
        const arraySolicitanteDB = await Solicitante.find();
        console.log(arraySolicitanteDB);
        res.render("solicitante/solicitante", { 
            arraySolicitante: arraySolicitanteDB
        })
    } catch (error) {
        console.error(error)
    }
})
//create
router.get('/crear', (req, res) => {
    res.render('solicitante/crear');
 })
   router.post('/', async (req, res) => {
       const body = req.body
       
       console.log(body)
       try {
           const solicitanteDB = new Solicitante(body)
           await solicitanteDB.save()
           res.redirect('/solicitante')
       } catch (error) {
           console.log('error', error)
       }
   })
 //view
 router.get('/:id', async(req, res) => {
     const id = req.params.id
     try {
         const solicitanteDB = await Solicitante.findOne({ _id: id })
         console.log(solicitanteDB)
         res.render('solicitante/detalle', {
             solicitante: solicitanteDB,
             error: false
         })
     } catch (error) {
         console.log('Se ha producido un error', error)
         res.render('solicitante/detalle', {
             error: true,
             mensaje: 'Solicitante no encontrado!'
         })
     }
 })
 //delete
 router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const solicitanteDB = await Solicitante.findByIdAndDelete({ _id: id });
        console.log(solicitanteDB)
        if (!solicitanteDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar solicitante.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Solicitante eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})
//update
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const solicitanteDB = await Solicitante.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(solicitanteDB)
        res.json({
            estado: true,
            mensaje: 'Solicitante editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar Solicitante'
        })
    }
})
module.exports = router;