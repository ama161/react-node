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

router.get('/class/:id_class', (req, res)=>{
    const sql = `SELECT * FROM CALENDAR_WEEK WHERE id_class = ${req.params.id_class} order by time`;

    connection.query(sql, (err, result)=>{
        if(err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

router.post('/:id_class', (req, res) => {
    let token = req.headers.authorization;
    let times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    checkToken(token, (result) => {
        if(!result){
            times.forEach(element => {
                const sql = `INSERT INTO CALENDAR_WEEK SET 
                id_class = ${connection.escape(req.params.id_class)},
                time = '${element}',
                monday = '',
                tuesday = '',
                wednesday = '',
                thursday = '',
                friday = '' 
                `;

                connection.query(sql, (err, result)=>{
                    if(err) {
                        res.json(err);
                    }
                });
            });
            res.json({msg: 'calendar week registred', type: 'success'});
        }
    })
});

router.put('/', (req, res) => {
    let token = req.headers.authorization;
    // checkToken(token, (result) => {
        // if(!result){
            console.log(req.body)
            let data = req.body;

            for(let i = 0; i<data.length; i++){
                const sql = `UPDATE CALENDAR_WEEK SET 
                    monday = ${connection.escape(data[i].monday)},
                    tuesday = ${connection.escape(data[i].tuesday)},
                    wednesday = ${connection.escape(data[i].wednesday)},
                    thursday = ${connection.escape(data[i].thursday)},
                    friday = ${connection.escape(data[i].friday)} 
                    where id_class = ${connection.escape(data[i].id_class)}
                    and time = ${connection.escape(data[i].time)}
                `;
                connection.query(sql, 
                (err, result)=>{
                    if(err) res.json({msg: 'err questions', type: 'error', result: result, err: err});
                    else {
                        if(i === data.length - 1)
                            res.json({msg: 'register calendar_week', type: 'success', result: result, err: err});                                
                    }
                });
            }
        // }
    // })
});

module.exports = router;