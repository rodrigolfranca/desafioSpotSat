const express = require('express');
const app = express();

const pointRouter = require('./src/routers/pointRouter.js');
const polygonRouter = require('./src/routers/polygonRouter.js');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// setting routers
app.use('/points/', pointRouter);
app.use('/polygon/', polygonRouter);

app.listen(3000, ()=>{
    console.log('o servidor está online na porta 3000');
});
