const express = require('express');

const app = express();
const port = 3000;

function miaFunzione(a, b) {
  b.send('Hello world from function')
}

app.get('/', miaFunzione)

app.post('/post', miaFunzione)

app.get('/aaa', function (req, res) {
  res.send('Hello AAA')
})

app.listen(port, () => console.log(`Listening on port ${port}`));
