import express from 'express';
import db from '../database';
import { checkToken } from './utils/token';
const router = express.Router();
const connection = db();

router.get('/class-teacher', (req, res)=>{
    const sql = 'SELECT * FROM CLASS_TEACHER INNER JOIN USER ON CLASS_TEACHER.id_teacher = USER.id_user INNER JOIN TEACHER ON CLASS_TEACHER.id_teacher = TEACHER.id_teacher INNER JOIN CLASS ON CLASS_TEACHER.id_class = CLASS.id_class'
    console.log(sql);
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

router.get('/class-teacher/:id', (req, res)=>{
    const sql = 'SELECT CLASS_TEACHER.id_class, name, icon FROM CLASS_TEACHER, CLASS where CLASS_TEACHER.id_teacher = ' + req.params.id + ' AND CLASS_TEACHER.id_class = CLASS.id_class'
    console.log(sql);
    connection.query(sql, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    });
});

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
    let token = req.headers.authorization;
    checkToken(token, (result) => {
        if(!result){
            const sql = `INSERT INTO CLASS SET 
                name = ${connection.escape(req.body.name)},
                icon = ${connection.escape(req.body.icon)}
            `;
            connection.query(sql, (err, result)=>{
                if(err) res.json(err);
                else res.json({msg: 'class registred', type: 'success'});
            });
        }
    })
});

router.post('/class-teacher', (req, res) => {
    let token = req.headers.authorization;
    checkToken(token, (result) => {
        if(!result){
            const sql = `INSERT INTO CLASS_TEACHER SET 
                id_teacher = ${connection.escape(req.body.id_teacher)},
                id_class = ${connection.escape(req.body.id_class)}
            `;
            console.log(sql);
            connection.query(sql, (err, result)=>{
                console.log(err);
                if(err) res.json(err);
                else res.json({msg: 'class registred', type: 'success'});
            });
        }
    })
});

router.put('/:id', (req, res) => {
    let token = req.headers.authorization;
    checkToken(token, (result) => {
        if(!result){
            const sql = `UPDATE CLASS SET 
                name = ${connection.escape(req.body.name)}
            `;
            connection.query(sql, 
            (err, result)=>{
                if(err) res.json(err);
                else res.json(result);
            });
        }
    })
});

router.delete('/:id', (req, res) => {
    let token = req.headers.authorization;
    checkToken(token, (result) => {
        if(!result){
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
        }
    })
});

module.exports = router;