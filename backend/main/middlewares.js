
const nocache = require('nocache');
const morgan = require ('morgan');

function logger (req, res, next){
    console.log("Chiamato "+req.url+"!!!!");
    next();
 }
 
function middleware (app, express) {
    // Middelware per loggare tutte le richieste ricevute
    app.use (logger);
    
    app.use(morgan('dev'));
 
    // Middelware per servire le pagine statiche che stanno in public
    app.use(express.static('public'));
    
    // Middelware per inibire il caching del browser. 
    //Le Response avranno sempre gli Headeer che indicano di non cachare questa risposta
    app.use(nocache());
    
    // Middelware per spostare tutti Parametri Form-Data nel req.body
    app.use(express.urlencoded({ extended: true }));

    // Middelware per mettere in req.body tutti i JSON ricevuti nel POST Body
    app.use(express.json());



}

module.exports = middleware;