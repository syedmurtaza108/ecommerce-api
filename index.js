const express = require('express');
const morgan = require('morgan');
const sql = require('mysql');

const app = express();

app.use(morgan("dev"));

app.use(express.json());

var sqlConnection = sql.createConnection({
    host: 'localhost', 
    user: 'root',
    database:'test_db',
    password: 'click123'
})

sqlConnection.connect((err)=>{
    if(!err)
    console.log('connected');
    else
    console.log(JSON.stringify(err));
})

app.get('/messages', (req, res)=>{
    sqlConnection.query('select * from message', (err, rows, fileds)=>{
        if(!err)
        res.status(200);
        else console.log(err);
    })
})

const port = process.env.PORT || 8080

app.listen(port);   