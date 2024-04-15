const express = require("express");
const app = express();
const port= 3000;

const nocache = require('nocache');
<<<<<<< HEAD
<<<<<<< HEAD
=======
app.use (logger);
app.use(express.static('public'));
>>>>>>> main
=======
app.use (logger);
app.use(express.static('public'));
>>>>>>> main

app.use(nocache());

app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD
<<<<<<< HEAD
=======
app.use(express.json());
>>>>>>> main
=======
app.use(express.json());
>>>>>>> main

function logger (req, res, next){
   console.log("Chiamato "+req.url+"!!!!");
   next();
}

<<<<<<< HEAD
<<<<<<< HEAD
app.use (logger);
=======

>>>>>>> main
=======
app.use (logger);
>>>>>>> main
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> main

function creaLibro (req,res) {
    const tit=req.body.title;
    const aut=req.body.author;
    const newid=BookDB.length+1;
    BookDB.push({id: newid, title: tit, author:aut});
    res.send ({id:newid}); 
};

function listaLibri (req,res) {
    res.send(BookDB);
};

function cancellaLibro (req,res) {
    let index = -1;
    for (let i=0; i< BookDB.length && index <0; i++){
        if (BookDB[i].id == req.params.id) {
            index=i;
        }
    }
    if (index >=0 ){
        BookDB.splice(index,1);
        res.statusCode=200;
        res.send("OK");
    } else {
        res.statusCode=404;
        res.send("Libro non trovato");
    }
};

app.post ("/books", creaLibro);
app.get ("/books", listaLibri);
app.delete('/books/:id', cancellaLibro);

<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> main
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
    const user=req.body.user;
    const pass=req.body.password;
    console.log("user="+user + "pass="+pass);
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

<<<<<<< HEAD
<<<<<<< HEAD
app.get('/login', function(req,res) {
        res.statusCode=200;
        //View
        res.send(`
        <html><head>Login alla mia app</head>
        <body>
        <h1>Benvenuto nella App!!!</h1>
        <p>Login:</p>
        <form method="POST" action="/login">
            <input name="user" type="text"/>
            <input name="password" type="password"/>
            <input type="submit"/>
            
        </form></body></html>
        `);
});


=======
>>>>>>> main
=======
>>>>>>> main

app.get('/', miafunzione);
app.get('/aaa', function (req, res) {
    res.send('Hello from AAA')
});

app.listen (port,() => {console.log ("Backend partito!")});