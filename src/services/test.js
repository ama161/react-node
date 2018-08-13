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
                else res.json({test: test, questions: result});
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
                let i;
                for(i = 0; i<req.body.questions.length; i++){
                    const sql2 = `INSERT INTO TEST_QUESTION SET
                    id_test = ${result.insertId},
                    id_question = ${req.body.questions[i]}`;
                    connection.query(sql2, (err, result)=>{
                        if(err) res.json({msg: 'err questions', type: 'error', result: result, err: err});
                        else if(i === req.body.questions.length){
                            res.json({msg: 'register test', type: 'success', result: result, err: err});                                
                        }
                    })
                }
            }
            else res.json({msg: 'no questions', type: 'error', result: result, err: err});            
        }
    });
});

module.exports = router;