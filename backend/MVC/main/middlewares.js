
const express = require('express');
const nocache = require('nocache');
const morgan = require ('morgan');
const cookieParser = require('cookie-parser');
const logger = require ('./logger');
const Login = require ('../controllers/LoginController');
 
function middlewares (app) {
    // Middelware per loggare tutte le richieste ricevute
    app.use (logger);
    
    app.use(morgan('dev'));
 
    // Middelware per servire le pagine statiche che stanno in public
    app.use(express.static('public'));
  
    // Middleware per gestione cookies
    app.use(cookieParser());

    // Middleware per controllo Authenticazione. Solo i files statis possono essere acceduti senza login
    app.use(Login.isUserAuth);

    // Attenzione questo seguente e' un uso selettivo di un middleware solo su alcune routes
    // vuold dire che questo middleware si applica solo alle roote
    // ve lo spiego domani ma fa uso di espressioni regolari per indicare una famiglia di URL 
    // tutti quelli che iniziano per "/books"
    // app.use(/^\/books(.*)/,isUserAuth);

    // Middelware per inibire il caching del browser. 
    //Le Response avranno sempre gli Headeer che indicano di non cachare questa risposta
    app.use(nocache());
    
    // Middelware per spostare tutti Parametri Form-Data nel req.body
    app.use(express.urlencoded({ extended: true }));

    // Middelware per mettere in req.body tutti i JSON ricevuti nel POST Body
    app.use(express.json());

}

function GeneralError (err,req, res, next){
    console.log("ERRORE: ", err);
    res.statusCode=500;
    res.send("Qualcosa e' andato storto !!! "+req.url+"!!!!");

}
function mwerror (app) {
   app.use (GeneralError);
}

module.exports = {middlewares, mwerror};