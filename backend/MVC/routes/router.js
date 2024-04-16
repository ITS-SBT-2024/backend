const BooksController = require ("../controllers/BooksController");
const LoginController = require ("../controllers/LoginController");
const RootController = require ("../controllers/RootController");

function router (app){
    // Routes solo per giocare. Queste non servono 
    // erano gli esempi con cui abbiamo giocato ....
    
    app.get('/', RootController.homepage);


    app.get('/aaa', function (req, res) {
        res.send('Hello from AAA Route')
    });

    // Routes per i Libri
    // get del libro per id (stile REST)

    app.post  ("/books", BooksController.creaLibro);
    app.delete('/books', BooksController.cancellaTuttiLibri);
    app.get   ("/books", BooksController.listaLibri);
    app.get   ('/books/:id', BooksController.getBook);
    app.post  ('/books/:id', BooksController.aggiornaLibro);
    app.delete('/books/:id', BooksController.cancellaLibro);

    // Route per Login
    app.post('/login', LoginController.login);
    app.get('/login', LoginController.loggedin);
    app.get('/logout', LoginController.logout);
    
}

module.exports = router;