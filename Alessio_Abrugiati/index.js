const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

// Leggi il file JSON esterno
function leggiLibri() {
    try {
        const data = fs.readFileSync('./data/bookDB.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Errore durante la lettura del file:', err);
        return [];
    }
}

// Scrivi nel file JSON esterno
function scriviLibri(libri) {
    try {
        fs.writeFileSync('./data/bookDB.json', JSON.stringify(libri, null, 2));
        console.log('File scritto correttamente.');
    } catch (err) {
        console.error('Errore durante la scrittura del file:', err);
    }
}

// Array di libri
let books = leggiLibri();

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
    // Scrivi la lista aggiornata nel file JSON
    scriviLibri(books);
    res.send("Libro aggiunto alla lista con l'id: " + newBook.id);
});

// Ottieni tutti i libri
app.get("/books", (req, res) => {
    res.json(books);
});

app.listen(port, () => { console.log("Backend partito!") });
