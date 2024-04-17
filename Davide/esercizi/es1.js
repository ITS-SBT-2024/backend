const express = require('express');
const app = express();
const port = 3000;

let visite = 0;

app.get('/visite', function (req, res) {
  visite++;
  res.send(`<h1>Numero visite: ${visite}</h1>`);
});

app.get('/movies', (req, res) => {
  const title = req.query.title;

  if (title) {
    res.send(`Ecco il film ${title}`);
  } else {
    res.send('Film non presente nel fottuto databse porcamadonna negra diocane');
  }
});

app.listen(port, () => console.log('Listening on port 3000'));
