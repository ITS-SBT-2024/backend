const express = require('express');
const nocache = require('nocache');
<<<<<<< HEAD
const app = express();
const port = 3000;

app.use(nocache());
app.use(express.urlencoded({ extended: true }));
// * Per prossimo esercizio:
// * app.use(express.json());

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
=======
const { readFile, writeFile } = require('node:fs/promises')

const app = express();
const port = 3000;

app.use(logger);
app.use(nocache());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function logger(req, res, next) {
  console.log("Chiamato " + req.url);
  next();
}

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
    const data = JSON.stringify(booksDB);
    await writeFile('data/bookdb.json', data)
  } catch (err) {
    console.error(err);
  }
}

>>>>>>> 0f81e158d21d27115300eea220918e1fb4a6ce72

app.post('/books', addBook);

function addBook(req, res) {
  const { title, author } = req.body;
<<<<<<< HEAD
  const id = `${numOfBooks}`;

  BookDB.push({
    id,
    title,
    author
  })

  res.statusCode = 201;
  console.log('Book added');
  res.send(`You added ${title} by ${author} - ID: ${id}`)
};
=======
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
>>>>>>> 0f81e158d21d27115300eea220918e1fb4a6ce72

app.get('/books/:id', getBookById);

function getBookById(req, res) {
  const { id } = req.params;

<<<<<<< HEAD
  const bookFound = BookDB.find(book => id === book.id);

  if (bookFound) {
    res.statusCode = 200;
    console.log('book found');
    res.send(`${bookFound.title} by ${bookFound.author}`)
  } else {
    res.statusCode = 401;
    console.log('not found');
    res.send('Book not found')
=======
  const bookFound = booksDB.find(book => id === book.id);

  if (bookFound) {
    res.statusCode = 200;
    res.send(`${bookFound.title} by ${bookFound.author} at ID ${id}`);
  } else {
    res.statusCode = 401;
    res.send('Book not found');
>>>>>>> 0f81e158d21d27115300eea220918e1fb4a6ce72
  }
}

app.get('/books', getBooksDB);

function getBooksDB(req, res) {
<<<<<<< HEAD
  res.statusCode = 200;
  const titleList = BookDB.map(book => book.title);
  res.send(titleList)
=======
  const { search } = req.query;

  if (search) {
    console.log('query for: ' + search);
    const booksFound = booksDB.filter(book => book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase()));
    res.status(200).send(booksFound);
  } else {
    res.status(200).send(booksDB);
  }
>>>>>>> 0f81e158d21d27115300eea220918e1fb4a6ce72
}

app.delete('/books/:id', deleteBookById);

function deleteBookById(req, res) {
  const { id } = req.params;
<<<<<<< HEAD
  let found = false;

  BookDB.forEach(book => {
    if (id === book.id) {
      found = true;
      BookDB = BookDB.filter(book => book.id !== id);
      console.log('book deleted');
      res.send('Book has been deleted');
    }
  })
  if (!found) {
=======
  const bookFound = booksDB.find(book => id === book.id);

  if (bookFound) {
    booksDB = booksDB.filter(book => book.id !== id);
    saveBooksDB();
    res.send('Book has been deleted');
  } else {
>>>>>>> 0f81e158d21d27115300eea220918e1fb4a6ce72
    res.send('Book not found');
  }
}

<<<<<<< HEAD
app.listen(port, () => console.log(`Listening on port ${port}`));
=======
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
    res.status(401).send('Book not found')
  }
}

app.delete('/books', deleteBooksDB);

function deleteBooksDB(req, res) {
  booksDB = [];
  saveBooksDB();
  res.status(200).send('Books database has been deleted')
}

app.listen(port, () => console.log(`Listening on port ${port}`));
>>>>>>> 0f81e158d21d27115300eea220918e1fb4a6ce72
