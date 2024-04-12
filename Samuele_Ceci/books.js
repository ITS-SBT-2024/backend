const express = require("express");
const app = express();
const port = 3000

// Array di libri
let arrayLibri = [{ nome: "Il piccolo principe", id: "1234" }, { nome: "Il piccolo Foschi", id: "2345" }, { nome: "Il porcello alato", id: "3456" }];

// Middleware per il parsing dei dati di tipo application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))


// Endpoint per la home
app.get("/", function (req, res) {
    res.send("Home")
})

// Endpoint per aggiungere un nuovo libro tramite metodo PUT
app.put("/libri", function (req, res) {
    arrayLibri.push({ nome: "Uno nessuno centomila", id: "4567" })
    res.send()
}
)


// Endpoint per ottenere un libro specifico tramite ID
app.get("/libri/:id", function (req, res) {
    const univoco = req.params.id
    let newArray = arrayLibri.filter((u) => u.id === univoco)
    res.send(newArray)
})


// Endpoint per ottenere tutti i libri
app.get("/libri", function(req, res) {
    res.send(arrayLibri)
})

// Endpoint per la pagina "diego" con verifica dell'utente
app.get("/diego", function (req, res) {
    const user = req.query.user
    if (user) {
        res.send("<h1>Questo è l'h1 della page Diego</h1>")
    } 
    else {
        res.send("<h1> L'utente non è stato trovato</h1> \n <h2>Inserire utende valido</h2>")
    }
})


// Endpoint per aggiungere un nuovo libro tramite metodo POST
app.post("/libri", function (req, res) {
    let newBook = { nome: req.body.nome, id: arrayLibri.length + 1 };
    arrayLibri.push(newBook)
    res.send({id: newBook.id})
})
app.listen(port, () => { console.log("Sei qui") })