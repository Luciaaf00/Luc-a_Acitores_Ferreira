const express = require('express');
const router = express.Router();
const Accion = require('../models/accion');

router.get('/', async (req, res) => {
    try {
        const arrayAccionDB = await Accion.find();
        console.log(arrayAccionDB);
        res.render("accion/accion", { 
            arrayAccion: arrayAccionDB
        })
    } catch (error) {
        console.error(error)
    }
})
//create
router.get('/crear', (req, res) => {
    res.render('accion/crear');
 })
   router.post('/', async (req, res) => {
       const body = req.body
       
       console.log(body)
       try {
           const accionDB = new Accion(body)
           await accionDB.save()
           res.redirect('/accion')
       } catch (error) {
           console.log('error', error)
       }
   })
 //view
 router.get('/:id', async(req, res) => {
     const id = req.params.id
     try {
         const accionDB = await Accion.findOne({ _id: id })
         console.log(accionDB)
         res.render('accion/detalle', {
             accion: accionDB,
             error: false
         })
     } catch (error) {
         console.log('Se ha producido un error', error)
         res.render('accion/detalle', {
             error: true,
             mensaje: 'Accion no encontrado!'
         })
     }
 })
 //delete
 router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const accionDB = await Accion.findByIdAndDelete({ _id: id });
        console.log(accionDB)
        if (!accionDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar accion.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Accion eliminado.'
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
        const accionDB = await Accion.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(accionDB)
        res.json({
            estado: true,
            mensaje: 'Accion editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar Accion'
        })
    }
})
module.exports = router;