const express = require('express');

const app = express();

const port = 3000;


function getLogin(req, res) {
    const user = req.query.user;
    const pass = req.query.password;

    let trovato = login(user, pass);
    if (trovato) {
        res.statusCode = 200;
        res.send("Benvenuto: " + trovato);
    }
    else {
        res.statusCode = 401;
        res.send("Username o password errati");
    }
}

function login(user, pass) {
    const user = userMgr.getUser(user, pass);
    if (user) {
        return user.nome;
    }
}



app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/aaa', function (req, res) {
    res.send('Hello AAA!');
});

app.listen(port, () => { console.log("Back-end partito!") });