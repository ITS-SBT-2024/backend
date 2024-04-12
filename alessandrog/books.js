const express = require("express");
const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));

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

app.get("/viewbook/:id", function(req, res) {
	const id = parseInt(req.params.id);
	
	const book = "";
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

app.get("/allbooks", function(req, res) {
	// let stringa = "";
	// for (let i = 0; i < books.length; i++)  {
	// 	stringa += books[i].titolo + "\n";
	// }
	// res.send(stringa);

	res.send(books);
});

app.delete("/delbook/:id", function(req, res) {
	const id = parseInt(req.params.id);
	
	for (let i = 0; i < books.length; i++) {
		if (id === books[i].id) {
			books.splice(i, 1);
			res.send("Book has been deleted.");
			break;
		}
	}
	console.log(books);
});

app.listen(port, () => {console.log("Backend partito!")});