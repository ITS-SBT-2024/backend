const express = require("express");
const app = express();
const port = 3000;

const books = [
    libro1 = {
        name: 'libro1',
        id: 1
    },
    libro2 = {
        name: 'libro2',
        id: 2
    },
    libro3 = {
        name: 'libro3',
        id: 3
    }
]

app.get('/Samuele', function (req, res) {
    const user = req.query.user;
    if (user === undefined) {
        res.send('Benvenuto sul nostro sito');
    } else {
        res.send('Bentornato Mr. ' + user);
    }
});

app.get("/books/:id", function (req, res) {
    let Id = parseInt(req.params.id);
    let trovato = false

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === Id) {
            trovato = true;
            res.send('Il libro che hai cercato è ' + books[i].name);
            break;
        }
    }

    if (!trovato) {
        res.send('Non abbiamo il libro che hai cercato');
    }
});

app.listen(port, () => { console.log("Server avviato!") });