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

router.get('/student/:id', (req, res)=>{
    connection.query('SELECT id_student, CLASS.id_class, CLASS.name as class_name, STUDENT.username as student_name, STUDENT.icon as student_icon, CLASS.icon as class_icon FROM STUDENT, CLASS WHERE STUDENT.id_class = CLASS.id_class AND id_student = ' + req.params.id, 
    (err, result)=>{        
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/student/dossier/:id', (req, res)=>{
    const sql = `SELECT DISTINCT SUBJECT.id_subject, SUBJECT.name FROM DOSSIER, STUDENT, SUBJECT 
    where DOSSIER.id_student = STUDENT.id_student 
    AND DOSSIER.id_subject = SUBJECT.id_subject
    AND STUDENT.id_student = ${req.params.id}`;
    // const sql1 = `SELECT STUDENT.id_student, CLASS.id_class, CLASS.name as class_name, 
    // STUDENT.username as student_name, STUDENT.icon as student_icon, CLASS.icon as class_icon, 
    // title, note, SUBJECT.id_subject, SUBJECT.name as subject_name, id_teacher
    // FROM STUDENT, CLASS, DOSSIER, SUBJECT
    // WHERE STUDENT.id_class = CLASS.id_class 
    // AND STUDENT.id_student = ${req.params.id} 
    // AND STUDENT.id_student = DOSSIER.id_student
    // AND DOSSIER.id_subject = SUBJECT.id_subject
    // `;
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else {
            let subjects = result;
            let data = [];
            for(let i = 0; i<subjects.length; i++){
                let id = subjects[i].id_subject;              
                const sql2 = `SELECT title, note, DOSSIER.id_subject FROM DOSSIER, STUDENT 
                where DOSSIER.id_student = STUDENT.id_student AND STUDENT.id_student = ${req.params.id} AND DOSSIER.id_subject = ${id}`;
                connection.query(sql2, (err, result)=>{
                    if(err) res.json(err);
                    else {
                        data.push({[id]: result});
                        if(i === subjects.length - 1){
                            res.json({subjects: subjects, data: data});
                        }
                    }
                })
            }
        }
    });
});

router.get('/parent/:id', (req, res)=>{
    connection.query('SELECT * FROM PARENT WHERE id_parent = ' + req.params.id, (err, result)=>{
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
    const sql = 'SELECT phone, username as name_student, STUDENT.id_student, PARENT.id_parent, email FROM PARENT INNER JOIN USER ON PARENT.id_parent = USER.id_user INNER JOIN STUDENT_PARENT ON PARENT.id_parent = STUDENT_PARENT.id_parent INNER JOIN STUDENT ON STUDENT_PARENT.id_student = STUDENT.id_student'
    console.log(sql);
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/student-parent/:id', (req, res)=>{
    connection.query('SELECT * FROM STUDENT_PARENT, PARENT where STUDENT_PARENT.id_parent = PARENT.id_parent && id_student = ' + req.params.id, (err, result)=>{
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
                    const teacher = {
                        email: req.body.email,
                        id_user: result.insertId
                    }
                    connection.query(sql, (err, result)=>{
                        if(err) res.json({msg: 'no create teacher', type: 'error', err: err});
                        else {
                            sendEmailTeacher(teacher, (err, result) => {})
                            res.json({msg: 'registrated', type: 'success', result: result, err: err});
                        }
                    })
                }
                else if(req.params.role === 'admin'){
                    const admin = {
                        email: req.body.email,
                        id_user: result.insertId
                    }
                    connection.query('INSERT INTO ADMINISTRATOR SET id_admin = ' + result.insertId, (err, result)=>{
                        if(err) res.json({msg: 'no create admin', type: 'error', err: err});
                        else {
                            sendEmailAdmin(admin, (err, result) => {})
                            res.json({msg: 'registrated', type: 'success', result: result, err: err});
                        }
                    })
                }
                else if(req.params.role === 'parent'){
                    const sql = `INSERT INTO PARENT SET
                        id_parent = ${result.insertId},
                        phone = ${connection.escape(req.body.phone)},
                        name = ${connection.escape(req.body.name)}
                    `;
                    let id_parent = result.insertId;
                    let email = req.body.email;
                    connection.query(sql, (err, result)=>{
                        if(req.body.student){
                            const sql = `INSERT INTO STUDENT_PARENT SET
                                id_parent = ${id_parent},
                                id_student = ${connection.escape(req.body.student)}
                            `; 
                            const parent = {
                                email: email,
                                id_user: id_parent
                            }
                            connection.query(sql, (err, result)=>{
                                if(err) res.json({msg: 'no insert parent', type: 'error', result: result, err: err});
                                else{
                                    sendEmailParent(parent, (err, result) => {})                                    
                                    res.json({msg: 'registrated', type: 'success', result: result, err: err});
                                }
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
                    let id_student = result.insertId;
                    let email = req.body.email;
                    const student = {
                        email: email,
                        id_user: id_student
                    }
                    connection.query(sql, (err, result)=>{
                        if(err) res.json({msg: 'no insert student', type: 'error', result: result, err: err});
                        else{
                            sendEmailStudent(student, (err, result) => {})                                    
                            res.json({msg: 'registrated', type: 'success', result: result, err: err});
                        }
                    })
                }
            }
        }); 
    }  
});

router.post('/parent-student/:id', (req, res) => {
    const sql = `INSERT INTO STUDENT_PARENT SET
    id_parent = ${req.params.id},
    id_student = ${connection.escape(req.body.student)}
    `; 
    connection.query(sql, (err, result)=>{
        if(err) res.json({msg: 'no insert student', type: 'error', result: result, err: err});
        else{                                  
            res.json({msg: 'registrated', type: 'success', result: result, err: err});
        }
    })
})

router.get('/parent-student/:id', (req, res) => {
    const sql = `SELECT * FROM STUDENT_PARENT, STUDENT 
    where STUDENT_PARENT.id_parent = ${req.params.id}
    AND STUDENT_PARENT.id_student = STUDENT.id_student`; 
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    })
})

router.get('/:id', (req, res)=>{
    connection.query('SELECT * FROM USER WHERE id_user = ' + req.params.id, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.put('/:id', (req, res) => {
    console.log(req.body);    
    const sql = `UPDATE USER SET 
        password = '${cryptr.encrypt(req.body.password)}'
        WHERE id_user = ${connection.escape(req.params.id)}
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