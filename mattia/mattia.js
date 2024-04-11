const express = require('express');

const app = express();

const port = 3000;


function getUser(req, res) {
    const user = req.query.user;

    if (user) {
        res.send("Benvenuto " + user);
    }
    else {
        res.send("Domani ultimo volume :(");
    }
}

app.get('/', getUser);

books = [{
    id: 0,
    title: "Le avventure di qualcuno",
    available: true,
}, {
    id: 1,
    title: "Le disavventure di qualcuno",
    available: true,
}, {
    id: 2,
    title: "Le bestemmie di qualcuno",
    available: false,
}]

app.get('/books', function (req, res) {
    res.send(books);

})

app.listen(port, () => { console.log("Back-end partito!") });