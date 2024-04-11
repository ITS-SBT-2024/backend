const express = require('express')
const app = express();
const port = 3000;

const myFunc = (req, res) => {
  res.send('<h1 style="color: red">Hello davide</h1>');
}

app.get('/davide', myFunc);

app.listen(port, () => console.log(`Listening on port ${port}`));