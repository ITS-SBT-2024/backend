const express = require("express");

const app = express();

const port = 3000;

function miafunzione(a, b) {
    b.send("Benvenuti nel Sito! ");
}

app.get('/', miafunzione);
app.post('/post', miafunzione);
app.get('/massimo', function (req, res) {
    const user = req.query.user
    if (user) {
        res.send('Benvenuto nel sito di Massimo!')
    }
    else
        res.send('Utente non riconosciuto')
});

app.listen(port, () => { console.log("Backend partito!") });