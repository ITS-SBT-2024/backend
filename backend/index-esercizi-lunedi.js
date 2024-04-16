const express = require("express");
const fs = require("fs").promises;
var cookieParser = require('cookie-parser');
const morgan = require ('morgan');

const app = express();
const port= 3000;

app.use(morgan("dev"));
const nocache = require('nocache');
app.use (logger);

app.use(express.static('public'));
// Middleware di authenticazione applciato a tutte le rotte tranne che i file statici
app.use(cookieParser());
app.use(isUserAuth);
// Attenzione questo e' un uso selettivo di un middleware solo su alcune routes
// vuold dire che questo middleware si applica solo alle roote
// ve lo spiego domani ma fa uso di espressioni regolari per indicare una famiglia di URL 
// tutti quelli che iniziano per "/books"
// app.use(/^\/books(.*)/,isUserAuth);
app.use(nocache());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// metto isUserAuth dopo cookieParser perche' accedo ai cookie che cookie parser ha reso disponibile.


let BookDB;
let userDB;

function gestisciErrore( err, req, res, next){
    console.log("Qualcosa e' andato storto !!! "+req.url+"!!!!");
    res.statusCode=400;
    res.send("Qualcosa e' andato storto !!! "+req.url+"!!!!");

}

function isUserAuth (req, res, next){
    console.log("isUserAuth... cookies=", req.cookies);
    if ( req.url=="/login" && req.method=="POST") {
        // se ci viene chiesta la login lo facciamo passare perche' vuol dire che l'utente 
        // vuole authenticarsi e lo permettiamo
        next();
        return;
    }
    if (req.cookies && req.cookies.authenticato) {
        console.log("URL:"+req.url + " user:"+req.cookies.authenticato);
        // qui nella realtà dovremmo controllare che in effetti l'utente esista davvero e
        // la stringa di cookie dovrebbe essere criptata per evitare manomissioni
        // ma noi per ora ce ne freghiamo...
        next();
    } else {
        res.statusCode=401;
        res.json({"msg":"Login Failed"});
    }
}


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
            res.send({"user":user});
        } else {
            res.statusCode=401;
            //View
            
            res.send({"msg":"user not found"});
        }
    });

    app.get('/logout', function(req,res) {
 
            res.statusCode=200;
            //View
            res.clearCookie("authenticato");
            res.send({"msg":"Logout done"});

    });


    app.get('/', miafunzione);
    app.get('/aaa', function (req, res) {
        res.send('Hello from AAA')
    });

    app.use (gestisciErrore);
    console.log ("Prima dello start del server");
    app.listen (port,() => {console.log ("Backend partito!")});
    console.log ("dopo lo start del server");
} 

main();