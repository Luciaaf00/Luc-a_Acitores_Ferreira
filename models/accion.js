const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accionSchema = new Schema({
    fechaRealizacion: String,
    estado: String,
    descripcion: String,
    lugarRealizacion: String
   
})

//Creamos el modelo
const Accion = mongoose.model('accion', accionSchema, "accion");

module.exports = Accion;