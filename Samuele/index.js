const express = require("express");
const app = express();
const port = 3000;
const noCache = require('nocache');

app.use(noCache());

app.use(express.urlencoded({ extended: true }));

const books = [
    {
        title: 'libro1',
        author: 'Samuele',
        id: 1
    },
    {
        title: 'libro2',
        author: 'Francesco',
        id: 2
    },
    {
        title: 'libro3',
        author: 'Massimo',
        id: 3
    }
];

// GET
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
            res.send('Il libro che hai cercato è ' + books[i].title);
            break;
        }
    }

    if (!trovato) {
        res.send('Non abbiamo il libro che hai cercato');
    }
});

app.get("/books", function (req, res) {
    res.json(books);
});

// POST
app.post("/books", function (req, res) {
    const title = req.body.title;
    const author = req.body.author;
    let newBook =
    {
        title: title,
        author: author,
        id: books.length + 1
    };
    books.push(newBook);
    res.send("Libro aggiunto alla lista con l'id: " + books[books.length - 1].id);
});

app.post("/books/:id", function (req, res) {
    const id = parseInt(req.params.id);
    let trovato = false
    let titolo = null
    let titleMod = null
    let authorMod = null

    try {
        titleMod = req.body.title;
        titolo = true;
    } catch {
        authorMod = req.body.author;
        titolo = false;
    }

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            trovato = true;
            if (titolo) {
                books[i].title = titleMod;
            } else if (!titolo) {
                books[i].author = authorMod;
            }
            res.send('Libro modificato' + JSON.stringify(books[i]));
            break;
        }
    }

    if (!trovato) {
        res.send('Libro da modificare inesistente');
    }
});

// PUT
app.put("/books", function (req, res) {

});

app.put("/books/:id", function (req, res) {

});

// DELETE
app.delete("/books", function (req, res) {

});

app.delete("/books/:id", function (req, res) {
    let Id = parseInt(req.params.id)
    let cancellato = false
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === Id) {
            cancellato = true
            books.splice(i, 1)
            break;
        }
    }
    if (cancellato) {
        res.send("Libro cancellato")
    } else {
        res.send("Libro non trovato")
    }
});

app.listen(port, () => { console.log("Server avviato!") });