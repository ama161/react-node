import express from 'express';
import db from '../database';
const router = express.Router();
const connection = db();

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM QUESTION', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.post('/', (req, res)=>{
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
});

module.exports = router;