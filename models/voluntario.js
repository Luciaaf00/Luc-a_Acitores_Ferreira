const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voluntarioSchema = new Schema({
    formacion: String,
    experiencia: String,
    nombre: String,
    apellidos: String,
    edad: String

})

//Creamos el modelo
const Voluntario = mongoose.model('voluntario', voluntarioSchema, "voluntario");

module.exports = Voluntario;