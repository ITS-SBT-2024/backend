const express = require("express");
const middlewares = require ("./middlewares");
const router = require ("../routes/router");
const port= 80;

const app = express();

// Istruisci Express su tutti i Middlewares
middlewares(app, express);

// Definisci tutte le rotte dell'applicazione
router(app);

// Avvia il server
app.listen (port,() => {console.log ("Backend partito!")});