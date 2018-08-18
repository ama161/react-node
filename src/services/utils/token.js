var secrets = require('../config/secret');
var jwt = require('jsonwebtoken'); 

export function generateToken(id, callback){
    var secret = secrets.tokenSecret;
    var now = Math.floor(Date.now()/1000); 
    var expiresIn = 7200; // tiempo de vida en segundos 
    var expr = (now + expiresIn); //  caduca a la hora
    var notBefore = (now - 10);
    var jwtId =  Math.random().toString(36).substring(7);
    var payload = {
        jwtId: jwtId,
        idU: id,
    };
    var result;
    jwt.sign(payload, secret,{algorithm: 'HS256', expiresIn: expiresIn}, (err, token) => {
    	if(err){
    		console.log('Error mientras se genera el token');
    	}else{
    		if(token != false){
    			result = {
                    token: token,
                    idUser: id
    			};
    			return callback(result);

            }
            else{
                console.log('No se ha podido crear el token');
            }
    	}
   });
}

export function checkToken(token, callback){
    var tokenD = jwt.decode(token);
    var tokenSecret = secrets.tokenSecret;

    jwt.verify(token, tokenSecret, function(err){
        if(err){
            console.log('Token invalido');
            return callback(err);
        }else{
            console.log('Token valido');
            return callback();
        }
    });
}