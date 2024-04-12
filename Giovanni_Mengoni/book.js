const express = require("express");
const { textSpanIntersectsWith } = require("typescript");
const app = express();
const port= 80;


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
app.get("/", function(req,res){
    res.send("Benvenuto nel local host");
});


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
app.listen (port,() => {console.log ("Backend partito!")});