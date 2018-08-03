import express from 'express';
import db from '../database';
const router = express.Router();
const connection = db();

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM CENTER', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});


router.post('/', (req, res) => {
    const sql = `INSERT INTO CENTER SET 
        name = ${connection.escape(req.body.name)}
    `;
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json({msg: 'center registred', type: 'success'});
    });
});

module.exports = router;