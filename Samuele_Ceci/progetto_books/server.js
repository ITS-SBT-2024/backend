const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Specifica la directory contenente i file statici (HTML, CSS, JS, immagini)
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 3000;

app.use(express.json());

// Percorso del file database.json
const databasePath = "/Users/its/Documents/Backend/express/Samuele_Ceci/progetto_books/database.json";

// Legge i dati dal file database.json
function leggiDatabase() {
  try {
    const data = fs.readFileSync(databasePath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Errore nella lettura del database:", error);
    return { libri: [] };
  }
}

// Scrive i dati nel file database.json
function scriviDatabase(data) {
  try {
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Errore nella scrittura del database:", error);
  }
}

app.get('/', (req, res) => {
  res.send('Benvenuto! Visita /libri per vedere l\'elenco dei libri.');
});

app.get('/libri', (req, res) => {
  const libri = leggiDatabase().libri;
  res.json(libri);
});

app.get('/libri/:id', (req, res) => {
  const idLibro = req.params.id;
  const libri = leggiDatabase().libri;
  const libro = libri.find(libro => libro.id === idLibro);

  if (libro) {
    res.json(libro);
  } else {
    res.status(404).json({ error: 'Libro non trovato' });
  }
});

app.post('/libri', (req, res) => {
  const libri = leggiDatabase().libri;
  const nuovoLibro = req.body;
  nuovoLibro.id = (libri.length + 1).toString(); // Assegna un nuovo ID
  libri.push(nuovoLibro);
  scriviDatabase({ libri });
  res.status(201).json({ message: 'Libro aggiunto con successo', nome: nuovoLibro.nome });
});

app.put('/libri/:id', (req, res) => {
  const idLibro = req.params.id;
  const libri = leggiDatabase().libri;
  const index = libri.findIndex(libro => libro.id === idLibro);

  if (index !== -1) {
    libri[index] = req.body;
    libri[index].id = idLibro; // Assicura che l'ID rimanga lo stesso
    scriviDatabase({ libri });
    res.send('Libro modificato con successo');
  } else {
    res.status(404).json({ error: 'Libro non trovato' });
  }
});

app.delete('/libri/:id', (req, res) => {
  const idLibro = req.params.id;
  let libri = leggiDatabase().libri;
  libri = libri.filter(libro => libro.id !== idLibro);
  scriviDatabase({ libri });
  res.send('Libro eliminato con successo');
});

app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
