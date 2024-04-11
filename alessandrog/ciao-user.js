const express = require("express");
const app = express();
const port = 3000;

app.get("/user", function(req, res) {
	let user = req.query.user;
	if (user === "" || !user) {
		res.send("Ciao, sconosciuto.");
	} else {
		res.send("Ciao, " + user);
	}
});

app.listen(port, () => {console.log("Backend partito!")});