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
    where CLASS_TEACHER.id_teacher = ${req.params.id}
    AND user = 'parent'`;
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
    where STUDENT_PARENT.id_parent = ${req.params.id}
    AND user = 'teacher'`;
    connection.query(sql, (err, result)=>{
        if(err) {
            console.log(err)
            res.json(err);
        }
        else res.json(result);
    });
});

router.post('/', (req, res) => {
    let token = req.headers.authorization;
    //parentId => user.parent
    console.log(req.body.user);
    console.log(req.body.userId);
    console.log(req.body.notification);
    // checkToken(token, (result) => {
        // if(!result){
            const sql = `INSERT INTO NOTIFICATIONS SET 
                id_student = ${connection.escape(req.body.notification.id_student)},
                description = ${connection.escape(req.body.notification.description)},
                id_teacher = ${(req.body.user !== "teacher") ? req.body.notification.id_teacher : req.body.userId},
                id_parent = ${(req.body.user !== "parent") ? req.body.notification.id_parent : req.body.userId},
                user = '${req.body.user}'
            `;
            console.log(sql);
            connection.query(sql, (err, result)=>{
                if(err) {
                    console.log(err);
                    res.json(err);
                }
                else {
                    console.log(result);
                    res.json({msg: 'notification registred', type: 'success', err: err, result: result});
                }
            });
        // }
    // })
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