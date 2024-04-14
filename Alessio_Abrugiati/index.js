const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

// Leggi il file JSON esterno
function leggiLibri() {
    try {
        const data = fs.readFileSync('./data/bookDB.json', 'utf8');
        return JSON.parse(data); // Parse del contenuto bookDB.json
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
    const bookDB = leggiLibri(); // Leggi il file JSON dei libri

    const book = bookDB.find(b => b.id === id);

    if (book) {
        res.send(`ID: ${book.id}, Titolo: ${book.title}, Autore: ${book.author}`);
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

// Elimina un singolo libro

// Con questa rotta, puoi inviare una richiesta DELETE a /books/:id specificando l'ID del libro che desideri eliminare.
// Il codice cerca il libro con quell'ID nell'array dei libri, lo rimuove se lo trova e quindi aggiorna il file JSON dei libri con la lista aggiornata.

app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let bookDB = leggiLibri(); // Leggi il file JSON dei libri

    // Cerca il libro da eliminare
    const index = bookDB.findIndex(b => b.id === id);

    if (index !== -1) {
        // Se il libro esiste, rimuovilo dall'array
        const deletedBook = bookDB.splice(index, 1)[0];
        // Scrivi la lista aggiornata nel file JSON
        scriviLibri(bookDB);
        res.send(`Libro eliminato: ${deletedBook.title} di ${deletedBook.author}`);
    } else {
        res.send('Libro non trovato');
    }
});

// Ricerca libri per titolo o autore

// Con questa rotta, puoi inviare una richiesta GET a /search?q=termine_di_ricerca dove termine_di_ricerca è 
// il titolo o l'autore del libro che stai cercando. La funzione filtra i libri in base alla query di ricerca e restituisce i risultati corrispondenti.
app.get("/search", (req, res) => {
    const query = req.query.q.toLowerCase(); // Ottieni la query di ricerca dall'URL e convertila in minuscolo
    const bookDB = leggiLibri(); // Leggi il file JSON dei libri

    // Filtra i libri che corrispondono alla query di ricerca per titolo o autore
    const results = bookDB.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );

    if (results.length > 0) {
        res.json(results); // Restituisci i risultati della ricerca in formato JSON
    } else {
        res.send('Nessun libro trovato');
    }
});


// Ottieni tutti i libri
app.get("/books", (req, res) => {
    res.json(books);
});

app.listen(port, () => { console.log("Backend partito!") });
