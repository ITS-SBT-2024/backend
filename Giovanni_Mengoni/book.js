const express = require("express");
const { textSpanIntersectsWith } = require("typescript");
const app = express();
const port= 80;
app.use(express.json());


//da fare
//1- GET su /books per fare la ricerca. esempio /books?search=Signore
//2- PUT su /books/:id per sostituire il libro
//3- POST su /books/:id per Aggiornare il libro
//4- DELETE su /books per cancellare tutti i libri


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
    {
        id:"3",
        title:"L' arte della guerra",
        author:"Sun Tzu"
    },

];
app.get("/", function(req,res){
    res.send("Benvenuto nel local host, la tua libreria preferita");
});
app.get("/books", function(req,res){
    booksToSend = []
    BookDB.forEach(element => {
        booksToSend.push(element) 
    });
    res.send(booksToSend)
})
app.get("/books/:id", function(req,res){
    const id= req.params.id;

    trovato = null
    BookDB.forEach ( u =>{
        if (u.id === id) {
            trovato = u
        }
    });
    if (trovato){
        res.statusCode=200;
        res.send("Trovato libro Titolo: "+trovato.title + " Autore:" + trovato.author);
    } else {
        res.statusCode=404;
        res.send("libro non trovato nella nostra libreria...")
    }

})
//non funziona mi da solo l' id nuovo ma senza i dati di autore e titolo
app.post("/books", function (req,res){
    const tit=req.body.title;
    const aut=req.body.author;
    const newid=BookDB.length+1;
    BookDB.push({id: newid, title: tit, author:aut});
    res.send ({id:newid}); 
})
app.delete("/books/:id", function(req,res){ let index = -1;
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
})

function ricercaLibro(req,res){
    const autore = req.params.author
    const title = req.params.title
    let librotrovato = false

    for (let i=0; i<BookDB.length;i++){
        if (autore === BookDB[i].author || title === BookDB[i].title){
            librotrovato = true
            res.statusCode=200;
            res.send("libro trovato:", BookDB[i])
            break
        }
    }
    //BookDB.forEach(element => {
    //    if (autore === element.author || title === element.title){
    //        librotrovato = true
    //        res.statusCode=200;
    //        res.send("libro trovato:", element)
    //    }
    //    
    //}); 
    if (librotrovato === false) {
        res.statusCode=404;
        res.send("ricerca fallita")
    }


}

app.get("/bookssearch", ricercaLibro)

app.listen (port,() => {console.log ("Backend partito!")});