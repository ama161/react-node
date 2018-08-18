import express from 'express';
import db from '../database';
import { checkToken } from './utils/token';
const router = express.Router();
const connection = db();

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM SUBJECT', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/:id', (req, res)=>{
    connection.query('SELECT * FROM SUBJECT where id_subject = ' + req.params.id, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.post('/', (req, res)=>{
    let token = req.headers.authorization;
    checkToken(token, (result) => {
        if(!result){
            const sql = `INSERT INTO SUBJECT SET
                name = ${connection.escape(req.body.name)},
                icon = ${connection.escape(req.body.icon)}
            `;
            connection.query(sql, (err, result)=>{
                console.log(err);
                if(err) res.json({msg: 'no insert subject', type: 'error', result: result, err: err});
                else res.json({msg: 'registrated', type: 'success', result: result, err: err});
            });
        }
    })
});

router.put('/:id', (req, res)=>{
    let token = req.headers.authorization;
    checkToken(token, (result) => {
        if(!result){
            const sql = `UPDATE SUBJECT SET
                name = ${connection.escape(req.body.name)},
                icon = ${connection.escape(req.body.icon)}
                WHERE id_subject = ${req.params.id}
            `;
            connection.query(sql, (err, result)=>{
                console.log(err);
                if(err) res.json({msg: 'no update subject', type: 'error', result: result, err: err});
                else res.json({msg: 'registrated', type: 'success', result: result, err: err});
            });
        }
    })
});

module.exports = router;