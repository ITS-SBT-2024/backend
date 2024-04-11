const express = require("express");
const app = express();
const port = 3000;

app.get('/Samuele', function (req, res) {
    const user = req.query.user;
    if (user === undefined) {
        res.send('Benvenuto sul nostro sito');
    } else {
        res.send('Bentornato Mr. ' + user);
    }
});

app.listen(port, () => { console.log("Server avviato!") });