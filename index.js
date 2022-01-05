const express = require('express');
const app = express();
const margan = require('morgan');
const bodyParser = require('body-parser');
const user = require('./api/user/index');
if (process.env.NODE_ENV !== 'test') {
    app.use(margan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', user); // /users로들어오는 건 다 user로 반환한다.

module.exports = app;
//test수트 : 테스트 환경으로 모카에서는 describe()으로 구현한다.
