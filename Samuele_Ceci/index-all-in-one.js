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

function miafunzione (a,b ) {
   b.send("Hello World from function");
}


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


app.post('/add-book', function(req, res) {
    const bookName = req.body.name;
    const bookImage = req.body.image;

    // In questo punto, salva l'immagine nel tuo sistema di file e memorizza il percorso nel database o genera un'immagine di placeholder
    // Ritorna l'URL dell'immagine salvata o un'indicazione di successo

    res.json({ success: true, image: 'path_to_image.jpg' });
});

app.listen (port,() => {console.log ("Backend partito!")});