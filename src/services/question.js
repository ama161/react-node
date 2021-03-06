import express from 'express';
import db from '../database';
import { checkToken } from './utils/token';
const router = express.Router();
const connection = db();

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM QUESTION', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/subject/:id', (req, res)=>{
    connection.query('SELECT * FROM QUESTION WHERE id_subject = ' + req.params.id, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/:id', (req, res)=>{
    connection.query('SELECT * FROM QUESTION, SUBJECT where id_question = ' + req.params.id + ' AND SUBJECT.id_subject = QUESTION.id_subject', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.post('/', (req, res)=>{
    let token = req.headers.authorization;
    checkToken(token, (result) => {
        if(!result){
            const sql = `INSERT INTO QUESTION SET
                title = ${connection.escape(req.body.title)},
                response_true = ${connection.escape(req.body.response_true)},
                response_false_1 = ${connection.escape(req.body.response_false_1)},
                response_false_2 = ${connection.escape(req.body.response_false_2)},
                id_subject = ${connection.escape(req.body.subject)}
            `;
            connection.query(sql, (err, result)=>{
                console.log(err);
                if(err) res.json({msg: 'no insert question', type: 'error', result: result, err: err});
                else res.json({msg: 'registrated', type: 'success', result: result, err: err});
            });
        }
    })
});

module.exports = router;