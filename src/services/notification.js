import express from 'express';
import db from '../database';
import { checkToken } from './utils/token';
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
    INNER JOIN CLASS ON STUDENT.id_class = CLASS.id_class
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
    let token = req.headers.authorization;
    checkToken(token, (result) => {
        if(!result){
            const sql = `INSERT INTO NOTIFICATIONS SET 
                id_student = ${connection.escape(req.body.id_student)},
                description = ${connection.escape(req.body.description)}
            `;
            connection.query(sql, (err, result)=>{
                if(err) res.json(err);
                else res.json({msg: 'notification registred', type: 'success', err: err, result: result});
            });
        }
    })
});

router.delete('/:id_student', (req, res) => {
    let token = req.headers.authorization;
    checkToken(token, (result) => {
        if(!result){
            const sql = `DELETE FROM NOTIFICATIONS
            WHERE id_student = ${req.params.id_student}
            AND description = ${connection.escape(req.body.description)}
            `;
            connection.query(sql, (err, result)=>{
                if(err) res.json(err);
                else res.json({msg: 'notification deleted', type: 'success', err: err, result: result});
            });
        }
    })
})

module.exports = router;