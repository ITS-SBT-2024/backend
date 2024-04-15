const express = require('express');
const nocache = require('nocache');
const cookieParser = require('cookie-parser');
const { readFile, writeFile } = require('node:fs/promises')

const app = express();
const port = 3000;

app.use(logger);
app.use(nocache());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// * nuovo middleware
app.use(cookieParser());
app.use(loggedInCheck);

function loggedInCheck(req, res, next) {
  if (req.cookies.auth) {
    next();
  } else {
    console.log('not logged in');
    res.status(401).send('Unauthorized')
  }
}

function logger(req, res, next, err) {
  console.log("Chiamato " + req.url);
  next();
};

async function loadBooksDB() {
  try {
    const data = await readFile('data/bookdb.json');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

let booksDB;
loadBooksDB().then(data => booksDB = data);

async function saveBooksDB() {
  try {
    const data = JSON.stringify(booksDB, null, 4);
    await writeFile('data/bookdb.json', data);
  } catch (err) {
    console.error(err);
  }
}


app.post('/books', addBook);

function addBook(req, res) {
  const { title, author } = req.body;
  const id = `${booksDB.length + 1}`;
  const bookFound = booksDB.find(book => book.title === title && book.author === author);

  if (!bookFound) {
    booksDB.push({
      id,
      title,
      author
    });
    saveBooksDB();
    res.statusCode = 201;
    res.send(`You added ${title} by ${author} - ID: ${id}`);
  } else {
    res.status(200).send('Book already in DB');
  }
}

app.get('/books/:id', getBookById);

function getBookById(req, res) {
  const { id } = req.params;

  const bookFound = booksDB.find(book => id === book.id);

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
  const { search } = req.query;

  if (search) {
    console.log('query for: ' + search);
    const booksFound = booksDB.filter(book => book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase()));
    res.status(200).send(booksFound);
  } else {
    res.status(200).send(booksDB);
  }
}

app.delete('/books/:id', deleteBookById);

function deleteBookById(req, res) {
  const { id } = req.params;
  const bookFound = booksDB.find(book => id === book.id);

  if (bookFound) {
    booksDB = booksDB.filter(book => book.id !== id);
    saveBooksDB();
    res.send('Book has been deleted');
  } else {
    res.send('Book not found');
  }
}

app.put('/books/:id', substituteBookById);

function substituteBookById(req, res) {
  const { id } = req.params;
  const { title, author } = req.body;

  const bookFound = booksDB.find(book => id === book.id);

  if (bookFound) {
    bookFound.title = title;
    bookFound.author = author;
    saveBooksDB();
    res.status(200).send('Book has been substituted');
  } else {
    addBook(req, res);
  }
}

app.post('/books/:id', updateBookById);

function updateBookById(req, res) {
  const { id } = req.params;
  const { title, author } = req.body;

  const bookFound = booksDB.find(book => id === book.id);

  if (bookFound) {
    bookFound.title = title;
    bookFound.author = author;
    saveBooksDB();
    res.status(200).send('Book has been updated');
  } else {
    res.status(401).send('Book not found');
  }
}

app.delete('/books', deleteBooksDB);

function deleteBooksDB(req, res) {
  booksDB = [];
  saveBooksDB();
  res.status(200).send('Books database has been deleted');
}

app.listen(port, () => console.log(`Live on http://localhost:${port}/books`));
