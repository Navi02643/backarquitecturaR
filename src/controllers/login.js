const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/user');
const app = express();

app.post('/', (req, res) =>{
    let body = req.body;

    Usuario.findOne({useremail: body.useremail, userstatus: true}, (err, usrDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento del logueo',
                err
            }); 
        }
        if(!usrDB){
            return res.status(400).json({
                ok: false,
                msg: 'Mail incorrecto o inexistente, intentelo de nuevo'
            });
        }
        if(!bcrypt.compareSync(body.userpassword, usrDB.userpassword)){
            return res.status(401).json({
                ok: false,
                msg: 'Contraseña incorrecta, intentelo de neuvo'
            });
        }
        res.json({
            ok: true,
            msg: `Bienvenido ${usrDB.usernames}`,
            usrDB
        });
    });
});

module.exports = app;