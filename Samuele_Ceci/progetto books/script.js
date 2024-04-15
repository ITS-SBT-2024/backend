const express = require('express');
const fs = require('fs');
const { validationResult, check } = require('express-validator');

const app = express();
const PORT = 3000;
const databaseFile = './database.json'; // Percorso relativo al file database.json nel progetto

// Middleware per il parsing del corpo delle richieste
app.use(express.json());

// Funzione per caricare i dati dei libri dal file JSON
function loadDatabase() {
  if (fs.existsSync(databaseFile)) {
    const data = fs.readFileSync(databaseFile);
    return JSON.parse(data);
  } else {
    throw new Error('File database.json non trovato.');
  }
}

// Funzione per salvare i dati dei libri sul file JSON
function saveDatabase(database) {
  fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2));
}


// Aggiungi questa funzione per generare un nuovo ID univoco per ogni libro aggiunto
function generateId(database) {
  const lastBook = database.libri[database.libri.length - 1];
  return lastBook ? parseInt(lastBook.id) + 1 : 1;
}

// Middleware per la gestione degli errori di validazione
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

// Middleware per la gestione degli errori globali
function handleErrors(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Qualcosa è andato storto!');
}

// GET per ottenere tutti i libri
app.get('/libri', (req, res) => {
  const database = loadDatabase();
  res.json(database.libri);
});

// POST per aggiungere un libro
app.post(
  '/libri',
  [
    check('nome').notEmpty().withMessage('Il nome del libro è obbligatorio'),
  ],
  handleValidationErrors,
  (req, res) => {
    const database = loadDatabase();
    const nuovoLibro = req.body;
    const nuovoId = database.libri.length + 1; // Assegna un nuovo ID basato sulla lunghezza della lista dei libri
    nuovoLibro.id = nuovoId.toString(); // Converti il nuovo ID in una stringa e assegnalo al nuovo libro
    database.libri.push(nuovoLibro);
    saveDatabase(database);
    res.send('Libro aggiunto con successo.');
  }
);

// PUT per modificare un libro tramite l'ID
app.put(
  '/libri/:id',
  [
    check('nome').notEmpty().withMessage('Il nome del libro è obbligatorio'),
  ],
  handleValidationErrors,
  (req, res) => {
    const database = loadDatabase();
    const libroId = req.params.id;
    const libroModificato = req.body;
    const index = database.libri.findIndex(libro => libro.id === libroId);
    if (index !== -1) {
      database.libri[index] = { id: libroId, ...libroModificato };
      saveDatabase(database);
      res.send('Libro modificato con successo.');
    } else {
      res.status(404).send('Libro non trovato.');
    }
  }
);

// DELETE per eliminare un libro
app.delete('/libri/:id', (req, res) => {
  const database = loadDatabase();
  const libroId = req.params.id;
  const index = database.libri.findIndex(libro => libro.id === libroId);
  if (index !== -1) {
    database.libri.splice(index, 1);
    saveDatabase(database);
    res.send('Libro eliminato con successo.');
  } else {
    res.status(404).send('Libro non trovato.');
  }
});

// Gestione degli errori
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
