const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const app = express();

//untuk port dan status development
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

//buat varible port dan env 
app.set('port', PORT);
app.set('env', NODE_ENV);

//membuat logger tiny log line 
app.use(logger('tiny'));
app.use(bodyParser.json()); //gunakan body parser untuk request

//route utama
app.use('/', require(path.join(__dirname, 'routes/routes.js')));

//Error middle ware untuk menangkap error dari route utama
app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});

//response dari middle ware error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

//port listener untuk mendengarkan request
app.listen(PORT, () => {
  console.log(`Express Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`);
});