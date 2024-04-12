
const Books = require("../model/books");

class BooksController {
    static searchBook(req,res) {
        const id=req.params.id;

        let trovato=Books.getBook(id);
        if (trovato ){
            res.statusCode=200;
            //View
            res.send("Trovato libro Titolo: "+trovato.title + " Autore:" + trovato.author);
        } else {
            res.statusCode=404;
            //View
            res.send("Libro non presente nella nostra libreria...");
        }
    }
}
module.exports= BooksController;