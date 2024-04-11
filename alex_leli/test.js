const express = require('express');
const app = express();
const port = 3000;

app.get('/hello', (req, res) => {
  res.send('hello world!!!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});