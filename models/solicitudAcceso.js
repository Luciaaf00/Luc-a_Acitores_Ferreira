const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solicitudAccesoSchema = new Schema({
    solicitud: String,
    dni: String,
    nombre: String,
    apellidos: String,
    edad: String,
    descripcion: String,
    antecedentesPenales: String
})

//Creamos el modelo
const SolicitudAcceso = mongoose.model('solicitudAcceso', solicitudAccesoSchema, "solicitudAcceso");

module.exports = SolicitudAcceso;