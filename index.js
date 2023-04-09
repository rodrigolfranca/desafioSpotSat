const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const pointRouter = require('./src/routers/pointRouter');
const polygonRouter = require('./src/routers/polygonRouter');
const searchRouter = require('./src/routers/searchRouter');
const userRouter = require('./src/routers/userRouter');

// setting routers
app.use('/points/', pointRouter);
app.use('/polygons/', polygonRouter);
app.use('/search/', searchRouter);
app.use('/users/', userRouter);

app.listen(3000, ()=>{
    console.log('o servidor está online na porta 3000');
});
