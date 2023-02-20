const express = require('express');
const router = express.Router();
const SolicitudAcceso = require('../models/solicitudAcceso');

router.get('/', async (req, res) => {
    try {
        const arraySolicitudAccesoDB = await SolicitudAcceso.find();
        console.log(arraySolicitudAccesoDB);
        res.render("solicitudAcceso/solicitudAcceso", { 
            arraySolicitudAcceso: arraySolicitudAccesoDB
        })
    } catch (error) {
        console.error(error)
    }
})
//create
router.get('/crear', (req, res) => {
    res.render('solicitudAcceso/crear');
 })
   router.post('/', async (req, res) => {
       const body = req.body
       
       console.log(body)
       try {
           const solicitudAccesoDB = new SolicitudAcceso(body)
           await solicitudAccesoDB.save()
           res.redirect('/solicitudAcceso')
       } catch (error) {
           console.log('error', error)
       }
   })
 //view
 router.get('/:id', async(req, res) => {
     const id = req.params.id
     try {
         const solicitudAccesoDB = await SolicitudAcceso.findOne({ _id: id })
         console.log(solicitudAccesoDB)
         res.render('solicitudAcceso/detalle', {
            solicitudAcceso: solicitudAccesoDB,
             error: false
         })
     } catch (error) {
         console.log('Se ha producido un error', error)
         res.render('solicitudAcceso/detalle', {
             error: true,
             mensaje: 'SolicitudAcceso no encontrado!'
         })
     }
 })
 //delete
 router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const solicitudAccesoDB = await SolicitudAcceso.findByIdAndDelete({ _id: id });
        console.log(solicitudAccesoDB)
        if (!solicitudAccesoDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar SolicitudAcceso.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'SolicitudAcceso eliminado.'
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
        const solicitudAccesoDB = await SolicitudAcceso.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(solicitudAccesoDB)
        res.json({
            estado: true,
            mensaje: 'SolicitudAcceso editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar SolicitudAcceso'
        })
    }
})
module.exports = router;