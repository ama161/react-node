import express from 'express';
import db from '../database';
const router = express.Router();
const connection = db();

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM TEST', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/class/:id', (req, res)=>{
    connection.query('SELECT * FROM TEST, CLASS_TEST where CLASS_TEST.id_test = TEST.id_test AND CLASS_TEST.id_class = ' + req.params.id, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/student/:id', (req, res)=>{
    const sql = `SELECT CLASS_TEST.id_test, STUDENT_TEST.note, TEST.title, TEST.description FROM STUDENT 
    LEFT JOIN CLASS_TEST ON CLASS_TEST.id_class = STUDENT.id_class
    LEFT JOIN STUDENT_TEST ON STUDENT_TEST.id_test = CLASS_TEST.id_test
    LEFT JOIN TEST ON CLASS_TEST.id_test = TEST.id_test
    where STUDENT.id_student = ${req.params.id}`;
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/:id', (req, res)=>{
    connection.query(
        'SELECT * FROM TEST WHERE id_test = ' + req.params.id, 
        (err, result)=>{
        if(err) res.json(err);
        else {
            let test = result;
            connection.query(
                'SELECT * FROM TEST_QUESTION, QUESTION WHERE TEST_QUESTION.id_test = ' + req.params.id + ' AND QUESTION.id_question = TEST_QUESTION.id_question', 
                (err, result)=>{
                if(err) res.json(err);
                else {
                    let questions = result;
                    connection.query(
                        'SELECT * FROM CLASS_TEST, CLASS WHERE CLASS_TEST.id_test = ' + req.params.id + ' AND CLASS_TEST.id_class = CLASS.id_class', 
                        (err, result)=>{
                        if(err) res.json(err);
                        else res.json({
                            test: test, 
                            questions: questions,
                            class: result
                        });
                    });
                }
            });
        }
    });
});

router.post('/', (req, res)=>{
    const sql = `INSERT INTO TEST SET
        title = ${connection.escape(req.body.title)},
        description = ${connection.escape(req.body.description)}
    `;
    connection.query(sql, (err, result)=>{
        if(err) res.json({msg: 'no insert test', type: 'error', result: result, err: err});
        else {
            if(req.body.questions){
                let questions = req.body.questions;
                for(let i = 0; i<questions.length; i++){
                    const sql2 = `INSERT INTO TEST_QUESTION SET
                    id_test = ${result.insertId},
                    id_question = ${questions[i]}`;
                    connection.query(sql2, (err, result)=>{
                        if(err) res.json({msg: 'err questions', type: 'error', result: result, err: err});
                        else {
                            if(i === questions.length - 1)
                                res.json({msg: 'register test', type: 'success', result: result, err: err});                                
                        }
                    })
                }
            }
            else res.json({msg: 'no questions', type: 'error', result: result, err: err});            
        }
    });
});

router.post('/class/:id', (req, res) => {
    const sql = `INSERT INTO CLASS_TEST SET
    id_class = ${req.params.id},
    id_test = ${connection.escape(req.body.id_test)}
    `;
    connection.query(sql, (err, result)=>{
        if(err) res.json({msg: 'no insert test in class', type: 'error', result: result, err: err});
        else {
            res.json({msg: 'add test in class', type: 'success', result: result, err: err});            
        }
    });
});

router.post('/student/:id', (req, res) => {
    const sql = `INSERT INTO STUDENT_TEST SET
    id_student = ${req.params.id},
    id_test = ${connection.escape(req.body.id_test)},
    note = ${connection.escape(req.body.note)}
    `;
    connection.query(sql, (err, result)=>{
        if(err) res.json({msg: 'no insert note in test student', type: 'error', result: result, err: err});
        else {
            res.json({msg: 'add note in test', type: 'success', result: result, err: err});            
        }
    });
});

router.put('/student/:id', (req, res) => {
    const sql = `UPDATE STUDENT_TEST SET
    note = ${connection.escape(req.body.note)}
    WHERE id_student = ${req.params.id} AND id_test = ${connection.escape(req.body.id_test)}
    `;
    connection.query(sql, (err, result)=>{
        if(err) res.json({msg: 'no update note in test student', type: 'error', result: result, err: err});
        else {
            res.json({msg: 'update note in test', type: 'success', result: result, err: err});            
        }
    });
});

module.exports = router;