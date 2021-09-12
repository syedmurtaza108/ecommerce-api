const express = require('express');
const morgan = require('morgan');
const router = require('./router/product_router');
const userRouter = require('./router/user_router');

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.get('/messages', (req, res)=>{
//     sqlConnection.query('select * from message', (err, rows, fileds)=>{
//         if(!err)
//         res.status(200);
//         else console.log(err);
//     })
// })

app.use('/product', router);
app.use('/user', userRouter);
app.post('/temp', (req, resp) => {
    console.log('temp');
    console.log(req.body);
});

const port = process.env.PORT || 8080

console.log(port);

app.listen(port);