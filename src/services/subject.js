import express from 'express';
import db from '../database';
const router = express.Router();
const connection = db();

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM SUBJECT', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.post('/', (req, res)=>{
    const sql = `INSERT INTO SUBJECT SET
        name = ${connection.escape(req.body.name)},
        icon = ${connection.escape(req.body.icon)}
    `;
    connection.query(sql, (err, result)=>{
        console.log(err);
        if(err) res.json({msg: 'no insert subject', type: 'error', result: result, err: err});
        else res.json({msg: 'registrated', type: 'success', result: result, err: err});
    });
});

module.exports = router;