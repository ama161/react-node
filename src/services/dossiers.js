import express from 'express';
import db from '../database';
const router = express.Router();
const connection = db();

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM DOSSIER, SUBJECT where DOSSIER.id_subject = SUBJECT.id_subject', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/:id_student/:id_subject', (req, res)=>{
    const sql = `SELECT AVG(note) as media
    FROM DOSSIER, SUBJECT 
    where DOSSIER.id_subject = ${req.params.id_subject}
    AND DOSSIER.id_student = ${req.params.id_student}`;

    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.post('/:id_student/:id_teacher', (req, res)=>{
    const sql = `INSERT INTO DOSSIER SET
        id_student = ${req.params.id_student},
        id_teacher = '${req.params.id_teacher}',
        title = ${connection.escape(req.body.title)},
        id_subject = ${connection.escape(req.body.subject)},
        note = ${connection.escape(req.body.note)}
    `;
    connection.query(sql, (err, result)=>{
        console.log(err);
        if(err) res.json({msg: 'no insert in dossier', type: 'error', result: result, err: err});
        else res.json({msg: 'registrated', type: 'success', result: result, err: err});
    });
});

module.exports = router;