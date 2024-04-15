const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(nocache());

app.use(isUserAuth);
// Attenzione questo e' un uso selettivo di un middleware solo su alcune routes
// vuold dire che questo middleware si applica solo alle roote
// ve lo spiego domani ma fa uso di espressioni regolari per indicare una famiglia di URL 
// tutti quelli che iniziano per "/books"
// app.use(/^\/books(.*)/,isUserAuth);

// Leggi il file JSON esterno
function leggiLibri() {
    try {
        const data = fs.readFileSync('./data/bookDB.json', 'utf8');
        return JSON.parse(data); // Parse del contenuto bookDB.json da stringa a oggetto
    } catch (err) {
        console.error('Errore durante la lettura del file:', err);
        return [];
    }
}

// Scrivi nel file JSON esterno
function scriviLibri(libri) {
    try {
        fs.writeFileSync('./data/bookDB.json', JSON.stringify(libri, null, 2)); // stringify converte da oggetto a stringa
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

// Aggiungi un nuovo libro
// Impostare Thunder Client su POST, nel campo URL andare in /books, selezionare la scheda Body, selezione JSON e inserire il nuovo libro.
app.post("/books", (req, res) => {
    const newBook = req.body
    let bookDB = leggiLibri()
    const newId = bookDB.length > 0 ? bookDB[bookDB.length - 1].id + 1 : 1
    newBook.id = newId // Aggiungi ID al nuovo libro
    bookDB.push(newBook) // Aggiungi nuovo libro
    scriviLibri(bookDB) // Scrivi nel file.json
    res.send("Libro aggiunto con successo")
})

// Elimina un singolo libro

// Con questa rotta, puoi inviare una richiesta DELETE a /books/:id specificando l'ID del libro che desideri eliminare.
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
// il titolo o l'autore del libro che stai cercando.
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
    const bookDB = leggiLibri()
    res.json(bookDB)
});


function isUserAuth (req, res, next){
    console.log("isUserAuth... cookies=", req.cookies);
    if ( req.url=="/login" && req.method=="POST") {
        // se ci viene chiesta la login lo facciamo passare perche' vuol dire che l'utente 
        // vuole authenticarsi e lo permettiamo
        next();
        return;
    }
    if (req.cookies && req.cookies.authenticato) {
        console.log("URL:"+req.url + " user:"+req.cookies.authenticato);
        // qui nella realtà dovremmo controllare che in effetti l'utente esista davvero e
        // la stringa di cookie dovrebbe essere criptata per evitare manomissioni
        // ma noi per ora ce ne freghiamo...
        next();
    } else {
        res.statusCode=401;
        res.json({"msg":"Login Failed"});
    }
}

app.listen(port, () => { console.log("Backend partito!") });
