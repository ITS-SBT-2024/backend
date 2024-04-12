const express = require("express");
const app = express();
const port = 3000;

// const userDB=[
//     {
//         username:"maurizio",
//         password:"123",
//         nome:"Maurizio D'Ottavi"
//     },
//     {
//         username:"gigi",
//         password:"345",
//         nome:"Pierluigi Alessandrini"
//     },
//     {
//         username:"bill",
//         password:"678",
//         nome:"William Shakespeare"
//     },
// ];
// function miafunzione (a,b ) {
//    b.send("Hello World from function");
// }
// app.post('/login', function(req,res) {
//     const user=req.query.user;
//     const pass=req.query.password;
//     trovato=null;
//     userDB.forEach (u => {
//         if (u.username == user && u.password==pass) {
//             trovato=u;
//         } 
//     });
//     if (trovato ){
//         res.statusCode=200;
//         //View
//         res.send("Benvenuto "+trovato.nome);
//     } else {
//         res.statusCode=401;
//         //View
//         res.send("Utente non valido");
//     }
// });

const libri = [
    {
        title: "Dorian Grey",
        id: "1"
    },
    {
        title: "Fabbricante",
        id: "2"
    },
    {
        title: "Dei",
        id: "3"
    },
    {
        title: "Olimpo",
        id: "4"
    },
];

app.get('/title/:id', function (req, res) {
    const id = req.params.id;
    let search = null
    libri.forEach(l => {
        if (l.id === id) {
            search = l;
        }
    })
    if (search) {
        res.statusCode = 200;
        res.send("Benvenuto " + search.id + " Nome " + search.titolo);
    } else {
        res.statusCode = 404;
        res.send("id non valido");
    }
});

app.post('/title ', function (req, res) {
    let newBook= {nome: req.body.nome, id: libri.length+1}
    libri.push(newBook)
    res.send({ id: newBook.id})
});


app.delete('/title ', function(req, res){
    let removeBook = {id : req.body.id}
    libri.pop(removeBook)
    res.send({libri})
})


// app.get('/', miafunzione);
// app.get('/aaa', function (req, res) {
//     res.send('Hello from AAA')
// });

app.listen(port, () => { console.log("Backend partito!") });