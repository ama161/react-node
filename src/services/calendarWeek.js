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
    const sql = `SELECT * FROM CALENDAR_WEEK WHERE id_class = ${req.params.id_class}`;

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
    let times = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
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
    checkToken(token, (result) => {
        if(!result){
            //recibo objetos por horas y dentro tiene todos los dias, igual que cuando lo creo

            let data = req.body.data;

            data.forEach(element => {
                const sql = `UPDATE CALENDAR_WEEK SET 
                id_class = ${connection.escape(element.class)},
                id_time = ${connection.escape(element.time)},
                monday = ${connection.escape(element.monday)},
                tuesday = ${connection.escape(element.tuesday)},
                wednesday = ${connection.escape(element.wednesday)},
                thursday = ${connection.escape(element.thursday)},
                friday = ${connection.escape(element.friday)} 
                `;
                connection.query(sql, 
                (err, result)=>{
                    if(err) res.json(err);
                    else res.json(result);
                });
            });
            
        }
    })
});

module.exports = router;