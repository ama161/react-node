import express from 'express';
import db from '../database';
import { checkToken } from './utils/token';
const router = express.Router();
const connection = db();

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM CALENDAR_WEEK', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/days', (req, res)=>{
    connection.query('SELECT * FROM DAY', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/times', (req, res)=>{
    connection.query('SELECT * FROM TIME', (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.post('/', (req, res) => {
    let token = req.headers.authorization;
    checkToken(token, (result) => {
        // if(!result){
        //     const sql = `INSERT INTO CALENDAR_WEEK SET 
        //     id_class = ${connection.escape(req.body.class)},
        //     id_day = ${connection.escape(req.body.day)},
        //     id_time = ${connection.escape(req.body.time)},
        //     id_subject = ${connection.escape(req.body.subject)}
        //     `;
        //     connection.query(sql, (err, result)=>{
        //         if(err) res.json(err);
        //         else res.json({msg: 'line of calendar week registred', type: 'success'});
        //     });
        // }
    })
});

module.exports = router;