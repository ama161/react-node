import express from 'express';
import db from '../database';
const router = express.Router();
const connection = db();

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM CALENDAR_ASSISTANCE', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/student/:id', (req, res)=>{
    connection.query('SELECT * FROM CALENDAR_ASSISTANCE WHERE CALENDAR_ASSISTANCE.id_student = ' + req.params.id, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/teacher/:id', (req, res)=>{
    const sql = `SELECT * FROM CALENDAR_ASSISTANCE
    LEFT JOIN CLASS_TEACHER ON CLASS_TEACHER.id_class = CALENDAR_ASSISTANCE.id_class
    LEFT JOIN STUDENT ON STUDENT.id_student = CALENDAR_ASSISTANCE.id_student
    WHERE CLASS_TEACHER.id_teacher = ${req.params.id}`;
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});


router.post('/', (req, res) => {
    const sql = `INSERT INTO CALENDAR_ASSISTANCE SET 
        id_student = ${connection.escape(req.body.id_student)},
        id_class = ${connection.escape(req.body.id_class)},
        date = ${connection.escape(req.body.date)},
        description = ${connection.escape(req.body.description)},
        type = ${connection.escape(req.body.type)}
    `;
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json({msg: 'calendar registred', type: 'success'});
    });
});

module.exports = router;