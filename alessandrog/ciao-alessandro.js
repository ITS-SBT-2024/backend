const express = require("express");
const app = express();
const port = 3000;

app.get("/alessandro", function(req, res) {
	res.send("Ciao sono Alessandro.");
});

app.listen(port, () => {console.log("Backend partito!")});