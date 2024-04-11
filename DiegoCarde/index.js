const express = require("express");
const app = express();
const port = 3000


let arrayLibri = [{ nome: "Il piccolo principe", id: "1234" }, { nome: "Il piccolo Foschi", id: "2345" }, { nome: "Il porcello alato", id: "3456" }];


app.get("/", function (req, res) {
    res.send("Home")
})


app.get("/libri/:id", function (req, res) {
    const univoco = req.params.id
    let arrayLibri = [{ nome: "Il piccolo principe", id: "1234" }, { nome: "Il piccolo Foschi", id: "2345" }, { nome: "Il porcello alato", id: "3456" }]
    let newArray = arrayLibri.filter((u) => u.id === univoco)
    res.send(newArray)
    
})


app.get("/diego", function (req, res) {
    const user = req.query.user
    if (user) {
        res.send("<h1>Questo è l'h1 della page Diego</h1>")
    }
    else {
        res.send("<h1> L'utente non è stato trovato</h1> \n <h2>Inserire utende valido</h2>")
    }
})
app.listen(port, () => { console.log("Sei qui") })



