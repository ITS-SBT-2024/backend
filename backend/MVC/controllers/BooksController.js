
const Books = require("../model/Books");

class BooksController {
    static getBook(req,res) {
        const id=req.params.id;

        let trovato=Books.get(id);
        if ( trovato ){
            res.statusCode=200;
            //View
            res.send(trovato);
        } else {
            res.statusCode=404;
            //View
            res.send({"msg":"Not Found"});
        }
    }

    static async creaLibro (req,res) {
        const tit=req.body.title;
        const aut=req.body.author;

        let newb=await Books.create( tit, aut);
        res.send (newb); 
        
    };

    static listaLibri (req,res) {
        res.send(Books.get());
    };

    static async cancellaLibro (req,res) {
        if (! req.params || !req.params.id){
            res.statusCode=400;
            res.send({"status":"BadRequest"});     
            return       
        }
        
        if (await Books.delete(req.params.id) ){
            res.statusCode=200;
            res.send({"status":"Done"});
        } else {
            res.statusCode=404;
            res.send();
        }    
    };

    static async aggiornaLibro (req,res) {
        if (! req.params || ! req.params.id){
            res.statusCode=400;
            res.send({"status":"BadRequest"});     
            return       
        }


        if ( await Books.update(req.params.id,req.body.title, req.body.author ) ){
            res.statusCode=200;
            res.send({"status":"done"});
        } else {
            res.statusCode=404;
            res.send();
        }
    };

    static async cancellaTuttiLibri (req,res) {
            await Books.delete();
            res.statusCode=200;
            res.send({"status":"done"});
    };

}
module.exports= BooksController;