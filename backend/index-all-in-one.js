const express = require("express");
const app = express();
const port= 3000;

const userDB=[
    {
        username:"maurizio",
        password:"123",
        nome:"Maurizio D'Ottavi"
    },
    {
        username:"gigi",
        password:"345",
        nome:"Pierluigi Alessandrini"
    },
    {
        username:"bill",
        password:"678",
        nome:"William Shakespeare"
    },
];
const BookDB=[
    {
        id:"1",
        title:"The Lord of the Rings",
        author:"J.R.R. Tolkien"
    },
    {
        id:"2",
        title:"Uno Nessuno Centomila",
        author:"Luigi Pirandello"
    },

];

function miafunzione (a,b ) {
   b.send("Hello World from function");
}
app.get('/books/:id', function(req,res) {
    const id=req.params.id;

    trovato=null;
    BookDB.forEach (u => {
        if (u.id == id) {
            trovato=u;
        } 
    });
    if (trovato ){
        res.statusCode=200;
        //View
        res.send("Trovato libro Titolo: "+trovato.title + " Autore:" + trovato.author);
    } else {
        res.statusCode=404;
        //View
        res.send("Libro non presente nella nostra libreria...");
    }
});


app.post('/login', function(req,res) {
    const user=req.query.user;
    const pass=req.query.password;
    trovato=null;
    userDB.forEach (u => {
        if (u.username == user && u.password==pass) {
            trovato=u;
        } 
    });
    if (trovato ){
        res.statusCode=200;
        //View
        res.send("Benvenuto "+trovato.nome);
    } else {
        res.statusCode=401;
        //View
        res.send("Utente non valido");
    }
});

app.get('/', miafunzione);
app.get('/aaa', function (req, res) {
    res.send('Hello from AAA')
});

app.listen (port,() => {console.log ("Backend partito!")});