const express = require("express");
const app = express();
const port = 3000;

books = [
	{
		id: 0,
		titolo: "Harry Potter e la Pietra Filosofale"
	},
	{
		id: 1,
		titolo: "Harry Potter e la Camera dei Segreti"
	},
	{
		id: 2,
		titolo: "Harry Potter e il Prigioniero di Azkaban"
	},
	{
		id: 3,
		titolo: "Harry Potter e il Calice di Fuoco"
	},
	{
		id: 4,
		titolo: "Harry Potter e l'Ordine della Fenice"
	},
	{
		id: 5,
		titolo: "Harry Potter e il Principe Mezzosangue"
	},
	{
		id: 6,
		titolo: "Harry Potter e i Doni della Morte"
	},
];

app.get("/books/:id", function(req, res) {
	let id = parseInt(req.params.id);
	
	let book = "";
	for (let i = 0; i < books.length; i++) {
		if (books[i].id === id) {
			book = books[i];
			break;
		}
	}

	if (book === "" || !book) {
		res.send("Libro non trovato.");
	} else {
		res.send(book.titolo);
	}
});

app.listen(port, () => {console.log("Backend partito!")});