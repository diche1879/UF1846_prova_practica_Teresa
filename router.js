const express = require('express');
const mysql = require('mysql');
const path = require('path');

// Inicializar router
const router = express.Router();

// Conexión a la base de datos ingresando los datos requeridos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'cief',
    password: '123456',
    database: 'uf1846'
});

// Configuración dinámica del menú la guardamos 
// en un array para poder utilizarla en cada renderización
let departamentos = [];
const selectDep = `SELECT DISTINCT departamento FROM team;`;
connection.query(selectDep, (err, result) => {
    if (err) throw err;
    departamentos = result;
});

// Renderizar el index mostrando todos los componentes
router.get('/', (req, res) => {
    const select = `SELECT * FROM team;`;
    connection.query(select, (err, result) => {
        if (err) throw err;
        res.render('index', {
            title: 'Nuestro Equipo',
            team: result,
            departamentos
        });
    });
});



// Filtrar por tipo de departamento
router.get('/:departamento', (req, res) => { 
    const departamento = req.params.departamento;
    /* console.log(departamento); */
    const selectForDep = `SELECT * FROM team WHERE departamento = '${departamento}';`;
    connection.query(selectForDep, (err, result) => {
        if (err) throw err;
        res.render('index', {
            title: `Nuestro Equipo de ${departamento}`,
            team: result,
            departamentos
        });
    });
});

//mostrar ficha para cada componente

router.get('/team/:id', (req, res) => {
    const id = req.params.id;
    const selectForId = `SELECT * FROM team WHERE id = ?;`;
    connection.query(selectForId,[id], (err, result) => {
        if (err) throw err;
        /* console.log(result); */
        /* res.json(result) */
        res.render('ficha', {
            title: ` ${result[0].nombre} ${result[0].apellido}`,
            team: result[0],
            departamentos
        });
    });
});

//Exportando modulos
module.exports = {router, departamentos};