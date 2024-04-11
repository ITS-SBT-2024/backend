const express = require('express')
const app = express();
const port = 3000;

const myFunc = (req, res) => {
  const user = req.query.user;

  if (user) {
    res.send(`<h1 style="color: red">Hello ${user}, I am Davide!</h1>`);
  } else {
    res.send('<h1 style="color: red">Hello world, I am Davide!</h1>');
  }

}

app.get('/davide', myFunc);

books = [{
  id: '0',
  nome: 'harry potter'
}, {
  id: '1',
  nome: 'il signore degli anelli'
}, {
  id: '2',
  nome: 'narnia'
}];

app.get('/books/:id', findBook)

 function findBook(req, res) {
  const id = req.params.id
  let found = '';
  books.forEach(book => {
    if (book.id === id) {
      found = book.nome;
      console.log('Found')
    }
  });
  if (found) {
    res.send('Trovato libro: ' + found)
  } else {
    console.log('NOT FOUND')
    res.send('Book not found');
  }
}
app.listen(port, () => console.log(`Listening on port ${port}`));