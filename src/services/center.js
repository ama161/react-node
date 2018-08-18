import express from 'express';
import db from '../database';
import { checkToken } from './utils/token';
const router = express.Router();
const connection = db();

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM CENTER', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});


router.post('/', (req, res) => {
    let token = req.headers.authorization;
    checkToken(token, (result) => {
        if(!result){
            const sql = `INSERT INTO CENTER SET 
            name = ${connection.escape(req.body.name)}
            `;
            connection.query(sql, (err, result)=>{
                if(err) res.json(err);
                else res.json({msg: 'center registred', type: 'success'});
            });
        }
    })
});

module.exports = router;