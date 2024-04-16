const express = require("express");
const {middlewares, mwerror}  = require ("./middlewares");
const router = require ("../routes/router");
const Loader = require ("../model/Loader");
const port= 80;

const app = express();

async function server (){
    // Istruisci Express su tutti i Middlewares
    middlewares(app);

    // Definisci tutte le rotte dell'applicazione
    router(app);

    // Istruisci Express sulla gestione dell'errore
    mwerror(app);

    // Carica i dati dell'applicazione...
    await Loader();

    // Avvia il server
    app.listen (port,() => {console.log ("Backend partito!")});
}

server();
