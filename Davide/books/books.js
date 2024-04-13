const express = require('express');
const nocache = require('nocache');
const app = express();
const port = 3000;

app.use(nocache());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let BookDB = [
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

let numOfBooks = BookDB.length + 1;

app.post('/books', addBook);

function addBook(req, res) {
  const { title, author } = req.body;
  const id = `${numOfBooks}`;
  const bookFound = BookDB.find(book => book.title === title && book.author === author);

  if (!bookFound) {
    BookDB.push({
      id,
      title,
      author
    });
    numOfBooks++;
    res.statusCode = 201;
    res.send(`You added ${title} by ${author} - ID: ${id}`);
  } else {
    res.status(200).send('Book already in DB');
  }
}

app.get('/books/:id', getBookById);

function getBookById(req, res) {
  const { id } = req.params;

  const bookFound = BookDB.find(book => id === book.id);

  if (bookFound) {
    res.statusCode = 200;
    res.send(`${bookFound.title} by ${bookFound.author} at ID ${id}`);
  } else {
    res.statusCode = 401;
    res.send('Book not found');
  }
}

app.get('/books', getBooksDB);

function getBooksDB(req, res) {
  const { search } = req.query
  
  if (search) {
    console.log(search);
    res.status(200).send(search)
  } else {
    res.status(200).send(BookDB)
  }
}

app.delete('/books/:id', deleteBookById);

function deleteBookById(req, res) {
  const { id } = req.params;
  const bookFound = BookDB.find(book => id === book.id);

  if (bookFound) {
    BookDB = BookDB.filter(book => book.id !== id);
    res.send('Book has been deleted');
  } else {
    res.send('Book not found');
  }
}

app.put('/books/:id', substituteBookById);

function substituteBookById(req, res) {
  const { id } = req.params;
  const { title, author } = req.body;

  const bookFound = BookDB.find(book => id === book.id);

  if (bookFound) {
    bookFound.title = title;
    bookFound.author = author;
    res.status(200).send('Book has been substituted');
  } else {
    addBook(req, res);
  }
}

app.post('/books/:id', updateBookById);

function updateBookById(req, res) {
  const { id } = req.params;
  const { title, author } = req.body;

  const bookFound = BookDB.find(book => id === book.id);

  if (bookFound) {
    bookFound.title = title;
    bookFound.author = author;
    res.status(200).send('Book has been updated');
  } else {
    res.status(401).send('Book not found')
  }
}

app.delete('/books', deleteBooksDB);

function deleteBooksDB(req, res) {
  BookDB = [];
  res.status(200).send('Books database has been deleted')
}

app.listen(port, () => console.log(`Listening on port ${port}`));
