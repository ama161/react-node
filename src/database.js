import mysql from 'mysql';

module.exports = ()=>{
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'super10mas',
        database: 'tfg'
    })
};
