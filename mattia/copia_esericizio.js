const express = require("express");
const app = express();
const port = 3000;

const nocache = require('nocache');

app.use(nocache());

app.use(express.urlencoded({ extended: true }));

function logger(req, res, next) {
    console.log("Chiamato " + req.url + "!!!!");
    next();
}

const BookDB = [
    {
        id: "1",
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien"
    },
    {
        id: "2",
        title: "Uno Nessuno Centomila",
        author: "Luigi Pirandello"
    },

];

function miafunzione(a, b) {
    b.send("Hello World from function");
}
app.get('/books/:id', function (req, res) {
    const id = req.params.id;

    trovato = null;
    BookDB.forEach(u => {
        if (u.id == id) {
            trovato = u;
        }
    });
    if (trovato) {
        res.statusCode = 200;
        //View
        res.send("Trovato libro Titolo: " + trovato.title + " Autore:" + trovato.author);
    } else {
        res.statusCode = 404;
        //View
        res.send("Libro non presente nella nostra libreria...");
    }
});

app.post('/books', addBook);

let libriTotali = 0;

function addBook(req, res) {
    const id = libriTotali;
    const title = req.body.title;
    const author = req.body.author;
}
addBook.forEach(book => {
    BookDB.push({
        id: id,
        title: title,
        author: author
    });
});




app.get('/', miafunzione);
app.get('/aaa', function (req, res) {
    res.send('Hello from AAA')
});

app.listen(port, () => { console.log("Backend partito!") });