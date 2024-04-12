const express = require('express');
const nocache = require('nocache');
const app = express();
const port = 3000;

app.use(nocache());
app.use(express.urlencoded({ extended: true }));

const BookDB = [
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
  const title = req.body.title;
  const author = req.body.author;
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

app.get('/books/:id', getBookById);

function getBookById(req, res) {
  const id = req.params.id;

  const bookFound = BookDB.find(book => id === book.id);

  if (bookFound) {
    res.statusCode = 200;
    console.log('book found');
    res.send(`${bookFound.title} by ${bookFound.author}`)
  } else {
    res.statusCode = 401;
    console.log('not found');
    res.send('Book not found')
  }
}

app.get('/books', getBooksDB);

function getBooksDB(req, res) {
  res.statusCode = 200;
  const titleList = BookDB.map(book => book.title);
  res.send(titleList)
}

app.listen(port, () => console.log(`Listening on port ${port}`));