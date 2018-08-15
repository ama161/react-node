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

router.get('/teacher/:id_teacher/date/:date', (req, res)=>{
    console.log(req.params.id_date)
    const sql = `SELECT CALENDAR_ASSISTANCE.id_class, CALENDAR_ASSISTANCE.id_student, CALENDAR_ASSISTANCE.type, CALENDAR_ASSISTANCE.id_subject, SUBJECT.name, STUDENT.username 
    FROM CALENDAR_ASSISTANCE
    LEFT JOIN CLASS_TEACHER ON CLASS_TEACHER.id_class = CALENDAR_ASSISTANCE.id_class
    LEFT JOIN STUDENT ON STUDENT.id_student = CALENDAR_ASSISTANCE.id_student
    LEFT JOIN CLASS ON CLASS.id_class = CALENDAR_ASSISTANCE.id_class
    LEFT JOIN SUBJECT ON SUBJECT.id_subject = CALENDAR_ASSISTANCE.id_subject
    WHERE CLASS_TEACHER.id_teacher = ${req.params.id_teacher}
    AND CALENDAR_ASSISTANCE.date = '${req.params.date}'`;
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/teacher/:id', (req, res)=>{
    const sql = `SELECT * FROM CALENDAR_ASSISTANCE
    LEFT JOIN CLASS_TEACHER ON CLASS_TEACHER.id_class = CALENDAR_ASSISTANCE.id_class
    LEFT JOIN STUDENT ON STUDENT.id_student = CALENDAR_ASSISTANCE.id_student
    LEFT JOIN CLASS ON CLASS.id_class = CALENDAR_ASSISTANCE.id_class
    LEFT JOIN SUBJECT ON SUBJECT.id_subject = CALENDAR_ASSISTANCE.id_subject
    WHERE CLASS_TEACHER.id_teacher = ${req.params.id}`;
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});


router.post('/', (req, res) => {
    const sql = `INSERT INTO CALENDAR_ASSISTANCE SET 
        id_student = ${connection.escape(req.body.id_student)},
        id_subject = ${connection.escape(req.body.id_subject)},
        id_class = ${connection.escape(req.body.id_class)},
        date = ${connection.escape(req.body.date)},
        description = ${connection.escape(req.body.description)},
        type = ${connection.escape(req.body.type)}
    `;
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json({msg: 'calendar registred', type: 'success', result: result, err: err });
    });
});

module.exports = router;