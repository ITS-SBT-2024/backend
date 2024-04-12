application.get("/books/:regione/:provincia/:cita/:idprop")

/books/marche/ancona/fabriano/123
/books//fabriano



function visite (req, res) {

    visted++;
    res.send (visited);

}
app.get("/visite", visite)