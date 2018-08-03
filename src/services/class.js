import express from 'express';
import db from '../database';
const router = express.Router();
const connection = db();

router.get('/:id', (req, res)=>{
    connection.query('SELECT * FROM CLASS WHERE id_class = ' + req.params.id, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM CLASS', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.post('/', (req, res) => {
    const sql = `INSERT INTO CLASS SET 
        name = ${connection.escape(req.body.name)},
        icon = ${connection.escape(req.body.icon)}
    `;
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json({msg: 'class registred', type: 'success'});
    });
});

router.put('/:id', (req, res) => {
    const sql = `UPDATE CLASS SET 
        name = ${connection.escape(req.body.name)}
    `;
    connection.query(sql, 
    (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.delete('/:id', (req, res) => {
    let sql = `SELECT * FROM class WHERE id_class = ${connection.escape(req.params.id)}`;
    
    connection.query(sql, 
    (err, result)=>{
        if(err) res.json({message: 'Class not exist'});
        else {
            let sql = `DELETE FROM class WHERE id_class = ${connection.escape(req.params.id)}`;
            connection.query(sql, (err, result)=>{
                if(err) res.json(err);
                else {
                    res.json(result);                    
                }
            })
        }
    });
});

module.exports = router;