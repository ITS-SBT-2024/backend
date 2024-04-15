const express = require("express");
const app = express();
const port = 3000;
app.use(express.json())
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

//lista libri
app.get('/libri',function(req,res){
    res.send(libri)
})
//mostra libro per id
app.get('/libri/:id', function (req, res) {
    const id = req.params.id;
    let search = null
    libri.forEach(l => {
        if (l.id === id) {
            search = l;
        }
    })
    if (search) {
        res.statusCode = 200;
        res.send("Benvenuto, il libro che stai cercando è " + " Nome " + search.title);
    } else {
        res.statusCode = 404;
        res.send("id non valido");
    }
});
//aggiungi libro
app.post('/libri ', function (req, res) {
    let newBook= {nome: req.body.nome, id: libri.length+1}
    libri.push(newBook)
    res.send({ id: newBook.id})
    return libri
});

//modificia libro
app.put('/libri', function(req,res){
    const id= req.params.id   
    const index = libri.findIndex(libro => libro.id === id);
        if (index !== -1) {
            libri[index] = { nome: req.body.nome, id: id }
            res.status(200).json({ message: 'Libro aggiornato correttamente.' })
        } else {
            res.status(404).json({ error: 'Libro non trovato con l\'ID specificato.' })
        }
    })
//rimuovi un singolo libro con l'id
app.delete('/libri/:id ', function(req, res){
    let removeBook = {id : req.body.id}
    libri.pop(removeBook)
    res.send({libri})
})

//rimuoverre tutti i libri
app.delete('/libri', function(req, res) {
    while (libri.length > 0) {
        libri.pop() // Rimuove l'ultimo elemento dall'array
    }
    res.status(200).json({ message: 'Tutti i libri sono stati cancellati.' })
});



// app.get('/', miafunzione);
// app.get('/aaa', function (req, res) {
//     res.send('Hello from AAA')
// });

app.listen(port, () => { console.log("Backend partito!") });