const express = require("express");
const fs = require("fs").promises;
var cookieParser = require('cookie-parser');

const app = express();
const port= 3000;

const nocache = require('nocache');
app.use (logger);
app.use(express.static('public'));

app.use(nocache());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

let BookDB;
let userDB;

function logger (req, res, next){
   console.log("Chiamato "+req.url+"!!!!");
   next();
}
async function loadBookDB (){
    try {
        const fileContent=await fs.readFile('data/bookdb.json');
        
        return JSON.parse(fileContent);
    } catch (err){
        console.log("ERRORE Lettura BookDB: "+err);
        return [];
    }
}
async function loadUserDB (){
    try {
        const fileContent=await fs.readFile('data/userdb.json');
        
        return JSON.parse(fileContent);
    } catch (err){
        console.log("ERRORE Lettura UserDB: "+err);
        return [];
    }
}
async function saveBookDB(){
    try {
        await fs.writeFile('data/bookdb.json', JSON.stringify(BookDB,null,4));
    } catch (err){
        console.log("ERRORE Scrittura BookDB: "+err);
    }    
}
async function saveUserDB(){
    try {
        await fs.writeFile('data/userdb.json', JSON.stringify(userDB,null,4));
    } catch (err){
        console.log("ERRORE Scrittura UserDB: "+err);
    }    
}

async function main (){

    userDB= await loadUserDB();
    console.log("prima del loadDB");
    BookDB=await loadBookDB();
    console.log("dopo il loadDB");

    function miafunzione (a,b ) {
    b.send("Hello World from function");
    }

    function creaLibro (req,res) {
        const tit=req.body.title;
        const aut=req.body.author;
        const newid=BookDB.length+1;
        BookDB.push({id: newid, title: tit, author:aut});
        res.send ({id:newid}); 
        saveBookDB();
    };

    function listaLibri (req,res) {
        if (req.cookies) {
            if (req.cookies.authenticato) {

            } else {
                res.send(401,"Non autorizzato");
            }
           console.log ("Cookies ricevuti "+ JSON.stringify(req.cookies));
        }
        
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
            res.send({"status":"done"});
            saveBookDB();
        } else {
            res.statusCode=404;
            res.send();
        }
    };

    function aggiornaLibro (req,res) {
        let index = -1;
        for (let i=0; i< BookDB.length && index <0; i++){
            if (BookDB[i].id == req.params.id) {
                index=i;
            }
        }
        if (index >=0 ){
            BookDB[index].title=req.body.title;
            BookDB[index].author=req.body.author;
            res.statusCode=200;
            res.send({"status":"done"});
            saveBookDB();
        } else {
            res.statusCode=404;
            res.send();
        }
    };
    function cancellaTuttiLibri (req,res) {
            BookDB=[];
            res.statusCode=200;
            res.send({"status":"done"});
            saveBookDB();
    };

    app.post ("/books", creaLibro);
    app.post('/books/:id', aggiornaLibro);
    app.get ("/books", listaLibri);
    app.delete('/books/:id', cancellaLibro);
    app.delete('/books', cancellaTuttiLibri);

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
            res.json(trovato);
        } else {
            res.statusCode=404;
            //View
            res.json();
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
            res.cookie("authenticato", user);
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
    console.log ("Prima dello start del server");
    app.listen (port,() => {console.log ("Backend partito!")});
    console.log ("dopo lo start del server");
} 

main();