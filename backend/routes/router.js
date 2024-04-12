
const BooksController = require ("../controllers/BooksController");
const LoginController = require ("../controllers/LoginController");

function miafunzione (a,b ) {
    // in questa funzione a sarà request che express gli passa quando la chiama
    // e b sarà response
    b.send("Hello World from function");
 }

function router (app){
    // Routes solo per giocare. Queste non servono 
    // erano gli esempi con cui abbiamo giocato ....
    app.get('/', miafunzione);
    app.get('/aaa', function (req, res) {
        res.send('Hello from AAA Route')
    });

    // Routes per i Libri
    // get del libro per id (stile REST)
    app.get('/books/:id', BooksController.searchBook);

    // Route per Login
    app.post('/login', LoginController.login);
    app.get('/login', LoginController.loginRedirect);
    

}

module.exports = router;