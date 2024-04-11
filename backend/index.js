const express = require("express");

const app = express();

const port = 3000;

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/aaa', function (req, res) {
    res.send('Hello AAA')
});

app.listen(port, () => { console.log("Hai salutato") });