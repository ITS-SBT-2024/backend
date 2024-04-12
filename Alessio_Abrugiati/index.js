const express = require("express")

const app = express()

const port = 3000

// Array di libri
let books = [
    { id: 1, name: 'Il nome della rosa' },
    { id: 2, name: 'Il pendolo di Foucault' },
    { id: 3, name: 'L\'isola del giorno prima' },
    // Aggiungi altri libri qui...
];


app.get("/", (req, res) => {
    res.send("<h1>Benvenuto</h1>")
})

app.get("/alessio", (req, res) => {
    const user = req.query.user
    if (user) {
        res.send("Eccoti qui")
    } else {
        res.send("Non riconosciuto")
    }
    res.send("Ciao")
})

// Nuova rotta per ottenere i dettagli di un libro
app.get("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (book) {
        res.send(`ID: ${book.id}, Nome: ${book.name}`);
    } else {
        res.send('Libro non trovato');
    }
})

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

// Ottieni tutti i libri
app.get("/books", (req, res) => {
    res.json(books);
});

app.listen(port, () => { console.log("Backend partito!") });