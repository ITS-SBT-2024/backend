const express = require("express");
const app = express();
const port = 3000;

app.get('/SamueleBaldini', function (req, res) {
    res.send('Ciao sono Samuele')
});

app.listen(port, () => { console.log("Server avviato") });