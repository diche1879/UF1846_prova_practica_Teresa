//Importando los modulos a utilizar
const express = require('express');
const {router, departamentos} = require('./router.js')

//inicializo express
const app = express();

//Defino el puerto
const PORT = process.env.PORT || 3000;

//defino el motor de plantillas
app.set('view engine', 'ejs');

//Configuro express json
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Configuración para carpeta de archivos estaticos
app.use(express.static('public'))


//Prueba servidor funcionando
/* app.get('/', (req, res) => {
    res.send('HOLA');
}); */

//Rutas
app.use(router);

//DEfinir que hacer en caso de error
app.use((req,res) => {
    res.status(404).render('error',{departamentos});
});

//servidor en escucha
app.listen(PORT, ()=> {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
})