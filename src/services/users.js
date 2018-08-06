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

router.get('/admin/:id', (req, res)=>{
    connection.query('SELECT * FROM ADMINISTRATOR WHERE id_admin = ' + req.params.id, (err, result)=>{
        if(err) {
            res.json(err);
        }
        else {
            res.json(result)
        };
    });
});

router.get('/teacher/:id', (req, res)=>{
    connection.query('SELECT * FROM TEACHER WHERE id_teacher = ' + req.params.id, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/student/class/:id', (req, res)=>{
    connection.query('SELECT * FROM STUDENT WHERE id_class = ' + req.params.id, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/teacher', (req, res)=>{
    const sql = 'SELECT TEACHER.id_teacher, CLASS.id_class, CLASS.name as class_name, email, TEACHER.name as name FROM TEACHER LEFT JOIN USER ON TEACHER.id_teacher = id_user LEFT JOIN CLASS_TEACHER ON TEACHER.id_teacher = CLASS_TEACHER.id_teacher LEFT JOIN CLASS ON CLASS_TEACHER.id_class = CLASS.id_class';
    console.log(sql);
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/student', (req, res)=>{
    connection.query('SELECT * FROM STUDENT INNER JOIN USER ON id_student = id_user', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/parent', (req, res)=>{
    const sql = 'SELECT phone, name, username as name_student, STUDENT.id_student, PARENT.id_parent, email FROM PARENT INNER JOIN USER ON PARENT.id_parent = USER.id_user INNER JOIN STUDENT_PARENT ON PARENT.id_parent = STUDENT_PARENT.id_parent INNER JOIN STUDENT ON STUDENT_PARENT.id_student = STUDENT.id_student'
    console.log(sql);
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/student-parent', (req, res)=>{
    connection.query('SELECT * FROM STUDENT_PARENT', (err, result)=>{
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
        connection.query(sql, (err, result)=>{
            console.log(err);
            if(err) res.json({msg: 'email duplicate', type: 'error', err: err});
            else {
                if(req.params.role === 'teacher'){
                    const sql = `INSERT INTO TEACHER SET
                        id_teacher = ${result.insertId},
                        name = ${connection.escape(req.body.name)}
                    `;
                    connection.query(sql, (err, result)=>{
                        res.json({msg: 'registrated', type: 'success', result: result, err: err});
                    })
                }
                else if(req.params.role === 'admin'){
                    connection.query('INSERT INTO ADMINISTRATOR SET id_admin = ' + result.insertId, (err, result)=>{
                        res.json({msg: 'registrated', type: 'success', result: result, err: err});
                    })
                }
                else if(req.params.role === 'parent'){
                    const sql = `INSERT INTO PARENT SET
                        id_parent = ${result.insertId},
                        name = ${connection.escape(req.body.name)},
                        phone = ${connection.escape(req.body.phone)}
                    `;
                    let id_parent = result.insertId;
                    connection.query(sql, (err, result)=>{
                        if(req.body.student){
                            const sql = `INSERT INTO STUDENT_PARENT SET
                                id_parent = ${id_parent},
                                id_student = ${connection.escape(req.body.student)}
                            `; 
                            connection.query(sql, (err, result)=>{
                                if(err) res.json({msg: 'no insert student', type: 'error', result: result, err: err});
                                res.json({msg: 'registrated', type: 'success', result: result, err: err});
                            })
                        }
                        else{
                            res.json({msg: 'no student', type: 'error', result: result, err: err});
                        }
                    })
                }
                else if(req.params.role === 'student'){
                    const sql = `INSERT INTO STUDENT SET
                        id_student = ${result.insertId},
                        username = ${connection.escape(req.body.username)},
                        icon = ${connection.escape(req.body.icon)},
                        id_class = ${connection.escape(req.body.class)}
                    `;

                    connection.query(sql, (err, result)=>{
                            res.json({msg: 'registrated', type: 'success', result: result, err: err});
                    })
                }
            }
        }); 
    }  
});

router.get('/:id', (req, res)=>{
    connection.query('SELECT * FROM USER WHERE id_user = ' + req.params.id, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
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