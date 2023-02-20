const express = require('express');
const router = express.Router();
const Voluntario = require('../models/voluntario');

router.get('/', async (req, res) => {
    try {
        const arrayVoluntarioDB = await Voluntario.find();
        console.log(arrayVoluntarioDB);
        res.render("voluntario/voluntario", { 
            arrayVoluntario: arrayVoluntarioDB
        })
    } catch (error) {
        console.error(error)
    }
})
//create
router.get('/crear', (req, res) => {
    res.render('voluntario/crear');
 })
   router.post('/', async (req, res) => {
       const body = req.body
       
       console.log(body)
       try {
           const voluntarioDB = new Voluntario(body)
           await voluntarioDB.save()
           res.redirect('/voluntario')
       } catch (error) {
           console.log('error', error)
       }
   })
 //view
 router.get('/:id', async(req, res) => {
     const id = req.params.id
     try {
         const voluntarioDB = await Voluntario.findOne({ _id: id })
         console.log(voluntarioDB)
         res.render('voluntario/detalle', {
             voluntario: voluntarioDB,
             error: false
         })
     } catch (error) {
         console.log('Se ha producido un error', error)
         res.render('voluntario/detalle', {
             error: true,
             mensaje: 'Voluntario no encontrado!'
         })
     }
 })
 //delete
 router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const voluntarioDB = await Voluntario.findByIdAndDelete({ _id: id });
        console.log(voluntarioDB)
        if (!voluntarioDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar voluntario.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Voluntario eliminado.'
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
        const voluntarioDB = await Voluntario.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(voluntarioDB)
        res.json({
            estado: true,
            mensaje: 'Voluntario editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar Voluntario'
        })
    }
})
module.exports = router;