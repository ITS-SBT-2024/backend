const express = require("express");

const app = express();

const port= 3000;

function miafunzione (a,b ) {
   b.send("Hello World from function");
}


app.get('/', miafunzione);
app.post('/post', miafunzione);
app.get('/aaa', function (req, res) {
    res.send('Hello AAA')
});

app.listen(port, () => { console.log("Hai salutato") });