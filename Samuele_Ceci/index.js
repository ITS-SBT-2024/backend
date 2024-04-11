const express = require("express");
const userMg= require("./model")

const app = express();

const port = 3000;

function miafunzione(a, b) {
    b.send("Hello World from function");

function getLogin (req, res) {
    const user = req.queery.user;
    const pass = req.query.password;

    let trovato = login (user, pass);
    if (trovato) {
        res.statusCode = 200;
        res.send("Benvenueto "+trovato);
    } else {
        req.statusCode = 401;
        res.send("Utente non valido");
    }
}
}
app.get('/', miafunzione);


app.post("./login", get)
app.post('/post', miafunzione);

app.get('/aaa', function (req, res) {
    res.send('Hello AAA')
});

app.listen(port, () => { console.log("Backend partito!") });


class Users {
    static getUser (user, password){
    let found = null;
    userDB.forEach (u => {
        if (u.username == user && u.password == password) {
            found = u;
            }
        }); 
        return found;
    }
}
module.exports = User;