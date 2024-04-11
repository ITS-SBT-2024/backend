const express = require("express");
const app = express();
const port = 3000;

app.get('/FrancescoMarconi', function (req, res) {
    res.send('Ciao sono gay')
});

app.listen(port, () => { console.log("Server avviato") });