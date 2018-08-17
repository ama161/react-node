import express from 'express';
import db from '../database';
const router = express.Router();
const connection = db();

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM NOTIFICATIONS', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/teacher/:id', (req, res)=>{
    const sql = `SELECT * 
    FROM NOTIFICATIONS
    INNER JOIN STUDENT ON STUDENT.id_student = NOTIFICATIONS.id_student
    INNER JOIN CLASS_TEACHER ON CLASS_TEACHER.id_class = STUDENT.id_class
    where CLASS_TEACHER.id_teacher = ${req.params.id}`;
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/parent/:id', (req, res)=>{
    const sql = `SELECT * 
    FROM NOTIFICATIONS
    INNER JOIN STUDENT ON STUDENT.id_student = NOTIFICATIONS.id_student
    INNER JOIN STUDENT_PARENT ON STUDENT_PARENT.id_student = STUDENT.id_student
    where STUDENT_PARENT.id_parent = ${req.params.id}`;
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.post('/', (req, res) => {
    const sql = `INSERT INTO NOTIFICATIONS SET 
        id_student = ${connection.escape(req.body.id_student)},
        description = ${connection.escape(req.body.description)}
    `;
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json({msg: 'notification registred', type: 'success', err: err, result: result});
    });
});

module.exports = router;