import express from 'express';
import db from '../database';
const router = express.Router();
const connection = db();

var secrets = require('./config/secret');
import {sendEmailAdmin, sendEmailParent, sendEmailStudent, sendEmailTeacher} from './utils/sendEmail';
var Cryptr = require('cryptr'); 
var cryptr = new Cryptr(secrets.cryptSecret);

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM USER', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/:id', (req, res)=>{
    connection.query('SELECT * FROM USER WHERE id_user = ' + req.params.id, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/admin', (req, res)=>{
    connection.query('SELECT * FROM ADMINISTRATOR', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/teacher', (req, res)=>{
    connection.query('SELECT * FROM TEACHER', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/student', (req, res)=>{
    connection.query('SELECT * FROM STUDENT', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/parent', (req, res)=>{
    connection.query('SELECT * FROM PARENT', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.post('/:role', (req, res) => {
    if(req.params.role !== 'admin' && req.params.role !== 'teacher' && req.params.role !== 'student' && req.params.role !== 'parent'){
        res.json({
            msg: 'role invalid'
        })
    }  
    else{
        const sql = `INSERT INTO USER SET
            email = ${connection.escape(req.body.email)},
            password = '${(!req.body.password) ? null : cryptr.encrypt(req.body.password)}',
            id_center = 1
        `;
        console.log(sql);
        
        connection.query(sql, (err, result)=>{
            if(err) res.json({msg: 'email duplicate', type: 'error', err: err});
            else {
                if(req.params.role === 'teacher'){
                    connection.query('INSERT INTO TEACHER SET id_teacher = ' + result.insertId + ', name = ' + req.body.name, (err, result)=>{
                        res.json({msg: 'registrated', type: 'success', result: result, err: err});
                    })
                }
                else if(req.params.role === 'admin'){
                    connection.query('INSERT INTO ADMINISTRATOR SET id_admin = ' + result.insertId, (err, result)=>{
                        res.json({msg: 'registrated', type: 'success', result: result, err: err});
                    })
                }
                else if(req.params.role === 'parent'){
                    connection.query('INSERT INTO PARENT SET id_admin = ' + result.insertId, (err, result)=>{
                        res.json({msg: 'registrated', type: 'success', result: result, err: err});
                    })
                }
                else if(req.params.role === 'student'){
                    connection.query(
                        'INSERT INTO STUDENT SET id_admin = ' + result.insertId + ', username = ' + req.body.username + ', icon = ' + req.body.icon + ', id_class = ' + req.body.class
                        , (err, result)=>{
                            res.json({msg: 'registrated', type: 'success', result: result, err: err});
                        })
                }
            }
        }); 
    }  
});

router.put('/:id', (req, res) => {
    console.log(req.body);    
    const sql = `UPDATE USERS SET 
        password = '${cryptr.encrypt(req.body.password)}'
        WHERE id_users = ${connection.escape(req.params.id)}
    `;
    console.log(sql);
    connection.query(sql, 
    (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    })
});

router.delete('/:id', (req, res) => {
    
});

module.exports = router;