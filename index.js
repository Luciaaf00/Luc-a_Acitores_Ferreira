const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Conexion Mongodb
const port = process.env.PORT ||4000
const mongoose = require('mongoose');
const uri= `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ngzksfo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pwelxvd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego
 mongoose.connect(uri,
   { useNewUrlParser: true, useUnifiedTopology: true }
 )
   .then(() => console.log('Base de datos conectada'))
   .catch(e => console.log(e))

 //Middleware
app.use(express.static(__dirname + '/public'));

//Motor de plantillas 
app.set("views", __dirname + "/views");
app.set("view engine", "ejs")




//Llamadas a las rutas
app.use('/', require('./router/rutas'))
app.use('/accion', require('./router/accion'))
app.use('/solicitante',require('./router/solicitante'))
app.use('/solicitudAcceso',require('./router/solicitudAcceso'))
app.use('/voluntario',require('./router/voluntario'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})