const express = require('express');
const app = express();
const margan = require('morgan');
const bodyParser = require('body-parser');
let users = [
    { id: 1, name: 'alic' },
    { id: 2, name: 'alice' },
    { id: 3, name: '3c' },
];

app.use(margan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', function (req, res) {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
});

app.get('/users/:id', function (req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    const user = users.filter((user) => user.id === id)[0];
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    users = users.filter((user) => user.id !== id);
    res.status(204).end();
});

app.post('/users', (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).end();
    const isConflic = users.filter((user) => user.name === name).length; //중복일경우에
    if (isConflic) return res.status(409).end();
    const id = Date.now();
    const user = { id, name };
    users.push(user);
    res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    const name = req.body.name;
    if (!name) return res.status(400).end();
    const iscoflice = users.filter((user) => user.name === name).length;
    if (iscoflice) return res.status(409).end();
    const user = users.filter((user) => user.id === id)[0];
    if (!user) return res.status(404).end();
    user.name = name;
    res.json(user);
});

app.listen(3000, function () {
    console.log('Server open');
});

module.exports = app;
//test수트 : 테스트 환경으로 모카에서는 describe()으로 구현한다.
