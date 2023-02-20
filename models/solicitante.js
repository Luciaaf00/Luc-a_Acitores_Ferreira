const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solicitanteSchema = new Schema({
    problemaMovilidad: String,
    enfermedad: String,
    nombre: String,
    apellidos: String,
    edad: String,
    direccion: String,
    descripcion: String
})

//Creamos el modelo
const Solicitante = mongoose.model('solicitante', solicitanteSchema, "solicitante");

module.exports = Solicitante;