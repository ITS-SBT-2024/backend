const express = require('express')
const app = express();
const port = 3000;

const myFunc = (req, res) => {
  res.send('Hello davide');
}

app.get('/davide', myFunc);

app.listen(port, () => console.log(`Listening on port ${port}`));