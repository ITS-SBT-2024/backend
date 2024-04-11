function saluta(res) {
    return res.send('Hello Filippo')
}

const express = require("express")
const app = express()

const port = 2000

app.get('/filippo', saluta);


app.listen(port, () => { console.log("Hai salutato") });

function saluta(req, res) {
    res.send('Hello Filippo')
}