import express from 'express';
import db from '../database';
const router = express.Router();
const connection = db();

var secrets = require('./config/secret');
var jwt = require('jsonwebtoken'); 
var Cryptr = require('cryptr'); 
var cryptr = new Cryptr(secrets.cryptSecret);

router.post('/', (req, res) => {
    const sql = `SELECT * FROM USER WHERE 
        email = ${connection.escape(req.body.email)}
    `;
    connection.query(sql, (err, result)=>{
        if(err || !result[0]) res.json({msg: 'incorrect email', type: 'error'});
        else {
            let passD = cryptr.decrypt(result[0].password);
            if(passD === req.body.password){
                generateToken(result[0].id_user, (result) => {
                    res.json(result);
                })
            }
            else{
                res.json({msg: 'incorrect password', type: 'error'})
            }
        }
    });
});

function generateToken(idU, callback){
    var secret = secrets.tokenSecret;
    var now = Math.floor(Date.now()/1000); 
    var expiresIn = 7200; // tiempo de vida en segundos 
    var expr = (now + expiresIn); //  caduca a la hora
    var notBefore = (now - 10);
    var jwtId =  Math.random().toString(36).substring(7);
    var payload = {
        jwtId: jwtId,
        idU: idU,
    };
    var result;
    jwt.sign(payload, secret,{algorithm: 'HS256', expiresIn: expiresIn}, (err, token) => {
    	if(err){
    		console.log('Error mientras se genera el token');
    	}else{
    		if(token != false){
    			result = {
                    token: token,
                    idUser: idU
                };
                console.log(result);
    			return callback(result);

    			}else{
    			console.log('No se ha podido crear el token');
    		}
    	}
   });
}

module.exports = router;