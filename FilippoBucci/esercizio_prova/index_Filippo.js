function saluta(res) {
    return res.send('Hello Filippo')
}

const express = require("express")
const app = express()

const port = 2000

const salutare = app.get('/filippo', saluta(req, res));
console.log(salutare);

app.listen(port, () => { console.log("Hai salutato") });

function saluta(res) {
    return res.send('Hello Filippo')
}