import express from 'express';
import db from '../database';
const router = express.Router();
const connection = db();

var secrets = require('./config/secret');
var Cryptr = require('cryptr'); 
var cryptr = new Cryptr(secrets.cryptSecret);

router.get('/:id', (req, res)=>{
    connection.query('SELECT * FROM users WHERE id_users = ' + req.params.id, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM users', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.post('/', (req, res) => {
    let {email, username, password, role} = req.body;
    let passwordE = cryptr.encrypt(password) 
    const sql = `INSERT INTO users SET 
        username = ${connection.escape(req.body.username)},
        password = '${cryptr.encrypt(req.body.password)}',
        email = ${connection.escape(req.body.email)},
        role = ${connection.escape(req.body.role)}
    `;
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json({
            userID: result.insertId 
        });
    });
});

router.put('/:id', (req, res) => {
    console.log(req.body);    
    const sql = `UPDATE users SET 
        username = ${connection.escape(req.body.username)},
        password = '${cryptr.encrypt(req.body.password)}',
        email = ${connection.escape(req.body.email)}
        WHERE id_users = ${connection.escape(req.params.id)}
    `;
    console.log(sql);
    connection.query(sql, 
    (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.delete('/:id', (req, res) => {
    let sql = `SELECT * FROM users WHERE id_users = ${connection.escape(req.params.id)}`;
    
    connection.query(sql, 
    (err, result)=>{
        if(err) res.json({message: 'User not exist'});
        else {
            let sql = `DELETE FROM users WHERE id_users = ${connection.escape(req.params.id)}`;
            connection.query(sql, (err, result)=>{
                if(err) res.json(err);
                else {
                    res.json(result);                    
                }
            })
        }
    });
});

module.exports = router;