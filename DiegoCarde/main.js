console.log("Hello");
a = 1;
const userMgr = require("")
//Controller
function getLogin(req, res) {
    const user = req.query.user
    const pass = req.query.password
    let trovato = login(user, pass)
    if (trovato) {
        res.statusCode = 200
        //view
        res.send("Benvenuto" + trovato)
    }
    else {
        res.statusCode = 401
        //view
        res.send("Utente non valido")
    }
}
//Model
function login(u, p) {
    const user = userMgr.getUser(u, p)
    if (user) {
        return user.nome
    }
    else {
        return null
    }
}
console.log("a=" + a);
const express = require("express");
const app = express()
const port = 3000
app.post('/login', getLogin)
app.get('/', function (req, res) {
    res.send("Hello World")
})
app.get('/aaa', function (req, res) {
    res.send("Hello aaa")
})
app.listen(port, () => { console.log("Backend Partito!") })
