const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Dati di esempio per i libri
const books = [
  { id: 1, title: "Il Signore degli Anelli", author: "J.R.R. Tolkien" },
  { id: 2, title: "Harry Potter e la Pietra Filosofale", author: "J.K. Rowling" }
  // Aggiungi altri libri qui...
];

// Endpoint GET per ottenere un libro dato l'ID
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(book => book.id === bookId);

  if (book) {
      res.status(200).json(book);
  } else {
      res.status(404).json({ error: "Libro non trovato" });
  }
});

// Endpoint POST per aggiungere un nuovo libro
app.post('/books', (req, res) => {
  const newBook = req.body;

  // Verifica se il libro è già presente
  const existingBook = books.find(book => book.title === newBook.title && book.author === newBook.author);
  if (existingBook) {
      return res.status(400).json({ error: "Il libro è già presente nella lista" });
  }

  // Assegna un nuovo ID al libro
  const bookId = books.length + 1;
  const bookWithId = { id: bookId, ...newBook };
  
  // Aggiungi il nuovo libro alla lista
  books.push(bookWithId);

  res.status(201).json(bookWithId);
});

//Endpoint GET per restituire la lista di libri
app.get('/books', (req,res) => {
  res.send(books)
})

//Endpoint DELETE per eliminare un libro
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === bookId);

  if (index !== -1) {
      books.splice(index, 1);
      res.status(204).send("Il libro è stato eliminato correttamente");
  } else {
      res.status(404).json({ error: "Libro non trovato" });
  }
});



app.listen (port,() => {console.log ("Backend partito!")});



