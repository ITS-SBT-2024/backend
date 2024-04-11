const express = require("express");
const app = express();
const port = 3000;

app.get("/", function(req, res) {
	res.send("Hello World");
});

app.get("/user", function(req, res) {
	let user = req.query.user;
	if (user === "" || !user) {
		res.send("Ciao, sconosciuto.");
	} else {
		res.send("Ciao, " + req.query.user);
	}
});

app.listen(port, () => {console.log("Backend partito!")});