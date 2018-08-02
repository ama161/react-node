import express from 'express';
import db from '../database';
const router = express.Router();
const connection = db();

var secrets = require('./config/secret');
import {sendEmailAdmin, sendEmailParent, sendEmailStudent, sendEmailTeacher} from './utils/sendEmail';
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

router.post('/:role', (req, res) => {
    console.log(req.params);
    console.log(req.params);

    if(req.params.role !== 'admin' && req.params.role !== 'teacher' && req.params.role !== 'student' && req.params.role !== 'parent'){
        res.json({
            msg: 'role invalid'
        })
    }  
    else{
        let {email, username, password, role} = req.body;
        const sql = `INSERT INTO users SET 
            username = ${connection.escape(req.body.username)},
            password = '${(!req.body.password) ? null : cryptr.encrypt(req.body.password)}',
            email = ${connection.escape(req.body.email)},
            role = '${req.params.role}',
            icon = ${connection.escape(req.body.icon)}
        `;
        console.log(sql);
        
        connection.query(sql, (err, result)=>{
            if(err) res.json({msg: 'email duplicate', type: 'error'});
            else {
                connection.query('SELECT * FROM users WHERE id_users = ' + result.insertId, (err, result)=>{
                    if(err) res.json(err);
                    else {
                        if(req.params.role === 'admin')
                            sendEmailAdmin(result, (err, result) => {
                                console.log(err)
                                console.log(result)
                            });
                        if(req.params.role === 'teacher')
                            sendEmailTeacher(result, (err, result) => {
                                console.log(err)
                                console.log(result)
                            });
                        if(req.params.role === 'student')
                            sendEmailStudent(result, (err, result) => {
                                console.log(err)
                                console.log(result)
                            });
                        if(req.params.role === 'parent')
                            sendEmailParent(result, (err, result) => {
                                console.log(err)
                                console.log(result)
                            });
                    }
                    res.json({msg: 'registrated', type: 'success'});
                    
                });
            }
        }); 
    }  
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