const express = require('express')
const app = express();
const port = 3000;

const myFunc = (req, res) => {
  const user = req.query.user

  if (user) {
    res.send(`<h1 style="color: red">Hello ${user}!</h1>`)
  } else {
    res.send('<h1 style="color: red">Hello world!</h1>');
  }

}

app.get('/', myFunc);

app.listen(port, () => console.log(`Listening on port ${port}`));