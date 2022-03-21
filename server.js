const { response } = require("express");
const express = require("express")
const mysql = require('mysql')

const app = express();
const PORT = 8300;
const connectDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node-api'
})

// Home Page
app.get("/", (req, res) => {
    res.json({Message:'Api simple crud'})
})



// CREAR MENSAJE / POST
app.post("/guardar-mensaje", (request, response) =>{

    // var req = request.query
    const autor = request.query.autor
    const mensaje = request.query.mensaje
    const code = request.query.code


    const sqlAction = `INSERT INTO tb_message(autor_message, comment_message, code_message) VALUES ('${autor}', '${mensaje}', '${code}')`;
    connectDB.query(sqlAction, function(err, result) {
        if(err) throw err;
            response.json({saved:result.affectedRows, inserted_id:result.insertId})
    })
})


// MOSTRAR MENSAJES / GET
app.get("/mostrar-mensajes", (request, response) =>{

    // var req = request.query
    const sqlAction = `SELECT * FROM tb_message`;
    connectDB.query(sqlAction, function(err, result) {
        if(err) throw err;
        response.json({data:result})
    })
})




// MOSTRAR MENSAJE POR CODIGO UNICO / GET
app.get("/mostrar-mensaje", (request, response) =>{

    // var req = request.query
    const code = request.query.code

    const sqlAction = `SELECT * FROM tb_message WHERE code_message=('${code}')`;
    connectDB.query(sqlAction, function(err, result) {
        // if(err) throw err;
        //     response.json({data:result})
        // response.json({data:result})
        // if(err) {
        //     response.json({Message:'El mensaje con ese id no existe!'})
        // } 
        try {
            response.json({data:result})
        } catch(err){
            response.json({Message:'El mensaje con ese id no existe!'})
        }
    })
})

// ACTUALIZAR / POST
app.post("/actualizar-mensaje", (request, response) =>{

    // var req = request.query
    const code = request.query.code
    const autor = request.query.autor
    const mensaje = request.query.mensaje

    const sqlAction = `UPDATE tb_message SET autor_message='${autor}', comment_message='${mensaje}' WHERE code_message=(${code})`;
    connectDB.query(sqlAction, function(err, result) {
        if(err) throw err;
            response.json({updated:result.affectedRows})
    })
})

// ELIMINAR / POST
app.post("/eliminar-mensaje", (request, response) =>{

    // var req = request.query
    const code = request.query.code

    const sqlAction = `DELETE FROM tb_message WHERE code_message=(${code})`;
    connectDB.query(sqlAction, function(err, result) {
        if(err) throw err;
            response.json({deleted:result.affectedRows})
    })
})


app.listen(PORT, () =>{
    console.log(`El servidor esta arrancando en http://localhost:${PORT}`)
})