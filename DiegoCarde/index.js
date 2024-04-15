const express = require("express");
const nocache = require("nocache");
const app = express();
const port = 3000
app.use(nocache())
app.use(express.urlencoded({ extended: true }))
var fs = require('fs')
// // let arrayLibri = [{ nome: "Il piccolo principe", id: "1" }, { nome: "Il piccolo Foschi", id: "2" }, { nome: "Il porcello alato", id: "3" }];

// fetch("./prova.json") // Sostituisci con il percorso corretto del tuo file JSON
//     .then(response => response.json())
//     .then(jsonData => {
//         let arrayLibri = jsonData; // Utilizza i dati come desideri
//     });

// // import data from ("./prova.json")


app.get("/", function (req, res) {
    res.send("Home")
})

app.post("/libri", function (req, res) {
    let newBook = { nome: req.body.nome, id: arrayLibri.length + 1 }
    arrayLibri.push(newBook)
    res.send({ id: newBook.id })
    return arrayLibri
}
)

app.delete("/libri", function (req, res) {
    const libro = req.body.id
    arrayLibri.splice(libro, 1)
    res.send(arrayLibri)
})
app.get("/libri/:id", function (req, res) {
    const univoco = req.params.id
    let newArray = arrayLibri.filter((u) => u.id === univoco)
    res.send(newArray)
})
app.get("/diego", function (req, res) {
    const user = req.params.user
    if (user) {
        res.send("<h1>Questo è l'h1 della page Diego</h1>")
    }
    else {
        res.send("<h1> L'utente non è stato trovato</h1> \n <h2>Inserire utende valido</h2>")
    }
})
app.delete("/libri", function (req, res) {
    const libroToPop = req.body.id
    let newArray = arrayLibri.filter((u) => u.id !== libroToPop)
    arrayLibri = newArray
    res.send(arrayLibri)
})
app.get("/libri", function (req, res) {
    // if (req.body === null) {res.send(arrayLibri)}
    const parola = req.body.cerca
    res.send(arrayLibri.filter((u) => u.nome.includes(parola)))
}
)
app.post("/libri/:id", function (req, res) {
    const nomeLibro = req.body.nome
    const idLibro = req.body.id
    for (i = 0; i < arrayLibri.length; i++) {
        if (arrayLibri[i].id === idLibro) {
            arrayLibri[i].nome = nomeLibro
            i = false
        }
    }
    res.send(arrayLibri)
}
)

app.listen(port, () => { console.log("Sei qui") })


